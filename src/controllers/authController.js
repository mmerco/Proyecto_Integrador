import getCategorysFromDB from "../services/categorysServices.js";
import {
    getUser,
    createUser
} from "../models/authModel.js";



export const loginControllerPOST = async (req, res) => {

    let response = await getUser(req.body, req.session);

    if (response.status) {

        if (req.session.admin || req.session.mod) {

            res.redirect('/admin');
        } else {

            res.redirect('/home');
        }
    } else {

        res.render('login', response.data);
    }
}



export const registerControllerPOST = async (req, res) => {

    let response = await createUser(req.body, req.session);

    if (response.status) {

        res.redirect('/home');
    } else {

        res.render('register', response.data);
    }
}



export const authControllers = {
    login: async (req, res) => {
        res.render('login', {
            title: 'Login | Funkoshop',
            submenu_data: await getCategorysFromDB(),
            session_name: req.session.name ? req.session.name : false,
            cart_number: req.session.cart ? req.session.cart.length : 0,
            msg: false
        });
    },
    register: async (req, res) => {
        res.render('register', {
            title: 'Register | Funkoshop',
            submenu_data: await getCategorysFromDB(),
            session_name: req.session.name ? req.session.name : false,
            cart_number: req.session.cart ? req.session.cart.length : 0,
            msg: false

        });
    },
    logout: (req, res) => {
        req.session.destroy();

        res.redirect('login');
    }
}
