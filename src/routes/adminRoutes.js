import express from "express";
import {
    adminController,
    adminControllers,
    searchController,
    editController
} from "../controllers/adminController.js";

const router = express.Router();

router.get('/', adminController);
router.get('/search', searchController);
router.get('/create', adminControllers.create);
router.post('/create', adminControllers.createPost);
router.get('/edit/:id', editController);
router.put('/edit/:id', adminControllers.editPut);
router.delete('/delete/:id', adminControllers.delete);


export default router;