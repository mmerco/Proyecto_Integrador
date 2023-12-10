import getCategorysFromDB from "../services/categorysServices.js";
import getUser from "../models/authModel.js";



export const loginPostController = async (req, res) => {

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


export const authControllers = {
    login: async (req, res) => {
        res.render('login', {
            title: 'Login | Funkoshop',
            submenu_data: await getCategorysFromDB(),
            cart_number: req.session.cart ? req.session.cart.length : 0,
            msj: false
        })
    },
    loginPost: (req, res) => res.send('Route for Login View POST'),
    register: async (req, res) => {
        res.render('register', {
            title: 'Register | Funkoshop',
            submenu_data: await getCategorysFromDB(),
            cart_number: req.session.cart ? req.session.cart.length : 0

        })
    },
    registerPost: (req, res) => res.send('Route for Register View POST'),
    logout: (req, res) => res.send('Route for Logout View')
}
