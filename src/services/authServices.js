import pool from '../config/conn.js';




/* Relaciona los datos de las tablas user_has_role, user y role y devuelve todos
    los datos del usuario que cumpla el parametro pasado.
*/
const getUserFromDB = async (params) => {
    try {
        let [rows] = await pool.query(
            'SELECT * FROM user_has_role ' +
            'INNER JOIN user ' +
            'ON user.user_id = user_has_role.user_user_id ' +
            'INNER JOIN role ' +
            'ON role.role_id = user_has_role.role_role_id ' +
            'WHERE ?', params
        )

        return rows[0];
    } catch (error) {
        console.log('Error con los datos del usuario:', error);

        throw error;
    }
}


export default getUserFromDB;