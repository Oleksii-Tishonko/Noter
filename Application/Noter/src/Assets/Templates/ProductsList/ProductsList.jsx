import { useState } from "react";
import Product from "../Products/Product";
import useFetch from "../../Scripts/useFetch";
import './ProductListStyles.css';

const ProductsList = ({products}) => {
    return (
        <div className ="search-results">
            <div className ="results-content">
                <div className ="results-list">{products.map((product) => (<Product key={product._id} product = {product}/>))}</div>
            </div>
        </div>
    );
}
 
export default ProductsList;