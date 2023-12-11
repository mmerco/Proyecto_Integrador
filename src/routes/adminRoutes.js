import express from "express";
import upload from "../middlewares/upload.js";
import {
    adminAuth,
    modAuth
} from '../middlewares/auth.js'
import {
    adminController,
    adminSearchController,
    editController,
    createController,
    createControllerPOST,
    editControllerPUT,
    deleteController
} from "../controllers/adminController.js";


const router = express.Router();


// ROUTES
router.get('/', modAuth, adminController);

router.get('/search', modAuth, adminSearchController);

router.get('/create', adminAuth, createController);

router.post('/create', adminAuth, upload, createControllerPOST);

router.get('/edit/:id', modAuth, editController);

router.put('/edit/:id', modAuth, upload, editControllerPUT);

router.delete('/delete/:id', adminAuth, deleteController);



export default router;