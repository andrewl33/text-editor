import {NextFunction, Request, Response} from 'express';
import * as crypto from 'crypto';
import query from '../database';



export const generate = async (request: Request, response: Response, next: NextFunction) => {
  // generate a UUID 
  let uuid: string;
  let isNotUniqueUuid: boolean = false;
  do {
    uuid = crypto.randomBytes(3).toString('hex');
    const dbRes = await query(`SELECT exists(SELECT 1 FROM code WHERE url='${uuid}')`);
    isNotUniqueUuid = await dbRes.rows[0].exists;
  } while (isNotUniqueUuid);

  // create a new UUID row to save
  try {
    await query(`INSERT INTO code (url, date, isLocked, codeText) VALUES ('${uuid}', now(), FALSE, ' ')`);
  } catch(err) {
    console.log("Generate Error:")
    console.log(err);
    return response.send({success: false});
  }
  response.setHeader('Content-Type', 'application/json');
  // response.send({newUrl: uuid});
  response.send({url:uuid, success: true});
}

export const open = async (request: Request, response: Response, next: NextFunction) => {
  // returns the correct text to the user
  let code;
  let url = request.body.url;
  url = url.replace(/\//g, '');
  try {
    code = await query(`SELECT codeText FROM code WHERE url='${url}'`);
  } catch(err) {
    console.log("Open err:");
    console.log(err);
  }
  
  code ? response.send({codeText: code.rows[0].codetext, success: true}) : response.send({success:false});
}

export const save = async (request: Request, response: Response, next: NextFunction) => {
  // saves the code to server
  let saved = true;
  let url = request.body.url;
  url = url.replace(/\//g, '');

  try {
    // await this.codeRespository.update({url}, {date: 'now()', codeText: request.body.codeText});
    await query(`UPDATE code SET date = now(), codeText = '${request.body.codeText}' WHERE url = '${url}'`);
  } catch(err) {
    console.log("Save err:");
    console.log(err);
    saved = false;
  }
  
  response.send({isSaved: saved});
}
