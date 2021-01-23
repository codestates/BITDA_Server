import express from 'express';
import { drinkController } from '../controller';
import checkToken from '../utils/sign/checkToken';
import upload from '../utils/upload/uploadDrink';
const router = express.Router();

router.get('/list/:skip', drinkController.list);
router.get('/detail/:drinkId', checkToken, drinkController.detail);
router.post('/list/type/:skip', drinkController.typeList);
router.post('/like', checkToken, drinkController.like);
router.post('/unlike', checkToken, drinkController.unlike);
router.post('/add', upload.single('img'), drinkController.add);

export default router;
