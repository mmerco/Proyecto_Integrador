import express from "express";
import upload from "../middlewares/upload.js";
import {
    adminController,
    searchController,
    editController,
    createController,
    createControllerPOST,
    editControllerPUT,
    deleteController
} from "../controllers/adminController.js";


const router = express.Router();


// ROUTES
router.get('/', adminController);

router.get('/search', searchController);

router.get('/create', createController);

router.post('/create', upload, createControllerPOST);

router.get('/edit/:id', editController);

router.put('/edit/:id', upload, editControllerPUT);

router.delete('/delete/:id', deleteController);



export default router;