import { NextFunction, Request, Response } from 'express';
import Review from '../../entity/Review';
import { ReviewData } from '../../definitions';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = res.locals.decodedId;
    const reviewId: number = req.body.reviewId;

    const review: ReviewData = await Review.findOne({ id: reviewId });

    if (review.userId === id) {
      await Review.deleteReview(reviewId);
      res.status(200).send({ message: 'success' });
    }
  } catch (err) {
    next(err);
  }
};
