import {NextFunction, Request, Response} from 'express';
import * as bcrypt from 'bcrypt';
import { accountExists, deleteAccountDB, insertNewAccount, getHashFromAccount, account } from '../models/account.model';
import { createToken } from './token';
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
    return await res.send({success: await insertNewAccount(accountName, hashedPass), token: await createToken(accountName, [], [])});
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


// TODO: Delete an account
// TODO: create file association with user
// TODO: remove file from association with user
// TODO: create collection association with user
// TODO: remove collection association with user
// TODO: get all files from your account
// TODO: get all collections from your account