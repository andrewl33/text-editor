import * as crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import {
  createNewCodeRow,
  deleteFile,
  getAllCodeFileInfo,
  getPassword,
  getTextFromDB,
  isPrivate as selectIsPrivate,
  makePrivate,
  saveToDB,
  updateName,
  updatePassword,
  uuidExists
} from "../models/codeFile.model";
import { allFileAccounts } from "../models/fileAccount.model";
import {
  addTagToFile,
  allFileTags,
  removeTagFromFile
} from "../models/fileTag.model";
import { allTags, createNewTag } from "../models/tag.model";
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
      isNotUnique = await uuidExists(uuid);
    } catch (e) {
      console.log(e);
    }
  } while (isNotUnique);

  // add a row to the db
  try {
    newRowCreated = await createNewCodeRow(uuid);
  } catch (e) {
    console.log(e);
  }

  if (!newRowCreated) {
    return response.send({ success: false });
  }

  response.setHeader("Content-Type", "application/json");
  return response.send({ success: true, url: uuid });
};

// TODO: Test
export const open = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // returns the correct text to the user
  let url = request.body.url;
  url = url.replace(/\//g, "");
  try {
    const info = await getAllCodeFileInfo(url);
    const tags = await allFileTags(url);
    const users = await allFileAccounts(url);

    if (info.success) {
      return response.send({
        success: true,
        codeText: info.codeText,
        tags: tags.tags,
        name: info.name,
        isPrivate: info.isPrivate,
        createDate: info.createDate,
        users: users.accounts
      });
    } else {
      return response.send({
        success: false
      });
    }
  } catch (e) {
    console.log("File open");
    console.log(e);

    return response.send({
      success: false
    });
  }
};

export const save = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // saves the code to server
  let url = request.body.url;
  url = url.replace(/\//g, "");
  const isSavedToDB = await saveToDB(url, request.body.codeText);

  return response.send({ isSaved: isSavedToDB });
};

export const passwordProtect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.body.url.replace(/\//g, "");
  const { password } = req.body;

  try {
    await makePrivate(uuid);
    await updatePassword(uuid, password);
    const token = await updateToken(
      await decodeToken(req.headers.authorization),
      "",
      [],
      [uuid]
    );
    res.set({ Authorization: "Bearer " + token });
    return await res.send({ success: true });
  } catch (e) {
    console.log(e);
    return res.send({ success: false });
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.body.url.replace(/\//g, "");
  try {
    if ((await getPassword(uuid)).password === req.body.password) {
      const newToken = await updateToken(
        await decodeToken(req.headers.authorization),
        "",
        [],
        [uuid]
      );

      await res.set({ Authorization: "Bearer " + newToken });
      await res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (e) {
    console.log(e);
    return res.send({ success: false });
  }
};

export const isPrivate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resDB = await selectIsPrivate(req.body.url);
    return resDB;
  } catch (e) {
    console.log(e);
  }
};

export const removeFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.body.url.replace(/\//g, "");

  try {
    const resDB = await deleteFile(uuid);

    if (req.headers.authorization) {
      const decoded = await decodeToken(req.headers.authorization);

      if (decoded.files.indexOf(uuid) > -1) {
        const { user, files, collections } = decoded;
        delete files[decoded.files.indexOf(uuid)];
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

export const changeName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.body.url.replace(/\//g, "");
  const { name } = req.body;

  try {
    const resDB = await updateName(uuid, name);
    res.send({ success: resDB });
  } catch (e) {
    console.log("Change name");
    console.log(e);
    res.send({ success: false });
  }
};

// TODO: add new tag if it does not exist
export const addTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.body.url.replace(/\//g, "");
  const { tagName } = req.body;

  try {
    if ((await allTags()).tags.indexOf(tagName) < 0) {
      await createNewTag(tagName);
    }
    const resDB = await addTagToFile(uuid, tagName);
    // TODO: get tag name?
    res.send({ success: resDB });
  } catch (e) {
    console.log("addTag");
    console.log(e);
    res.send({ success: false });
  }
};

export const removeTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.body.url.replace(/\//g, "");
  const { tagName } = req.body;

  try {
    const resDB = await removeTagFromFile(tagName, uuid);
    res.send({ success: resDB });
  } catch (e) {
    console.log("removeTag");
    console.log(e);
    res.send({ success: false });
  }
};
