import express from 'express';
import shopControllers from '../controllers/shopController.js';

const router = express.Router();

router.get('/cart', shopControllers.cart);
router.post('/cart', shopControllers.cartPost);
router.get('/category/:category', shopControllers.category);
router.get('/collection/:collection', shopControllers.category);
router.get('/item/:id', shopControllers.item);
router.post('/item/:id/add', shopControllers.addItem);
router.get('/', shopControllers.all);


export default router;