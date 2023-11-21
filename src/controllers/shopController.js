import data from '../data/itemsData.js';


const shopControllers = {
    shop: (req, res) => res.render('shop', {
        data: data,
        title: 'Shop | Funkoshop'
    }),
    item: (req, res) => res.send(`Route for Item ${req.params.id} View`),
    addItem: (req, res) => res.send('Route for add item View POST'),
    cart: (req, res) => res.send('Route for Cart View'),
    cartPost: (req, res) => res.send('Route for Cart View POST')
}


export default shopControllers;