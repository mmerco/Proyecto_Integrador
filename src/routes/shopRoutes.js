import express from 'express';
import {
    shopControllers,
    shopController,
    categoryController,
    collectionController,
    itemController
} from '../controllers/shopController.js';

const router = express.Router();

router.get('/cart', shopControllers.cart);
router.post('/cart', shopControllers.cartPost);
router.get('/category/:category', categoryController);
router.get('/collection/:collection', collectionController);
router.get('/item/:id', itemController);
router.post('/item/:id/add', shopControllers.addItem);
router.get('/', shopController);


export default router;