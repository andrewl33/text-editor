import * as crypto from 'crypto';
import {NextFunction, Request, Response} from 'express';
import { deleteCollection as deleteCollectionDB, urlExists, insertNewCollection, updatePassword, updateToPrivate, getPasswordCollection } from '../models/collection.model';
import { getFilesFromCollection, addFileToCollection, removeFileFromCollection } from '../models/collectionFile.model';
import { createToken, updateToken, decodeToken } from './token';


export const generate = async (request: Request, response: Response, next: NextFunction) => {
  // generate a valid uuid 
  let uuid: string;
  let isNotUnique = true;
  let newRowCreated = false;
  do {
    uuid = crypto.randomBytes(3).toString('hex');
    try {
      isNotUnique = await urlExists(uuid);
    } catch (e) {
      console.log(e);
    }

  } while (isNotUnique);

  // add a row to the db
  try {
    newRowCreated = await insertNewCollection(uuid);
  } catch(e) {
    console.log(e);
  }

  if (!newRowCreated) {
    return response.send({success: false})
  }
  
  response.setHeader('Content-Type', 'application/json');
  return response.send({success: true, url: uuid});
  
}

export const sendFileCollection = async(request: Request, response: Response, next: NextFunction) => {

  let url = request.body.url;
  url = url.replace(/\//g, '');
  try {
    return response.send(await getFilesFromCollection(url));
  } catch (e) {
    return response.send({success: false});
  }
  
}

export const passwordProtect = async (req: Request, res: Response, next: NextFunction) => {
  
  const uuid = req.body.url.replace(/\//g, '');
  const { password } = req.body;

  try {
    await updateToPrivate(uuid);
    await updatePassword(uuid, password);
    const token = await updateToken(await decodeToken(req.headers.authorization), '', [uuid], []);
    res.set({'Authorization': 'Bearer ' + token});
    return res.send({success: true});
  } catch(e) {
    console.log(e);
    return res.send({success: false});
  }

}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  
  const uuid = req.body.url.replace(/\//g, '');

  try {
    if (await getPasswordCollection(uuid) === req.body.password) {
      const newToken = await updateToken(await decodeToken(req.headers.authorization), '', [], [uuid]);
      res.set({'Authorization': 'Bearer ' + newToken})
    }
  } catch(e) {
    console.log(e);
    return false;
  }
}

export const deleteCollection = async (req: Request, res: Response, next: NextFunction) => {
  
  const uuid = req.body.url.replace(/\//g, '');
  
  try {

    const resDB = await deleteCollectionDB(uuid); 

    if (req.headers.authorization) {
      const decoded = await decodeToken(req.headers.authorization);

      if (decoded.collections.indexOf(uuid) > -1) {
        const { user, files, collections } = decoded;
        delete collections[decoded.collections.indexOf(uuid)];
        const token = await createToken(user, collections, files);
        res.set({'Authorization': 'Bearer' + token});
      }
    }
    
    return await res.send({success: resDB});
  } catch(e) {
    console.log("Remove file error:");
    console.log(e);
  }
}

// TODO: update the name
export const changeName = async(req: Request, res: Response, next: NextFunction) => {}

// TODO: need to add authentication to both
export const addFile = async(req: Request, res: Response, next: NextFunction) => {

  const fileUrl = req.body.fileUrl.replace(/\//g, '');
  const colUrl = req.body.url.replace(/\//g, '');

  try {
    const resDB = await addFileToCollection(colUrl, fileUrl);
    res.send(resDB);
  } catch(e) {
    console.log("addFileToCollection");
    console.log(e);
    res.send({success: false});
  }

}


export const removeFile = async(req: Request, res: Response, next: NextFunction) => {

  const fileUrl = req.body.fileUrl.replace(/\//g, '');
  const colUrl = req.body.url.replace(/\//g, '');

  try {
    const resDB = await removeFileFromCollection(colUrl, fileUrl);
    res.send(resDB);
  } catch(e) {
    console.log("removeFile");
    console.log(e);
    res.send({success: false});
  }

}