import { NextFunction, Request, Response } from "express";

const setToken = async (req: Request, res: Response, next: NextFunction) => {
  res.set({ Authorization: req.headers.authorization });
  next();
};

export default setToken;
