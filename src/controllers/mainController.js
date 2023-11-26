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
    contact: (req, res) => res.render('contact', {
        title: 'Contact | Funkoshop'
    }),
    about: (req, res) => res.render('about', {
        items: data,
        title: 'About Us | Funkoshop',
        banner_title: 'nuevos ingresos',
        banner_text: 'Descubri el próximo Funko Pop de tu colección',
        link_text: 'SHOP',
        slider_title: 'últimos lanzamientos'
    }),
    faqs: (req, res) => res.render('faqs', {
        title: 'Faqs | Funkoshop'
    })
}


export default mainControllers;        