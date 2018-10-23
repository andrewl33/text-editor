import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../config";
import { IToken } from "../types";

export async function updateToken(
  oldToken: IToken,
  user: string,
  collections: string[],
  files: string[]
) {
  if (oldToken === null) {
    return await createToken(user, collections, files);
  } else {
    const c = [...new Set(oldToken.collections.concat(collections))];
    const f = [...new Set(oldToken.files.concat(files))];

    return await createToken(oldToken.user, c, f);
  }
}

export async function createToken(
  user: string,
  collections: string[],
  files: string[]
) {
  return new Promise((res, rej) => {
    jwt.sign(
      { user, files, collections },
      jwtSecret,
      (err: any, token: string) => {
        if (err) { rej(err); }
        else { res(token); }
      }
    );
  });
}

export async function decodeToken(token: string) {
  if (token === "" || token === undefined || token === null) {
    return null;
  }

  try {
    const decoded = (await jwt.verify(
      token.replace("Bearer ", ""),
      jwtSecret
    )) as IToken;
    return decoded;
  } catch (e) {
    console.log("auth verify error:");
    console.log(e);

    return null;
  }
}
