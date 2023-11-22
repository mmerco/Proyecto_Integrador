import express from 'express';
import shopControllers from '../controllers/shopController.js';

const router = express.Router();

router.get('/', shopControllers.all);
router.get('/:category', shopControllers.category);
router.get('/item/:id', shopControllers.item);
router.post('/item/:id/add', shopControllers.addItem);
router.get('/cart', shopControllers.cart);
router.post('/cart', shopControllers.cartPost);


export default router;