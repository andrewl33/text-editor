import * as crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { getAllCodeFileInfo } from "../models/codeFile.model";
import {
  deleteCollection as deleteCollectionDB,
  getPasswordCollection,
  insertNewCollection,
  updateName,
  updatePassword,
  updateToPrivate,
  urlExists
} from "../models/collection.model";
import {
  addFileToCollection,
  getFilesFromCollection,
  removeFileFromCollection
} from "../models/collectionFile.model";
import { allFileTags } from "../models/fileTag.model";
import { createToken, decodeToken, updateToken } from "./token";

export const generate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // generate a valid uuid
  let uuid: string;
  let isNotUnique = true;
  let newRowCreated = false;
  do {
    uuid = crypto.randomBytes(3).toString("hex");
    try {
      isNotUnique = await urlExists(uuid);
    } catch (e) {
      console.log(e);
    }
  } while (isNotUnique);

  // add a row to the db
  try {
    newRowCreated = await insertNewCollection(uuid);
  } catch (e) {
    console.log(e);
  }

  if (!newRowCreated) {
    return response.send({
      success: false
    });
  }

  response.setHeader("Content-Type", "application/json");
  return response.send({
    success: true,
    url: uuid,
    createDate: new Date().toDateString()
  });
};

export const sendFileCollection = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let url = request.body.url;
  url = url.replace(/\//g, "");
  try {
    const collectionInfo = await getAllCodeFileInfo(url);
    const files = await getFilesFromCollection(url);
    const fileTags: string[][] = [];
    const fileInfo: Array<{
      file: { id: string; createDate: string; name: string };
      tags: string[];
    }> = [];

    for (const file of files.files) {
      fileTags.push((await allFileTags(file.id)).tags);
    }

    for (let i = 0; i < files.files.length; i++) {
      fileInfo.push({ file: files.files[i], tags: fileTags[i] });
    }

    const returnObj = {
      success: true,
      collectionInfo,
      fileInfo
    };

    return response.send(returnObj);
  } catch (e) {
    return response.send({ success: false });
  }
};

export const passwordProtect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.body.url.replace(/\//g, "");
  const { password } = req.body;

  try {
    await updateToPrivate(uuid);
    await updatePassword(uuid, password);
    const token = await updateToken(
      await decodeToken(req.headers.authorization),
      "",
      [uuid],
      []
    );
    res.set({ Authorization: "Bearer " + token });
    return res.send({ success: true });
  } catch (e) {
    console.log(e);
    return res.send({ success: false });
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.body.url.replace(/\//g, "");

  try {
    if ((await getPasswordCollection(uuid)) === req.body.password) {
      const newToken = await updateToken(
        await decodeToken(req.headers.authorization),
        "",
        [],
        [uuid]
      );
      res.set({ Authorization: "Bearer " + newToken });
      return res.send({ success: true });
    }
  } catch (e) {
    console.log(e);
    return res.send({ success: false });
  }
};

export const deleteCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.body.url.replace(/\//g, "");

  try {
    const resDB = await deleteCollectionDB(uuid);

    if (req.headers.authorization) {
      const decoded = await decodeToken(req.headers.authorization);

      if (decoded.collections.indexOf(uuid) > -1) {
        const { user, files, collections } = decoded;
        delete collections[decoded.collections.indexOf(uuid)];
        const token = await createToken(user, collections, files);
        res.set({ Authorization: "Bearer" + token });
      }
    }

    return await res.send({ success: resDB });
  } catch (e) {
    console.log("Remove file error:");
    console.log(e);
  }
};

// TODO: validate
export const changeName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.body.url.replace(/\//g, "");

  try {
    const resDB = await updateName(uuid, req.body.name);

    res.send({ success: resDB });
  } catch (e) {
    console.log("changeName");
    res.send({ success: false });
  }
};

// TODO: validate
export const addFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fileUrl = req.body.fileUrl.replace(/\//g, "");
  const colUrl = req.body.url.replace(/\//g, "");

  try {
    const resDB = await addFileToCollection(colUrl, fileUrl);

    if (resDB.success) {
      const fileInfo = await getAllCodeFileInfo(fileUrl);
      const fileTagInfo = await allFileTags(fileUrl);
      let fileItem: {};

      if (fileInfo.success) {
        fileItem = {
          id: fileUrl,
          name: fileInfo.name,
          tags: fileTagInfo.success && fileTagInfo,
          date: fileInfo.createDate,
          isPrivate: fileInfo.isPrivate,
          codeText: fileInfo.codeText
        };
      }

      return res.send({
        success: resDB.success,
        newFileItem: fileItem
      });
    }
    return res.send({
      success: resDB.success
    });
  } catch (e) {
    console.log("addFileToCollection");
    console.log(e);
    res.send({ success: false });
  }
};

export const removeFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fileUrl = req.body.fileUrl.replace(/\//g, "");
  const colUrl = req.body.url.replace(/\//g, "");

  try {
    const resDB = await removeFileFromCollection(colUrl, fileUrl);
    res.send({ ...resDB, fileId: fileUrl });
  } catch (e) {
    console.log("removeFile");
    console.log(e);
    res.send({ success: false });
  }
};
