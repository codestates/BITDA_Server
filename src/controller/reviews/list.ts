import { NextFunction, Request, Response } from 'express';
import Review from '../../entity/Review';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const drinkId: number = Number(req.params.drinkId);
    const reviews = await Review.reviewList(drinkId);
    res.status(200).send({ reviews });
  } catch (err) {
    next(err);
  }
};
