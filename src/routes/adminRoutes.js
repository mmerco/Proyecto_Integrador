import express from "express";
import upload from "../middlewares/upload.js";
import {
    adminController,
    adminControllers,
    searchController,
    editController,
    createController,
    createControllerPOST,
    editControllerPUT
} from "../controllers/adminController.js";


const router = express.Router();


// ROUTES
router.get('/', adminController);
router.get('/search', searchController);
router.get('/create', createController);
router.post('/create', upload, createControllerPOST);
router.get('/edit/:id', editController);
router.put('/edit/:id', upload, editControllerPUT);
router.delete('/delete/:id', adminControllers.delete);


export default router;