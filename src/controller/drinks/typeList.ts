import { NextFunction, Request, Response } from 'express';
import Drink from '../../entity/Drinks';
import { TypeList } from '../../definitions';
import { Between } from 'typeorm';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, price, taste, alcohol } = req.body;
    const typeList: TypeList = {};

    if (category.length) {
      typeList.type = category;
    }
    if (price.length) {
      typeList.price = price;
    }
    if (taste.length) {
      typeList.taste = taste;
    }
    if (alcohol === '있는편') {
      const more15 = () => Between(15, 100);
      typeList.alcohol = more15();
    }
    if (alcohol === '약한편') {
      const less15 = () => Between(0, 14);
      typeList.alcohol = less15();
    }

    const drinks = await Drink.find({
      select: ['id', 'drinkName', 'drinkImage', 'alcohol'],
      where: typeList,
    });

    res.status(200).send(drinks);
  } catch (err) {
    next(err);
  }
};
