import * as crypto from 'crypto';
import {NextFunction, Request, Response} from 'express';
import { uuidExists, createNewCodeRow, makePrivate, updatePassword, getTextFromDB, saveToDB, isPrivate as selectIsPrivate, getPassword } from '../models/codeFile.model';
import { updateToken, decodeToken } from './token';


export const generate = async (request: Request, response: Response, next: NextFunction) => {
  // generate a valid uuid 
  let uuid: string;
  let isNotUnique = true;
  let newRowCreated = false;
  do {
    uuid = crypto.randomBytes(3).toString('hex');
    try {
      isNotUnique = await uuidExists(uuid);
    } catch (e) {
      console.log(e);
    }

  } while (isNotUnique);

  // add a row to the db
  try {
    newRowCreated = await createNewCodeRow(uuid);
  } catch(e) {
    console.log(e);
  }

  if (!newRowCreated) {
    return response.send({success: false})
  }
  
  response.setHeader('Content-Type', 'application/json');
  return response.send({success: true, url: uuid});
  
}

export const open = async (request: Request, response: Response, next: NextFunction) => {
  // returns the correct text to the user
  let url = request.body.url;
  url = url.replace(/\//g, '');

  const code = await getTextFromDB(url);

  return response.send(code);
}

export const save = async (request: Request, response: Response, next: NextFunction) => {
  // saves the code to server
  let url = request.body.url;
  url = url.replace(/\//g, '');
  const isSavedToDB = await saveToDB(url, request.body.codeText);

  return response.send({isSaved: isSavedToDB});
}


export const passwordProtect = async (req: Request, res: Response, next: NextFunction) => {
  
  const uuid = req.body.url.replace(/\//g, '');
  const { password } = req.body;

  try {
    await makePrivate(uuid);
    await updatePassword(uuid, password);
    const token = await updateToken(await decodeToken(req.headers.authorization), '', [uuid], []);
    res.set({'Authorization': 'Bearer' + token});
    return res.send({success: true});
  } catch(e) {
    console.log(e);
    return res.send({success: false});
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  
  const uuid = req.body.url.replace(/\//g, '');

  try {
    if (await getPassword(uuid) === req.body.password) {
      await updateToken(await decodeToken(req.headers.authorization), '', [uuid], []);
    }
  } catch(e) {
    console.log(e);
    return false;
  }
}

export const isPrivate = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const resDB = await selectIsPrivate(req.body.url);
    return resDB;
  } catch(e) {
    console.log(e);
  }

}
// TODO: add a name to your file
// TODO: remove a tag from your file
// TODO: add a tag to your file
// TODO: remove a tag from your file