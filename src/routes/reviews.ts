import express from 'express';
import { reviewContoller } from '../controller';
import checkToken from '../utils/sign/checkToken';
const router = express.Router();

router.post('/add', checkToken, reviewContoller.add);
router.delete('/remove', checkToken, reviewContoller.remove);
router.get('/list/:drinkId', reviewContoller.list);

export default router;
