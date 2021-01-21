import { NextFunction, Request, Response } from 'express';
import Bookmark from '../../entity/Bookmark';
import { UserData } from '../../definitions';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const id: number = res.locals.decodedId;
    const drinks: object[] = await Bookmark.bookMarkList(id);
    res.status(200).send({ drinks });
  } catch (err) {
    next(err);
  }
};
