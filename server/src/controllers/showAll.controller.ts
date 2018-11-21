import { NextFunction, Request, Response } from "express";
import showAllModel, { filterText } from "../models/showAll.model";

export const showAll = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const info = await showAllModel();

    if (request.body.isFilter) {
      const filteredText = await filterText(request.body.filterString);
      return response.send({ success: true, allInfo: info, filteredText });
    } else {
      return response.send({ success: true, allInfo: info });
    }
  } catch (e) {
    console.log("Show all controller");
    console.log(e);

    return response.send({
      success: false
    });
  }
};
