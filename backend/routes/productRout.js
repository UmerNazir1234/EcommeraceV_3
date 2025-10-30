import express from 'express'
import {addproduct,listproduct,removeproduct,singlproduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/admainAuth.js';
const productRouter = express.Router();

productRouter.post('/add',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addproduct);
productRouter.get('/list',listproduct);
productRouter.post('/remove',adminAuth,removeproduct);
productRouter.post('/single',singlproduct);

export default productRouter;