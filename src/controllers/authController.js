import getCategorysFromDB from "../services/categorysServices.js";



const authControllers = {
    login: async (req, res) => {
        res.render('login', {
            title: 'Login | Funkoshop',
            submenu_data: await getCategorysFromDB(),
            cart_number: req.session.cart ? req.session.cart.length : 0
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


export default authControllers;
