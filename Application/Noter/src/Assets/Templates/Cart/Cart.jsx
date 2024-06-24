import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./CartStyles.css";
import cache from "../../../Сache/cache";
import {AuthContext} from "../../Templates/Authentificate/AuthContext";
import globals from "../../../globals";
import DropDown from "../../Scripts/Components/Dropdown/dropdown";

let uid;

const Cart = () => {
    const [cart, setCart] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (user && user.uid) {
            uid = user.uid;
            LoadData();
        }
    }, [user]);

    return (
        <div className="cartPage">
            <Link to="/" className="HomeLink">
                Noter
            </Link>
            <h1>Shopping Cart</h1>
            {!loading && cart.products.length > 0 && (
                <>
                    <div className="productList">
                        {/* `${globals.DATABASE}/api/v1/products/photo/${product.imageCover}` */}
                        {cart.products.map((product) => (
                            <Product key={product.product._id} setProductQuantity={setProductQuantity} product={product.product} productQuantity={product.quantity} deleteProduct={deleteProduct} removeOneProduct={removeOneProduct} />
                        ))}
                    </div>
                    <div className="ActionPanel">
                        <div className="totalPrice">
                            <p>Total: ${cart.totalPrice}</p>
                        </div>
                        <button className="checkoutButton">Checkout</button>
                    </div>
                </>
            )}
            {!loading && cart.products.length === 0 && (
                <>
                    <div className="emptyCart">The cart is empty.</div>
                    <div className="message">Browse the website and add products to your cart.</div>
                </>
            )}
            {loading && <div className="loading">Loading...</div>}
            {/*<DropDown options={[1, 2, 3, 4]} label="Qty: " />*/}
        </div>
    );

    function LoadData() {
        const loader = cache.LoadingManager.Cart;
        loader.uid = uid;
        loader.Load(OnDataLoaded);
    }
    function OnDataLoaded(data, status, error) {
        if (!data) return;
        console.log(data);
        setLoading(false);
        setCart(data);

        if (status === "OK") {
            let allProducts = {};
            if (data.products.length > 0) {
                data.products.forEach((product) => {
                    allProducts[product.product._id] = product.quantity;
                });
            }
            console.log(JSON.stringify(allProducts));
            cache.Cart.setCart(allProducts);
        }
    }

    function deleteProduct(productId) {
        setProductQuantity(productId, 0);
    }

    function removeOneProduct(productId) {
        let quantity = cache.Cart.getProductQuantity(productId);
        setProductQuantity(productId, quantity - 1);
    }
    function setProductQuantity(productId, quantity) {
        const RestAPI = cache.RestAPI;
        const data = {productId: productId, quantity: quantity};
        const url = `${globals.DATABASE}/api/v1/carts/${uid}`;
        RestAPI.UpdateData(url, data, OnProductQuantityUpdated);
    }

    function OnProductQuantityUpdated(data, status, error) {
        console.log("product quantity changed");
        console.log(data);
    }
};

const Product = ({product, productQuantity, removeOneProduct, deleteProduct, setProductQuantity}) => {
    const [quantity, setQuantity] = useState(productQuantity);

    useEffect(() => {
        console.log(`Product ${product._id} quantity changed to ${quantity}`);
        if (quantity == "0 (Delete)") setProductQuantity(product._id, 0);
        else setProductQuantity(product._id, quantity);

        //cache.Cart.setProductQuantity(product._id, quantity);
    }, [quantity]);

    return (
        <div className="product">
            <div className="productImage">
                <img src={`${globals.DATABASE}/api/v1/products/photo/${product.imageCover}`} alt="product" />
            </div>
            <div className="productInfo">
                <button className="deleteProduct" onClick={() => deleteProduct(product._id)}>
                    X
                </button>
                <h3 className="productName">{product.name}</h3>
                <div className="productValues">
                    <p className="productPrice">Price: ${product.price}</p>
                    <DropDown value={quantity} setValue={setQuantity} options={["0 (Delete)", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} label={"Qty: "} />

                    {/*<button className="removeProduct" onClick={() => removeOneProduct(product._id)}>*/}
                    {/*   Remove one*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
};

export default Cart;
