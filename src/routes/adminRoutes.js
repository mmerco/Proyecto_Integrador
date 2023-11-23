import express from "express";
import adminControllers from "../controllers/adminController.js";

const router = express.Router();

router.get('/', adminControllers.admin);
router.get('/search', adminControllers.search);
router.get('/create', adminControllers.create);
router.post('/create', adminControllers.createPost);
router.get('/edit/:id', adminControllers.edit);
router.put('/edit/:id', adminControllers.editPut);
router.delete('/delete/:id', adminControllers.delete);


export default router;