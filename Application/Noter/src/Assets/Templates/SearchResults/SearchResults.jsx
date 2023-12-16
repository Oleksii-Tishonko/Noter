import "./SearchResultsStyles.css";
import { useEffect, useLayoutEffect, useState } from "react";
import cache from "../../../Сache/cache";
import { Link, useParams } from "react-router-dom";
import searchIcon from "./../../Images/search.svg";
import { useNavigate } from "react-router-dom";
import globals from "../../../globals";
import Filter from "../../Scripts/filter";
import { set } from "lodash";

let pageParams = null;
let categoryId = null;
let pageNavigation;

const SearchResults = () => {
   const [products, setProducts] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);
   const navigation = useNavigate();
   pageNavigation = navigation;

   let { params } = useParams();
   if(params) params = params.replace(/%20/g, " ");
   console.log(params);
   pageParams = params;

   // console.log('params');
   // console.log(params);

   // console.log(cache.ProductsLoaded);

   //Start
   useLayoutEffect(() => {
      console.log("useLayoutEffect");
      LoadData();
   }, [pageParams]);

   return (
      <div className="searchResultsPage">
         <h1 id="header">Noter Shop</h1>
         <NavBar />
         
         <div className="pageContent">
            <FiltersTab />

            <div className="searchResults">
               {isPending && <div>Loading...</div>}
               {error && <div className="error">error: {error}</div>}
               {!isPending && products && <ProductsList products={products} />}
            </div>
         </div>
      </div>
   );

   function LoadData() {
      //checking if data exists in memory
      if (checkCurrentFilters() && cache.ProductsLoaded && cache.ProductsLoaded.length !== 0) {
         console.log("data exists");
         setIsPending(false);
         setError(false);
         setProducts(cache.ProductsLoaded);
      }
      //loading data from server
      else {
         console.log("data not exists");
         setIsPending(true);
         let loader = cache.LoadingManager.Products;
         if (params) loader.params = params;
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

function addFilter(specification, optionValue) {
   console.log(pageParams);
   console.warn(specification);
   console.warn(optionValue);
   let newParams = "";

   if (pageParams){
      
      newParams += pageParams + "&";
   }

   const filter = new Filter(specification, optionValue);
   console.log(filter);

   if(filter.containsFilter(filter, newParams)) return;
   newParams = filter.addFilter(filter, newParams);

   // newParams += `specifications.${specification}=${optionValue}`;
   console.log(newParams);
   cache.ProductsLoaded = [];
   pageNavigation(`/${newParams}`);
}

function removeFilter(specification, optionValue) {
   console.log(pageParams);
   console.warn(specification);
   console.warn(optionValue);
   
   const filter = new Filter(specification, optionValue);

   if(!filter.containsFilter(filter, pageParams)) return;
   const newParams = filter.removeFilter(filter, pageParams);
   cache.ProductsLoaded = [];
   pageNavigation(`/${newParams}`);
}

function TestFilter() {
   let filter = new Filter("specName2", "SpecOption2");
   let str = "some_other_text specification.specName1=SpecOption1&specification.specName2=SpecOption2&specification.specName3=SpecOption3 some_other_text";
   let res = "some_other_text specification.specName1=SpecOption1&specification.specName3=SpecOption3 some_other_text";
   Test(str, res, filter, 1);

   filter = new Filter("specName1", "SpecOption1");
   str = "some_other_text specification.specName1=SpecOption1&specification.specName2=SpecOption2&specification.specName3=SpecOption3 some_other_text";
   res = "some_other_text specification.specName2=SpecOption2&specification.specName3=SpecOption3 some_other_text";
   Test(str, res, filter, 2);

   filter = new Filter("specName3", "SpecOption3");
   str = "some_other_text specification.specName1=SpecOption1&specification.specName2=SpecOption2&specification.specName3=SpecOption3&some_other_text";
   res = "some_other_text specification.specName1=SpecOption1&specification.specName2=SpecOption2&some_other_text";
   Test(str, res, filter, 3);

   filter = new Filter("specName1", "SpecOption1");
   str = "some_other_text specification.specName1=SpecOption1";
   res = "some_other_text ";
   Test(str, res, filter, 4);

   filter = new Filter("specName1", "SpecOption1");
   str = "some_other_text&specification.specName1=SpecOption1&some_other_text";
   res = "some_other_text&some_other_text";
   Test(str, res, filter, 5);
}
function Test(str, res, filter, n) {
   const result = filter.removeFilter(filter, str);

   if (result === res) console.log("match" + n);
   else {
      console.log("no match" + n);
      console.log("result: " + result);
   }
}

function checkCurrentFilters(){
   const filters = Filter.extractFilters(pageParams);
   
   if(!cache.ProductsLoaded || cache.ProductsLoaded.length === 0) return false;
   const products = cache.ProductsLoaded;

   filters.forEach((filter) => {
      for (let i = 0; i < products.length; i++) {
         const product = products[i];
         const specs = product.specifications;
         const spec = specs[filter.name];
         if (spec !== filter.value) {
            return false;
         }
      }
   });
   
   return true;
}

export default SearchResults;

const Product = ({ product }) => {
   

   const linkToProduct = `/product/${product._id}`;
   return (
      <div className="item">
         <Link to={linkToProduct} className="itemLink">
            <div className="item-image-holder">
               <img src={`http://localhost:3050/api/v1/products/photo/${product.imageCover}`} id="itemImage" width="150px" height="173px"></img>
            </div>
         </Link>
         <div className="item-data-holder">
            <div className="nameContainer">
               <Link to={linkToProduct} className="itemLink">
                  <span className="itemName">{trimProductName(product.name)}</span>
               </Link>
            </div>
            <div className="itemPrice">{product.price}$</div>
         </div>
      </div>
   );

   function trimProductName(productName) {
      let name = productName;
      if (name.length > 40) {
         name = name.slice(0, 37);
         name = name.trim();
         name += "...";
      }
      
      return name;
   }
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

const FiltersTab = () => {
   const [category, setCategory] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);
   const [filters, setFilters] = useState(null);

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

   //if filters updated
   useLayoutEffect(() => {
      //setting filters
      if (pageParams) {
         const filters = Filter.extractFilters(pageParams);
         if (filters) setFilters(filters);
         else setFilters([]);
      }
      else setFilters([]);
   }, [pageParams])

   return (
      <>
         {isPending && <div>Loading...</div>}
         {error && <div className="error">error: {error}</div>}
         {category && (
            <div className="filtersTab">
               {category &&
                  category.filters.map((filter) => (
                     // console.log(filter);
                     <ul className="specification" key={filter.name}>
                        <div className="sectionHeader">{filter.name}</div>
                        {filter.variants.map((variant) => (
                           <li key={variant} className="option">
                              {isFilterSelected(filter.name, variant) && (
                                 <a className="optionName" id="selected" onClick={() => removeFilter(filter.name, variant)}>
                                    {variant}
                                 </a>
                              )}

                              {!isFilterSelected(filter.name, variant) && (
                                 <a className="optionName" id="notSelected" onClick={() => addFilter(filter.name, variant)}>
                                    {variant}
                                 </a>
                              )}
                           </li>
                        ))}
                     </ul>
                  ))}

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
         )}
      </>
   );

   function LoadData() {
      //checking if data exists in memory
      if (cache.CategoryLoaded) {
         setIsPending(false);
         setError(false);
         setCategory(cache.CategoryLoaded);
      }
      //loading data from server
      else {
         setIsPending(true);
         let loader = cache.LoadingManager.Category;
         loader.id = "657e0d29c1cb6b530d5a1203";
         loader.Load(OnDataLoaded);
      }
   }

   function OnDataLoaded(data, status, err) {
      if (status === "OK") {
         setCategory(data);
      }
      setError(err);
      setIsPending(false);
   }

   function isFilterSelected(name, option) {
      if(!filters) return false;
      for (let i = 0; i < filters.length; i++) {
         const filter = filters[i];
         if (filter.specName === name && filter.specOption === option) return true;
      }
      return false;

   }
};

const NavBar = () => {
   const [userName, setUserName] = useState(null);
   const [accountLink, setAccountLink] = useState("");

   useLayoutEffect(() => {
      setUserName(cache.UserName);

   }, []);

   useEffect(() => {
      const username = cache.UserName;

      if(!userName) {setUserName(cache.UserName);} //setter not working instantly

      if (!username || username === "null") setUserName("Login");

      if (username && username !== "null") setAccountLink("/userAccount");
      else setAccountLink("/authentificate");
   }, [userName]);

   return (
      <div className="navBar">
         <div className="dummyDiv"></div>
         <div className="searchbar">
            <div className="searchImage">
               <img src={searchIcon} />
            </div>
            <input className="searchInput" type="text"></input>
            <button className="deleteInput">X</button>
            <button className="searchButton">Find</button>
         </div>
         <Link to={accountLink} className="userAccount">{userName}</Link>
      </div>
   );
}
