import { Request, Response } from 'express';
import Bookmark from '../../entity/Bookmark';
export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id = res.locals.decodedId;
    await Bookmark.removeLike(id, req.body.drinkId);
    res.status(200).send({ bookMark: false });
  } catch (err) {
    res.status(404).send({ message: 'error message' });
  }
};
