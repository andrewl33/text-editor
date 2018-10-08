import { Request, Response, NextFunction } from 'express';
import { accountExists } from '../models/account.model';
import { isPrivate as codeFileIsPrivate, uuidExists } from '../models/codeFile.model';
import { isPrivate as collectionIsPrivate, urlExists } from '../models/collection.model';
import { decodeToken } from '../controllers/token';
import { IToken } from  '../types';


export const auth = async (req: Request, res: Response, next: NextFunction) => {
  
  const { pageType } = req.body;
  const url = req.body.url.replace(/\//g, '');
  const token = req.headers.authorization;

  try {

    if (!await contentIsPrivate(pageType, url)) {
      return next();
    }

    if (await urlDoesNotExist(pageType, url)) {
      return next();
    }

    if (token !== '' && token !== undefined) {

      const decoded: IToken = await decodeToken(token);
      console.log(decoded);
      if (decoded.user !== '' && await !accountExists(decoded.user)) {
        res.set({'Authorization': ''});
        return res.send({message :"logged out"});
      }

      if (await urlIsInToken(decoded, pageType, url)) {
        return next();
      } 
    } 
    return res.send({password: "required"});
    
  } catch (e) {
    console.log("auth error");
    console.log(e);
  }

}

function urlIsInToken(token: IToken, authType: string, uuid: string) {
  switch(authType) {
    case 'file':
      return token.files.indexOf(uuid) > -1;
    case 'collection':
      return token.collections.indexOf(uuid) > -1;
    case 'login':
      return true;
    default: 
      return false;
  }
}

async function urlDoesNotExist(pageType: string, uuid: string) {
  switch(pageType) {
    case 'file':
      return !await uuidExists(uuid);
    case 'collection':
      return !await urlExists(uuid);
    default: 
      return false;
  }
}

async function contentIsPrivate(authType: string, uuid: string): Promise<boolean> {
  switch (authType) {
    case 'userDashboard':
      return true;
    case 'file':
      return await codeFileIsPrivate(uuid);
    case 'collection':
      return await collectionIsPrivate(uuid);
    default:
      return true;
  }
}