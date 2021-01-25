import { Request, Response } from 'express';
import Bookmark from '../../entity/Bookmark';
export default async (req: Request, res: Response): Promise<void> => {
  try {
	const id = res.locals.decodedId;
	await Bookmark.addLike(id, req.body.drinkId);
	console.log(id)
	res.send({ bookMark: true })
  } catch (err) {
    res.send({ message: 'error message' });
  }
};
