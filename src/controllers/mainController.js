import getCollections from '../models/mainModel.js';
import { getAllItems } from '../models/shopModel.js';



export const homeController = async (req, res) => {
    try {
        let collectionsData = await getCollections();
        let itemsData = await getAllItems();

        res.render('home', {
            title: 'Home | Funkoshop',
            banner_title: 'nuevos ingresos',
            banner_text: 'Descubri el próximo Funko Pop de tu colección',
            banner_link_text: 'SHOP',
            collections: collectionsData,
            slider_title: 'últimos lanzamientos',
            slider_items: itemsData

        });
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const aboutController = async (req, res) => {
    try {
        let itemsData = await getAllItems();

        res.render('about', {
            title: 'About Us | Funkoshop',
            banner_title: 'nuevos ingresos',
            banner_text: 'Descubri el próximo Funko Pop de tu colección',
            banner_link_text: 'SHOP',
            slider_title: 'últimos lanzamientos',
            slider_items: itemsData

        });
    } catch (error) {
        console.log('Se produjo un error: ', error);

        throw error;
    }
}


export const mainControllers = {
    contact: (req, res) => res.render('contact', {
        title: 'Contact | Funkoshop'
    }),
    about: (req, res) => res.render('about', {
        title: 'About Us | Funkoshop',
        banner_title: 'nuevos ingresos',
        banner_text: 'Descubri el próximo Funko Pop de tu colección',
        banner_link_text: 'SHOP',
        slider_title: 'últimos lanzamientos'
    }),
    faqs: (req, res) => res.render('faqs', {
        title: 'Faqs | Funkoshop'
    })
}

