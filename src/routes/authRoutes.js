import express from 'express';
import {
    authControllers,
    loginPostController
} from '../controllers/authController.js'

const router = express.Router();

router.get('/login', authControllers.login);
router.post('/login', loginPostController);
router.get('/register', authControllers.register);
router.post('/register', authControllers.registerPost);
router.get('/logout', authControllers.logout);


export default router;