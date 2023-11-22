import ProductsList from "../ProductsList/ProductsList";
import "./ProductResultsStyles.css";
import globals from "./../../../globals";
import { useEffect, useLayoutEffect, useState } from "react";
import cache from "../../../Сache/cache";

const SearchProducts = () => {
   const [products, setProducts] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);

   // if(!isPending && !products) LoadData();

   console.log(cache.ProductsLoaded);

   //Start
   useLayoutEffect(() => {
      LoadData();
   }, []);

   return (
      <div>
         <h1 id="header">Noter Shop</h1>
         {isPending && <div>Loading...</div>}
         {error && <div className="error">error: {error}</div>}
         {products && <ProductsList products={products} />}
      </div>
   );

   function LoadData() {
      //checking if data exists in memory
      if (cache.ProductsLoaded && cache.ProductsLoaded.length !== 0) {
         setIsPending(false);
         setError(false);
         setProducts(cache.ProductsLoaded);
      }
      //loading data from server
      else {
         setIsPending(true);
         cache.LoadingManager.Products.Load(OnDataLoaded);
      }
   }

   function OnDataLoaded(data, status, err) {
      if (status === "OK") {
         setProducts(data);
      }
      setError(err);
      setIsPending(false);
   }
};

export default SearchProducts;
