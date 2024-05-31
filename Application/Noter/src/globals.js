export const DATABASE = 'http://localhost:3050';
export const WebsiteDomain = "http://localhost:5173";
export let ProductsLoaded = [];
export const Category = "6657bea5ebeba3e2a75a680c"

const globals = {
    DATABASE,
    WebsiteDomain,
    Category,
    get ProductsLoaded(){
        return JSON.parse(JSON.stringify(ProductsLoaded));
    },
    set ProductsLoaded(value){
        ProductsLoaded = JSON.parse(JSON.stringify(value));
    }


}

export default globals;