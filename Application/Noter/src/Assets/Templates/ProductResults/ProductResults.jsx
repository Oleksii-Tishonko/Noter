import ProductsList from "../ProductsList/ProductsList";
import useFetch from "../../Scripts/useFetch";
import './ProductResultsStyles.css';
import globals from './../../../globals'
import { useEffect } from "react";

const SearchProducts = () => {
    let { data, isPending, error } = {};
    let products = [];

    if(!globals.ProductsLoaded || globals.ProductsLoaded.length === 0){
        ({ data, isPending, error } = useFetch(`${globals.DATABASE}/api/v1/products`, '.data.products'));
        products = data;
    }
    else{
        console.log(globals.ProductsLoaded);
        console.log(globals.ProductsLoaded.length);
        products = globals.ProductsLoaded;
        isPending = false;
        error = false;
    }
    
    useEffect(() => {
        console.log('use Effect');
        console.log(products);
        globals.ProductsLoaded = products;
        
    }, [products])

    return (  
        <div>
            <h1 id = "header">Noter Shop</h1>
            {isPending && <div>Loading...</div>}
            {error && <div className="error">error: {error}</div>}
            {products && <ProductsList products={products}/>}
        </div>
    );
}
 
export default SearchProducts;