import data from '../data/itemsData.js';



export const getItems = () => {
    let randomData = []; // Para v1, v3 y v4
    //let filterData = data.filter(item => item.category_name == 'funkos'); // Para v1 y v4
    let rows = Math.ceil(data.length / 3); // Para v2, v3
    //let rows = Math.ceil(filterData.length / 3); // Para v4
    let newData = [];
    let start = 0;
    let end = 3;


    /***************************************************************
     * @version v4 (Solo funkos y ordenados aleatoriamente)
     * @see shop.ejs @for @param data[1]
     * @see shop.ejs @foreach @param data[0][i]
    ***************************************************************/
    /*
     for (let i = 0; i < filterData.length; i++) {
         let id = Math.floor(Math.random() * data.length) + 1;
         let found = randomData.find(item => item.product_id == id);
 
         if (!found) {
             let [product] = filterData.filter(item => item.product_id == id);
 
             if (product.length) {
                 randomData.push(product);
             } else {
                 i--;
             }
 
         } else {
             i--;
         }
     }
 
     for (let i = 0; i < rows; i++) {
         let items = randomData.slice(start, end);
 
         start += 3;
         end += 3;
 
 
         newData.push(items)
     }
     */

    /***************************************************************
     * @version v3 (Todos los items y ordenados aleatoriamente)
     * @see shop.ejs @for @param data[1]
     * @see shop.ejs @foreach @param data[0][i]
    ***************************************************************/

    for (let i = 0; i < data.length; i++) {
        let id = Math.floor(Math.random() * data.length) + 1;
        let found = randomData.find(item => item.product_id == id);

        if (!found) {
            let [product] = data.filter(item => item.product_id == id)

            randomData.push(product);
        } else {
            i--;
        }
    }

    for (let i = 0; i < rows; i++) {
        let items = randomData.slice(start, end);

        start += 3;
        end += 3;


        newData.push(items)
    }


    /*****************************************************
     * @version v2 (Todos los items y ordenados alfabeticamente A-Z)
     * @see shop.ejs @for @param data[1]
     * @see shop.ejs @foreach @param data[0][i]
    *****************************************************/
    /* 
    const sortData = data.sort((a, b) => {
        if (a.product_name > b.product_name) {
            return 1;
        }
        if (a.product_name < b.product_name) {
            return -1;
        }

        return 0;
    });


    for (let i = 0; i < rows; i++) {
        let items = sortData.slice(start, end);

        start += 3;
        end += 3;


        newData.push(items)
    }
    */


    /*******************************************************************
     *  @version v1 (Solo funkos, ordenados aleatoriamente y 3 filas solamente)
     *  @see shop.ejs @for @param _3_
     *  @see shop.ejs @foreach @param data 
    *******************************************************************/
    /*
    for (let i = 0; i < 9; i++) {
        let id = Math.floor(Math.random() * data.length) + 1;
        let found = randomData.find(item => item.product_id == id);

        if (!found) {
            let [product] = filterData.filter(item => item.product_id == id);

            if (product.length) {
                randomData.push(product);
            } else {
                i--;
            }

        } else {
            i--;
        }
    }

    for (let i = 0; i < 3; i++) {
        let items = randomData.slice(start, end);

        start += 3;
        end += 3;


        newData.push(items)
    }
    */

    return [newData, rows]; // Para v2, v3 y v4
    //return newData; // Para v1
}


export const getCategory = (category) => {
    let filterData = data.filter(item => item.category_name == category);
    let rows = Math.ceil(filterData.length / 3);
    let newData = [];
    let start = 0;
    let end = 3;

    for (let i = 0; i < rows; i++) {
        let items = filterData.slice(start, end);

        start += 3;
        end += 3;


        newData.push(items)
    }

    return [newData, rows];
}
