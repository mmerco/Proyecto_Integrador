const data = [1, 2]

// Devuelve todos los items ordenados por codigo de producto A-Z
export const getItems = () => {
    const sortData = data.sort((a, b) => {
        if (a.product_sku > b.product_sku) {
            return 1;
        }
        if (a.product_sku < b.product_sku) {
            return -1;
        }

        return 0;
    });

    return sortData;
}


export const searchItems = (searchValue) => {
    let filterData = data.filter(item => {
        let code = item.product_sku.toLocaleLowerCase();
        let name = item.product_name.toLocaleLowerCase();
        let category = item.licence_name.toLocaleLowerCase();

        searchValue = searchValue.toLocaleLowerCase();

        if (code.includes(searchValue) || name.includes(searchValue) || category.includes(searchValue)) {
            return true;
        }

        return false;
    });

    return filterData;
}
