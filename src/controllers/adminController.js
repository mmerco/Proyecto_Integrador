import { adminSearch } from '../models/adminModel.js'
import { getAllItems } from "../models/itemsModel.js";



export const adminController = async (req, res) => {

    res.render('admin', {
        data: await getAllItems(),
        title: 'Admin | Funkoshop'
    });
}


export const searchController = async (req, res) => {

    res.render('admin', {
        data: await adminSearch(req.query.search_value),
        title: 'Admin | Funkoshop'
    });
}


export const adminControllers = {
    create: (req, res) => res.send('Route for Create View'),
    createPost: (req, res) => res.send('Route for Create View POST'),
    edit: (req, res) => res.send(`Route for Edit item ${req.params.id} View`),
    editPut: (req, res) => res.send('Route for Edit View PUT'),
    delete: (req, res) => res.send('Route for Delete View')
}
