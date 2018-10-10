import {NextFunction, Request, Response} from 'express';
import * as bcrypt from 'bcrypt';
import { accountExists, insertNewAccount, getHashFromAccount, account } from '../models/account.model';
import { findAllCollectionsForAnAccount, addCollectionToAccount, removeCollectionFromAccount } from '../models/collectionAccount.model';
import { findAllFilesForAnAccount, addFileToAccount, removeFileFromAccount } from '../models/fileAccount.model';
import { createToken, decodeToken, updateToken } from './token';

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  const { accountName, password } =  req.body;

  // gaurd for empty
  if (!accountName || !password) {
    return res.status(422).send({error: 'Account name or password needed.'});
  }

  // check to make sure account does not exist
  try {
    if (await accountExists(accountName)) {
      return res.status(422).send({error: 'Account name exists'});
    }
  } catch(e) {
    console.log(e);
  }

  let hashedPass: string;

  // create a new hash
  try {
    hashedPass = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err: any, hash: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    }) as string; 
  } catch (e) {
    console.log(e);
  }

  try {
    const success = await insertNewAccount(accountName, hashedPass);
    if (success) {
      const token = await createToken(accountName, [], []);
      res.set({'Authorization': 'Bearer ' + token});
    }

    return await res.send({success});
  } catch(e) {
    return  res.send({success: false});
  }

}


export const authenticateAccount = async (req: Request, res: Response, next: NextFunction) => {
  const { accountName, password } =  req.body;

  if (!accountName || !password) {
    return res.status(422).send({error: 'Account name or password needed.'});
  }

  let hashObj: {hash: string, success: boolean};
  
  try {
    // probably should remove this
    // they shouldn't be able to check accounts
    if (!await accountExists(accountName)) {
      return res.status(422).send({error: 'Account does not exist'});
    }

    hashObj = await getHashFromAccount(accountName);

  } catch(e) {
    console.log(e);
  }


  await bcrypt.compare(password, hashObj.hash, async (err, isSame) => {
    if (err) {console.log(err)};
    res.send({success: isSame, token: await createToken(accountName, [], [])});
  });
}

export const logout =  async (req: Request, res: Response, next: NextFunction) => {
  res.set({'Authorization':''});
  res.send({success: true});
}

export const addFile = async (req: Request, res: Response, next: NextFunction) => {

  const uuid = req.body.addUuid.replace('/', '');
  const decoded = await decodeToken(req.headers.authorization);
  try {
    const resDB = await addFileToAccount(decoded.user, uuid);
    if (resDB) {
      const token = await updateToken(decoded, '', [], [uuid]);
      res.set({'Authorization': 'Bearer ' + token});
    }
    return await res.send({success: resDB});
  } catch(e) {
    console.log('addFile');
    console.log(e);
  }

}

export const addCollection = async (req: Request, res: Response, next: NextFunction) => {

  const uuid = req.body.addUuid.replace('/', '');
  const decoded = await decodeToken(req.headers.authorization);
  try {
    const resDB = await addCollectionToAccount(decoded.user, uuid);
    if (resDB) {
      const token = await updateToken(decoded, '', [uuid], []);
      res.set({'Authorization': 'Bearer ' + token});
    }
    return await res.send({success: resDB});
  } catch(e) {
    console.log('addCollection');
    console.log(e);
  }

}

export const removeFile = async (req: Request, res: Response, next: NextFunction) => {
  
  const uuid = req.body.removeUuid.replace('/','');
  
  try {
    const decoded = await decodeToken(req.headers.authorization);
    const fileIdx = decoded.files.indexOf(uuid);
    if (fileIdx > -1) {
      const resDB = await removeFileFromAccount(decoded.user, uuid);

      if (resDB) {
        const token = await createToken(decoded.user, decoded.collections, decoded.files.splice(fileIdx, 1));
        res.set({'Authorization': 'Bearer ' + token});
      }

      return await res.send({success: resDB});
    }

    res.send({success: false});
  } catch(e) {
    console.log('removeFile');
    console.log(e);
    res.send({success: false});
  }
}

export const removeCollection = async (req: Request, res: Response, next: NextFunction) => {
  
  const uuid = req.body.removeUuid.replace('/','');

  try {
    const decoded = await decodeToken(req.headers.authorization);
    const collectionIdx = decoded.collections.indexOf(uuid);
    if (collectionIdx > -1) {
      const resDB = await removeCollectionFromAccount(decoded.user, uuid);

      if (resDB) {
        const token = await createToken(decoded.user, decoded.collections.splice(collectionIdx, 1), decoded.files);
        res.set({'Authorization': 'Bearer ' + token});
      }

      return await res.send({success: resDB});
    }

    res.send({success: false});
  } catch(e) {
    console.log('removeCollection');
    console.log(e);
    res.send({success: false});
  }
}

export const getAllFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decode = await decodeToken(req.headers.authorization);
    const resDB = await findAllFilesForAnAccount(decode.user);

    res.send({success: true, files: resDB});
  } catch(e) {
    console.log('getAllCollections');
    console.log(e);
    res.send({success: false});
  }
}

export const getAllCollections =  async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    // maybe use the JWT instead?

    const decode = await decodeToken(req.headers.authorization);
    const resDB = await findAllCollectionsForAnAccount(decode.user);

    res.send({success: true, collections: resDB});
  } catch(e) {
    console.log('getAllCollections');
    console.log(e);
    res.send({success: false});
  }

}

