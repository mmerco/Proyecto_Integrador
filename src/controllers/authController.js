const authControllers = {
    login: (req, res) => res.render('login', {
        title: 'Login | Funkoshop'
    }),
    loginPost: (req, res) => res.send('Route for Login View POST'),
    register: (req, res) => res.render('register', {
        title: 'Register | Funkoshop'
    }),
    registerPost: (req, res) => res.send('Route for Register View POST'),
    logout: (req, res) => res.send('Route for Logout View')
}


export default authControllers;
