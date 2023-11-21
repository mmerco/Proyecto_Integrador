import data from "../data/itemsData.js";


const mainControllers = {
    home: (req, res) => res.render('home', {
        items: data,
        title: 'Home | Funkoshop',
        banner_title: 'nuevos ingresos',
        banner_text: 'Descubri el próximo Funko Pop de tu colección',
        link_text: 'SHOP',
        slider_title: 'últimos lanzamientos'
    }),
    contact: (req, res) => res.send('Route for Contact View'),
    about: (req, res) => res.send('Route for About View'),
    faqs: (req, res) => res.send('Route for Faqs View')
}


export default mainControllers;        