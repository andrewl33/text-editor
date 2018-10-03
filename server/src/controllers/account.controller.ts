import {NextFunction, Request, Response} from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import { accountExists, deleteAccountDB, insertNewAccount, getHashFromAccount, account } from '../models/account.model';

async function tokenForUser(user: string) {
  return new Promise((res, rej) => {
    jwt.sign({sub: user}, jwtSecret, (err: any, token: string) => {
      if (err) rej(err);
      else res(token);
    });
  });
}

async function validateUser(token: string) {
  try {
    const decoded = jwt.verify(token, jwtSecret) as {sub: string};
    return await accountExists(decoded.sub);
  } catch(e) {
    console.log("validate user error:");
    console.log(e);
    return false;
  }
}

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
    return await res.send({success: await insertNewAccount(accountName, hashedPass), token: await tokenForUser(accountName)});
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
    res.send({success: isSame, token: await tokenForUser(accountName)});
  });
}


// TODO: Delete an account
// TODO: create file association with user
// TODO: remove file from association with user
// TODO: create collection association with user
// TODO: remove collection association with user
// TODO: get all files from your account
// TODO: get all collections from your account