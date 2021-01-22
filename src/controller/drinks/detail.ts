import { Request, Response } from 'express';
import Drink from '../../entity/Drinks';
import Bookmark from '../../entity/Bookmark';
import { BookmarkDrinks } from '../../definitions'
export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id = res.locals.decodedId;
    console.log(id);
    const detail = await Drink.detailView(req.params.drinkId);
    const check: BookmarkDrinks[] = await Bookmark.bookMarkList(id)
    let result;
    for (let i = 0; i < check.length; i++) {
      if (check[i].drink.id === Number(req.params.drinkId)) {
        result = true;
        break;
      } else{
       continue; 
      }
    } if (result === true){
      res.send({...detail, bookmark:true})
    } else {
      res.send({...detail, bookmark:false})
    }
  } catch (err) {
    res.status(404).send({ message: 'error message ' });
  }
};

