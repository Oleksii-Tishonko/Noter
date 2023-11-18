import './ProductStyle.css'
const Product = ({product}) => {
    
    return ( 
        <div className="item">
            <a href="https://stackoverflow.com/" className="itemLink">
                <div className="item-image-holder">
                    <img src = {`http://localhost:3050/api/v1/products/photo/${product.imageCover}`} id="itemImage" width="150px" height="173px"></img>
                </div>
            </a>
            <div className="item-data-holder">
                <div className="nameContainer">
                    <a href="https://stackoverflow.com/" className="itemLink">
                        <span className= "itemName">{product.name}</span>
                    </a>
                </div>
                <div className="itemPrice">{product.price}$</div>
            </div>
        </div>
    );
}
 
export default Product;