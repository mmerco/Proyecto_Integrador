import getCollectionsFromDB from "../services/collectionsServices.js";



const getCollections = async () => {
    try {
        let collections = await getCollectionsFromDB();
        let randomColections = [];

        // Se buscan 3 colecciones aleatorias para la pagina home
        for (let i = 0; i < 3; i++) {
            let index = Math.floor(Math.random() * collections.length);
            let found = randomColections.find(item => item == collections[index]);

            if (!found) {
                randomColections.push(collections[index]);
            } else {
                i--;
            }
        }

        return randomColections;
    } catch (error) {
        console.log('Se produjo un error al conseguir las colecciones: ', error);

        throw error;
    }
}



export default getCollections; 