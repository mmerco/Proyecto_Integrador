const authControllers = {
    login: (req, res) => res.send('Route for Login View'),
    loginPost: (req, res) => res.send('Route for Login View POST'),
    register: (req, res) => res.send('Route for Register View'),
    registerPost: (req, res) => res.send('Route for Register View POST'),
    logout: (req, res) => res.send('Route for Logout View')
}


export default authControllers;
