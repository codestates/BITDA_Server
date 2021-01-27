import { Request, Response } from 'express';
import Drink from '../../entity/Drinks';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const skip: number = Number(req.params.skip);
    const drinkList = await Drink.allDrinkList(skip);
    if (drinkList) {
      res.status(200).send(drinkList);
    }
  } catch (err) {
    res.status(404).send({ message: 'error message ' });
  }
};
