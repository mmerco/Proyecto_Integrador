import { getItems, getCategory } from '../models/shopModel.js'


const shopControllers = {
    all: (req, res) => res.render('shop', {
        data: getItems(),
        title: 'Shop | Funkoshop'
    }),
    category: (req, res) => res.render('shop', {
        data: getCategory(req.params.category),
        title: 'Shop | Funkoshop'
    }),
    item: (req, res) => res.send(`Route for Item ${req.params.id} View`),
    addItem: (req, res) => res.send('Route for add item View POST'),
    cart: (req, res) => res.send('Route for Cart View'),
    cartPost: (req, res) => res.send('Route for Cart View POST')
}


export default shopControllers;