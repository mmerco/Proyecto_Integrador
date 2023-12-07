import express from 'express';
import {
    shopControllers,
    shopController,
    categoryController,
    collectionController,
    itemController,
    addItemController,
    cartController
} from '../controllers/shopController.js';

const router = express.Router();

router.get('/cart', cartController);
router.post('/cart', shopControllers.cartPost);
router.get('/category/:category', categoryController);
router.get('/collection/:collection', collectionController);
router.get('/item/:id', itemController);
router.post('/item/:id/add', addItemController);
router.get('/', shopController);


export default router;