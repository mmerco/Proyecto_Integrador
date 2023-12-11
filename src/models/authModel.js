import {
    getUserFromDB,
    createUserIntoDB,
    getAllUsersFromDB
} from "../services/authServices.js";
import getCategorysFromDB from '../services/categorysServices.js';



export const getUser = async (body, session) => {
    try {
        let { email, pass } = body;
        let userData = await getUserFromDB({ email: email });

        if (userData && userData.password == pass) {

            // Si los datos coinciden activa la session con el rol de usuario correspondiente
            userData.role_name == 'admin' ? session.admin = true : session.admin = false;
            userData.role_name == 'mod' ? session.mod = true : session.mod = false;
            userData.role_name == 'usuario' ? session.user = true : session.user = false;

            session.name = userData.name;


            return { status: true }
        } else {

            return {
                status: false,
                data: {
                    title: 'Login | Funkoshop',
                    submenu_data: await getCategorysFromDB(),
                    session_name: session.name ? session.name : false,
                    cart_number: session.cart ? session.cart.length : 0,
                    msg: 'Usuario o contraseña invalido. Intente nuevamente'
                }
            }
        }
    } catch (error) {
        console.log('Se produjo un error al traer la informacion del usuario: ', error);

        throw error;
    }
}



export const createUser = async (formData, session) => {
    try {
        let usersData = await getAllUsersFromDB();

        // Comprueba que no haya un usuario registrado con ese email (clave única) en la DB
        let filterData = usersData.filter(user => user.email == formData.email);

        if (filterData.length > 0) {

            return {
                status: false,
                data: {
                    title: 'Register | Funkoshop',
                    submenu_data: await getCategorysFromDB(),
                    session_name: session.name ? session.name : false,
                    cart_number: session.cart ? session.cart.length : 0,
                    msg: `Ya existe un usuario registrado con el e-mail ${formData.email}`
                }
            }
        } else {
            // Si el usuario no esta registrado lo crea y activa la session con rol user
            let newUserData = await createUserIntoDB(formData);

            session.user = true;
            session.admin = false;
            session.mod = false;
            session.name = newUserData.name;

            return { status: true };
        }
    } catch (error) {
        console.log('Se produjo un error al crear el usuario: ', error);

        throw error;
    }
}