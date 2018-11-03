import { NextFunction, Request, Response } from "express";
import { allTags, createNewTag } from "../models/tag.model";

export const addTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resDB = await createNewTag(req.body.name);
    return res.send({ success: resDB });
  } catch (e) {
    console.log("addTag");
    console.log(e);
    return res.send({ success: false });
  }
};

export const getAllTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resDB = await allTags();
    res.send(resDB);
  } catch (e) {
    console.log("get all tags");
    console.log(e);
    res.send({ success: false });
  }
};
