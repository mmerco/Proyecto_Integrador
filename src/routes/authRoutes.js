import express from 'express';
import authControllers from '../controllers/authController.js'

const router = express.Router();

router.get('/login', authControllers.login);
router.post('/login', authControllers.loginPost);
router.get('/register', authControllers.register);
router.post('/register', authControllers.registerPost);
router.get('/logout', authControllers.logout);


export default router;