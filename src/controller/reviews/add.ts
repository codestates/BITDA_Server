import { NextFunction, Request, Response } from 'express';
import { UserData } from '../../definitions';
import User from '../../entity/User';
import Review from '../../entity/Review';
import { ReviewData } from '../../definitions';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const id: number = res.locals.decodedId;
    const { drinkId, text, rating } = req.body;
    const user: UserData = await User.findOne({ id });

    if (user) {
      const newReview: ReviewData = await Review.addReview(
        id,
        drinkId,
        text,
        rating
      );
      if (newReview) {
        res.status(200).send({
          id: newReview.id,
          userId: user.id,
          userName: user.userName,
          userImage: user.userImage,
          text: newReview.text,
          rating: newReview.rating,
        });
      } else {
        res.status(400).send({ message: '등록 실패' });
      }
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } catch (err) {
    next(err);
  }
};
