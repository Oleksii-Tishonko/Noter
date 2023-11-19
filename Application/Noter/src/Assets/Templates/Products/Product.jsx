import { Link } from "react-router-dom";
import './ProductStyle.css';

const Product = ({product}) => {
    const linkToProduct = `/products/${product._id}`;
    return ( 
        <div className="item">
            <Link to={linkToProduct} className="itemLink">
                <div className="item-image-holder">
                    <img src = {`http://localhost:3050/api/v1/products/photo/${product.imageCover}`} id="itemImage" width="150px" height="173px"></img>
                </div>
            </Link>
            <div className="item-data-holder">
                <div className="nameContainer">
                    <Link to={linkToProduct} className="itemLink">
                        <span className= "itemName">{product.name}</span>
                    </Link>
                </div>
                <div className="itemPrice">{product.price}$</div>
            </div>
        </div>
    );
}
 
export default Product;