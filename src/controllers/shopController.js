import { getItem, capitalize } from '../models/shopModel.js'


const shopControllers = {
    all: (req, res) => res.render('shop', {
        data: 'ss',
        title: 'Shop | Funkoshop'
    }),
    category: (req, res) => res.render('shop', {
        data: 'ss',
        title: `${capitalize(req.params.category)} | Funkoshop`
    }),
    item: (req, res) => res.render(`item`, {
        item: getItem(req.params.id),
        title: `title | Funkoshop`,
        slider_title: 'productos relacionados',
        items: 'ss'
    }),
    addItem: (req, res) => res.send('Route for add item View POST'),
    cart: (req, res) => res.render('cart', {
        title: 'Cart | Funkoshop'
    }),
    cartPost: (req, res) => res.send('Route for Cart View POST')
}


export default shopControllers;