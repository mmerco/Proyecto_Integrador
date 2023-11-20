import data from '../data/itemsData.js';


const adminControllers = {
    admin: (req, res) => res.render('admin', { data: data, title: 'Admin | Funkoshop' }),
    create: (req, res) => res.send('Route for Create View'),
    createPost: (req, res) => res.send('Route for Create View POST'),
    edit: (req, res) => res.send(`Route for Edit item ${req.params.id} View`),
    editPut: (req, res) => res.send('Route for Edit View PUT'),
    delete: (req, res) => res.send('Route for Delete View')
}


export default adminControllers;