import pool from '../config/conn.js';




/* Trae los datos de la tabla License */
const getCollectionsFromDB = async () => {
    try {
        let [rows] = await pool.query('SELECT * FROM license');

        return rows;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }
}


export default getCollectionsFromDB;