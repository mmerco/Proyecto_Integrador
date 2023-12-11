import pool from '../config/conn.js';




/* Trae los datos de la tabla License ordenados alfabeticamente por nombre */
const getCollectionsFromDB = async () => {
    try {
        let [rows] = await pool.query(
            'SELECT * FROM license ' +
            'ORDER BY license_name'
        );

        return rows;
    } catch (error) {
        console.log('Error al traer informacion de la base de datos:', error);

        throw error;
    }
}


export default getCollectionsFromDB;