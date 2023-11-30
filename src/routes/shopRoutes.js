import express from 'express';
import {
    shopControllers,
    shopController,
    categoryController
} from '../controllers/shopController.js';

const router = express.Router();

router.get('/cart', shopControllers.cart);
router.post('/cart', shopControllers.cartPost);
router.get('/category/:category', categoryController);
router.get('/collection/:collection', shopControllers.category);
router.get('/item/:id', shopControllers.item);
router.post('/item/:id/add', shopControllers.addItem);
router.get('/', shopController);


export default router;