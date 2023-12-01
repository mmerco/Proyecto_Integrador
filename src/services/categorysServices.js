import pool from '../config/conn.js';




/* Trae los datos de la tabla category ordenados alfabeticamente por nombre */
const getCategorysFromDB = async () => {
    try {
        let [rows] = await pool.query(
            'SELECT * FROM category ' +
            'ORDER BY category_name'
        );

        return rows;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }
}


export default getCategorysFromDB;