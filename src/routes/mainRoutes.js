import express from 'express';
import {
    mainControllers,
    homeController,
    aboutController
} from '../controllers/mainController.js'

const router = express.Router();

router.get('/', homeController);
router.get('/home', homeController);
router.get('/contact', mainControllers.contact);
router.get('/about', aboutController);
router.get('/faqs', mainControllers.faqs);


export default router;