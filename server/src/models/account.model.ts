import * as bcrypt from "bcrypt";
import query from "./query";

export const account = "account";
export const accountModel = `
  CREATE TABLE account (
    id int AUTO_INCREMENT PRIMARY KEY,
    account_name VARCHAR(255) not null,
    password VARCHAR(255) not null
  ) ENGINE=InnoDB;
`;

export const initialAccountInsert = async () => {
  const accountData = [
    ["account1", "pass1"],
    ["account2", "pass2"],
    ["account3", "pass3"],
    ["account4", "pass4"],
    ["account5", "pass5"]
  ];

  for (let i = 0; i < accountData.length; i++) {
    accountData[i][1] = (await new Promise((resolve, reject) => {
      bcrypt.hash(accountData[i][1], 10, (err: any, hash: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    })) as string;
  }

  for (let i = 0; i < accountData.length; i++) {
    await insertNewAccount(accountData[i][0], accountData[i][1]);
  }
};

export const accountExists = async (accountName: string): Promise<boolean> => {
  let isValidAccount = false;

  try {
    const dbRes = await query(`SELECT * FROM account WHERE account_name=?`, [
      accountName
    ]);

    if (dbRes[0].length > 0) {
      isValidAccount = true;
    }
  } catch (e) {
    console.log("account exists error:");
    console.log(e);
  }

  return isValidAccount;
};

export const insertNewAccount = async (
  accountName: string,
  hashPass: string
): Promise<boolean> => {
  let didInsertAccount = false;

  try {
    const dbRes = await query(
      `INSERT INTO account (account_name,  password) VALUES (?, ?)`,
      [accountName, hashPass]
    );
    didInsertAccount = true;
  } catch (e) {
    console.log("new account insert error");
    console.log(e);
  }

  return didInsertAccount;
};

export const getHashFromAccount = async (
  accountName: string
): Promise<{ hash: string; success: boolean }> => {
  const payload = { hash: "", success: false };

  try {
    const hashedPass = await query(
      `SELECT password FROM account WHERE account_name=?`,
      [accountName]
    );
    payload.hash = hashedPass[0][0].password;
    payload.success = true;
  } catch (e) {
    console.log("get password error");
    console.log(e);
  }

  return payload;
};

// delete account
export const deleteAccountDB = async (
  accountName: string
): Promise<boolean> => {
  let success = false;

  try {
    const deletedAccount = await query(
      `DELETE FROM account WHERE account_name=?`,
      [accountName]
    );

    if (deletedAccount.affectedRows > 0) {
      success = true;
    }
  } catch (e) {
    console.log(e);
  }

  return success;
};
