import "./SearchResultsStyles.css";
import { useLayoutEffect, useState } from "react";
import cache from "../../../Сache/cache";
import { Link, useParams } from "react-router-dom";
import searchIcon from "./../../Images/search.svg";

const SearchResults = () => {
   const [products, setProducts] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);

   const {params} = useParams();
   // console.log('params');
   // console.log(params);
   // if(params) console.log('params: true');
   // else console.log('params: false');

   // if(!isPending && !products) LoadData();

   console.log(cache.ProductsLoaded);

   //Start
   useLayoutEffect(() => {
      LoadData();
   }, []);

   return (
      <div className="searchResultsPage">
         <h1 id="header">Noter Shop</h1>
         <div className="navBar">
            <div className="searchbar">
               <div className="searchImage">
                  <img src={searchIcon} />
               </div>
               <input className="searchInput" type="text"></input>
               <button className="deleteInput">X</button>
               <button className="searchButton">Find</button>
            </div>
         </div>
         <div className="pageContent">
            <div className="filtersTab">
               <ul className="specification">
                  <div className="sectionHeader">Processor Type</div>
                  <li className="option">
                     <a className="optionName">AMD Ryzen 7</a>
                  </li>
                  <li className="option">
                     <a className="optionName">Intel Xeon</a>
                  </li>
                  <li className="option">
                     <a className="optionName">Intel Core i5</a>
                  </li>
               </ul>
               <div className="specification">
                  <div className="sectionHeader">Hard Drive Sizer</div>
                  <li className="option">
                     <a className="optionName">4 TB</a>
                  </li>
                  <li className="option">
                     <a className="optionName">2 TB</a>
                  </li>
               </div>
            </div>

            <div className="searchResults">
               {isPending && <div>Loading...</div>}
               {error && <div className="error">error: {error}</div>}
               {products && <ProductsList products={products} />}
            </div>
         </div>
      </div>
   );

   function LoadData() {
      //checking if data exists in memory
      if (!params && cache.ProductsLoaded && cache.ProductsLoaded.length !== 0) {
         setIsPending(false);
         setError(false);
         setProducts(cache.ProductsLoaded);
      }
      //loading data from server
      else {
         setIsPending(true);
         let loader = cache.LoadingManager.Products;
         if(params) loader.params = params;
         loader.Load(OnDataLoaded);
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

export default SearchResults;

const Product = ({ product }) => {
   const linkToProduct = `/product/${product._id}`;
   return (
      <div className="item">
         <Link to={linkToProduct} className="itemLink">
            <div className="item-image-holder">
               <img
                  src={`http://localhost:3050/api/v1/products/photo/${product.imageCover}`}
                  id="itemImage"
                  width="150px"
                  height="173px"
               ></img>
            </div>
         </Link>
         <div className="item-data-holder">
            <div className="nameContainer">
               <Link to={linkToProduct} className="itemLink">
                  <span className="itemName">{product.name}</span>
               </Link>
            </div>
            <div className="itemPrice">{product.price}$</div>
         </div>
      </div>
   );
};

const ProductsList = ({ products }) => {
   return (
      <div className="search-results">
         <div className="results-content">
            <div className="results-list">
               {products.map((product) => (
                  <Product key={product._id} product={product} />
               ))}
            </div>
         </div>
      </div>
   );
};
