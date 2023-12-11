import express from 'express';
import {
    authControllers,
    loginControllerPOST,
    registerControllerPOST
} from '../controllers/authController.js'

const router = express.Router();


// ROUTES
router.get('/login', authControllers.login);

router.post('/login', loginControllerPOST);

router.get('/register', authControllers.register);

router.post('/register', registerControllerPOST);

router.get('/logout', authControllers.logout);


export default router;