import React, { useContext, useEffect } from "react";
import "./CartStyles.css";
import cache from "../../../Сache/cache";
import { AuthContext } from "../../Templates/Authentificate/AuthContext";
import globals from "../../../globals";

let uid;

const Cart = () => {
   const [cart, setCart] = React.useState(null);
   const [loading, setLoading] = React.useState(true);
   const { user } = useContext(AuthContext);

   useEffect(() => {
      if (user && user.uid) {
         uid = user.uid;
         LoadData();
      }
   }, [user]);

   return (
      <div className="cartPage">
         <h1>Shopping Cart</h1>
         {!loading && cart.products.length > 0 && (
            <>
               <div className="productList">
                  {/* `${globals.DATABASE}/api/v1/products/photo/${product.imageCover}` */}
                  {cart.products.map((product) => (
                     <Product key={product.product._id} product={product.product} quantity={product.quantity} removeProduct={removeProduct} />
                  ))}
               </div>
               <div className="totalPrice">
                  <p>Total: ${cart.totalPrice}</p>
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
      </div>
   );

   function LoadData() {
      const loader = cache.LoadingManager.Cart;
      loader.uid = uid;
      loader.Load(OnDataLoaded);
   }
   function OnDataLoaded(data, status, error) {
    if(!data) return;
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

   function removeProduct(productId) {
      const RestAPI = cache.RestAPI;
      const data = { productId: productId };
      const url = `${globals.DATABASE}/api/v1/carts/${uid}`;
      RestAPI.DeleteData(url, data, OnProductRemoved);
   }

   function OnProductRemoved(data, status, error) {
      console.log("product removed");
      console.log(data);
   }
};

const Product = ({ product, quantity, removeProduct }) => {
   return (
      <div className="product">
         <div className="productImage">
            <img src={`${globals.DATABASE}/api/v1/products/photo/${product.imageCover}`} alt="product" />
         </div>
         <div className="productInfo">
            <h3 className="productName">{product.name}</h3>
            <div className="productValues">
               <p className="productPrice">Price: ${product.price}</p>
               <p className="productQuantity">Quantity: {quantity}</p>
               <button className="removeProduct" onClick={() => removeProduct(product._id)}>
                  Remove one
               </button>
            </div>
         </div>
      </div>
   );
};

export default Cart;
