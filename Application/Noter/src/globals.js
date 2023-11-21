export const DATABASE = 'http://localhost:3050';
export let ProductsLoaded = [];

const globals = {
    DATABASE,
    get ProductsLoaded(){
        return JSON.parse(JSON.stringify(ProductsLoaded));
    },
    set ProductsLoaded(value){
        ProductsLoaded = JSON.parse(JSON.stringify(value));
    }


}

export default globals;