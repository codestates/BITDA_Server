import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorization = req.headers['authorization'];

    if (authorization) {
      const token = authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET;
      const id = jwt.verify(token, secret, (err, verifiedJwt: any) => {
        if (err) {
          res.send(err.message);
        } else {
          return verifiedJwt.id;
        }
      });

      res.locals.decodedId = id;
      next();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
