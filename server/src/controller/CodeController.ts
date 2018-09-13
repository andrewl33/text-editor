import {getRepository, Repository} from 'typeorm';
import {NextFunction, Request, Response} from 'express';
import * as crypto from 'crypto';
import {Code} from '../entity/Code';
import { networkInterfaces } from 'os';

export class CodeController {

  private codeRespository = getRepository(Code);

  async generate(request: Request, response: Response, next: NextFunction) {
    // generate a UUID 
    let uuid: string;
    do {
      uuid = crypto.randomBytes(3).toString('hex');
    } while ((await this.codeRespository.find({url : uuid})).length !== 0);

    try {
      await this.codeRespository.query(`INSERT INTO CODE (url, date, "isLocked", "codeText") VALUES ('${uuid}', now(), FALSE, ' ')`);
    } catch(err) {
      console.log("Generate Error:")
      console.log(err);
    }

    response.send(uuid);
  }

  async open(request: Request, response: Response, next: NextFunction) {
    // returns the correct text to the user
    let code;
    try {
      code = await this.codeRespository.findOne({url: request.query.url});
    } catch(err) {
      console.log("Open err:");
      console.log(err);
    }
    
    code ? response.send(code) : response.send(false);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    // saves the code to server
    let saved = true;
    try {
      await this.codeRespository.update({url: request.body.url}, {date: 'now()', codeText: request.body.codeText});
    } catch(err) {
      console.log("Save err:");
      console.log(err);
      saved = false;
    }
    
    response.send(saved);
  }
}