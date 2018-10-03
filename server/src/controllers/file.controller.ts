import * as crypto from 'crypto';
import {NextFunction, Request, Response} from 'express';
import { uuidExists, createNewCodeRow , getTextFromDB, saveToDB } from '../models/file.model';


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
