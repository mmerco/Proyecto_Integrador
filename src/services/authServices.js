import pool from '../config/conn.js';




/* Devuelve todos los usuarios de la tabla User
*/
export const getAllUsersFromDB = async () => {
    try {
        let [rows] = await pool.query(
            'SELECT * FROM user'
        );

        return rows;
    } catch (error) {
        console.log('Error al traer los datos de los uruarios:', error);

        throw error;
    }
}



/* Relaciona los datos de las tablas user_has_role, user y role y devuelve todos
    los datos del usuario que cumpla el parametro pasado.
*/
export const getUserFromDB = async (params) => {
    try {
        let [rows] = await pool.query(
            'SELECT * FROM user_has_role ' +
            'INNER JOIN user ' +
            'ON user.user_id = user_has_role.user_user_id ' +
            'INNER JOIN role ' +
            'ON role.role_id = user_has_role.role_role_id ' +
            'WHERE ?', params
        );

        return rows[0];
    } catch (error) {
        console.log('Error con los datos del usuario:', error);

        throw error;
    }
}



/* Crea un nuevo usuario en la tabla User con los datos pasados como parametro.
    Luego ingresa en la tabla user_has_role el nuevo user con su rol de usuario.
*/
export const createUserIntoDB = async (params) => {
    try {
        let [resultData] = await pool.query(
            'INSERT INTO user ' +
            'SET ?', params
        );

        let userHasRole = { user_user_id: resultData.insertId, role_role_id: 3 };

        await pool.query(
            'INSERT INTO user_has_role ' +
            'SET ?', userHasRole
        );

        return resultData;
    } catch (error) {
        console.log('Error al crear el usuario:', error);

        throw error;
    }
}