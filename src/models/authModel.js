import getUserFromDB from "../services/authServices.js";
import getCategorysFromDB from '../services/categorysServices.js';



const getUser = async (body, session) => {
    try {
        const { email, pass } = body;
        const userData = await getUserFromDB({ email: email });
        console.log(email);
        console.log(pass);
        console.log(userData);
        if (userData && userData.password == pass) {

            userData.role_name == 'admin' ? session.admin = true : session.admin = false;
            userData.role_name == 'mod' ? session.mod = true : session.mod = false;

            session.name = userData.name;


            return { status: true, data: {} }
        } else {

            return {
                status: false,
                data: {
                    title: 'Login | Funkoshop',
                    submenu_data: await getCategorysFromDB(),
                    cart_number: session.cart ? session.cart.length : 0,
                    msj: 'Usuario o contraseña invalido. Intente nuevamente'
                }
            }
        }
    } catch (error) {
        console.log('Se produjo con el usuario: ', error);

        throw error;
    }
}



export default getUser;