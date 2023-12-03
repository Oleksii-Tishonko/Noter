export const DATABASE = 'http://localhost:3050';
export const WebsiteDomain = "http://localhost:5173";
export let ProductsLoaded = [];

const globals = {
    DATABASE,
    WebsiteDomain,
    get ProductsLoaded(){
        return JSON.parse(JSON.stringify(ProductsLoaded));
    },
    set ProductsLoaded(value){
        ProductsLoaded = JSON.parse(JSON.stringify(value));
    }


}

export default globals;