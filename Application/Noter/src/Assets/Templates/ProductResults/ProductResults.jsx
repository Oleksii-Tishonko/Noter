import ProductsList from "../ProductsList/ProductsList";
import useFetch from "../../Scripts/useFetch";
import './ProductResultsStyles.css';

const SearchProducts = () => {
    const {data: products, isPending, error} = useFetch('http://localhost:3050/api/v1/products', '.data.products');

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