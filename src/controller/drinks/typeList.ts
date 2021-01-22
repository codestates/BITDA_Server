import { NextFunction, Request, Response } from 'express';
import { FindOperator } from 'typeorm';
import Drink from '../../entity/Drinks';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);

    const whereObj: object = {
      type: '탁주/막걸리',
      price: '1~2만원',
    };
  } catch (err) {
    next(err);
  }
};
