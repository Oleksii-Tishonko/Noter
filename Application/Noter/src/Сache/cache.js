import useFetch from "../Assets/Scripts/useFetch";
import globals from "../globals";
import { useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";

class ReviewsObject {
   productId;
   count;
   pages;
   constructor() {
      this.pages = [];
   }

   setCount(results) {
      const limit = 2;
      this.count = Math.floor((results + limit - 1) / limit);
   }
   isPageLoaded(page) {
      return this.pages[page] ? true : false;
   }
   isPageExist(page) {
      return page <= this.count;
   }
   updateProduct(productId) {
      if (this.productId === productId) return;
      this.count = 0;
      this.pages = [];
      this.productId = productId;
   }
}
class ProductsObject {
   filters;
   count;
   pages;
   constructor() {
      this.pages = [];
   }

   setCount(results) {
      const limit = 16;
      this.count = Math.floor((results + limit - 1) / limit);
   }
   isPageLoaded(page) {
      return this.pages[page] ? true : false;
   }

   isPageExist(page) {
      return page <= this.count;
   }

   updateFilters(filters) {
      if (this.compareFilters(this.filters, filters)) return;
      this.count = 0;
      this.pages = [];
      this.filters = filters;
   }

   compareFilters(filters1, filters2) {
      if (!filters1 || filters1 == "null" || filters1 == "undefined") filters1 = {};
      if (!filters2 || filters2 == "null" || filters2 == "undefined") filters2 = {};

      if (typeof filters1 == "string") filters1 = JSON.parse(filters1);
      if (typeof filters2 == "string") filters2 = JSON.parse(filters2);
      console.log(`filter1: ${JSON.stringify(filters1)}`);
      console.log(`filter2: ${JSON.stringify(filters2)}`);
      console.log(`same: ${JSON.stringify(filters1) === JSON.stringify(filters2)}`);

      return JSON.stringify(filters1) === JSON.stringify(filters2);
   }
}

let ProductsLoaded = new ProductsObject();
let CurrentProduct = null;
let CategoryLoaded = null;
let ReviewsLoaded = new ReviewsObject();
let UserAccountLoaded = null;
let UserName = null;
let filters = null;
let productsPage = null;
let pageInvokedSignIn = null;
let userUID = null;

const cache = {
   get ProductsLoaded() {
      // console.log("get products loaded:");
      // console.log(ProductsLoaded);
      return getCopyOfObject(ProductsLoaded);
   },
   set ProductsLoaded(value) {
      // console.log('set products loaded:');
      // console.log(value);
      ProductsLoaded = getCopyOfObject(value);
   },

   get CurrentProduct() {
      return getCopyOfObject(CurrentProduct);
   },
   set CurrentProduct(value) {
      CurrentProduct = getCopyOfObject(value);
   },
   get CategoryLoaded() {
      return getCopyOfObject(CategoryLoaded);
   },
   set CategoryLoaded(value) {
      CategoryLoaded = getCopyOfObject(value);
   },
   get LoadingManager() {
      return new LoadingManager();
   },
   get ReviewsLoaded() {
      return getCopyOfObject(ReviewsLoaded);
   },
   set ReviewsLoaded(value) {
      ReviewsLoaded = getCopyOfObject(value);
   },
   get RestAPI() {
      return new RestAPI();
   },
   get UserName() {
      if (!UserName || UserName === "null" || UserName === "undefined") {
         const username = localStorage.getItem("UserName");
         UserName = username ? username : null;
      }
      return UserName;
   },
   set UserName(value) {
      console.warn("username changed: " + value);
      localStorage.setItem("UserName", value);
      UserName = value;
   },
   get UserAccountLoaded() {
      return getCopyOfObject(UserAccountLoaded);
   },
   set UserAccountLoaded(value) {
      UserAccountLoaded = getCopyOfObject(value);
   },
   get Filters() {
      filters = sessionStorage.getItem("filters");
      return filters;
   },
   set Filters(value) {
      sessionStorage.setItem("filters", JSON.stringify(value));
      filters = value;
   },
   get PageInvokedSignIn() {
      pageInvokedSignIn = sessionStorage.getItem("pageInvokedSignIn");
      return pageInvokedSignIn;
   },
   set PageInvokedSignIn(value) {
      sessionStorage.setItem("pageInvokedSignIn", value);
      pageInvokedSignIn = value;
   },
   get UserUID() {
      if (!userUID || userUID === "null" || userUID === "undefined") {
         const _userUID = sessionStorage.getItem("userUID");
         userUID = _userUID ? _userUID : null;
      }
      return userUID;
   },
   set UserUID(value) {
      if (!userUID || userUID !== value) {
         sessionStorage.setItem("userUID", value);
         userUID = value;
      }
   },
   get ProductsPage() {
      if (!productsPage || productsPage === "null" || productsPage === "undefined") {
         productsPage = sessionStorage.getItem("productsPage");
      }

      return productsPage;
   },
   set ProductsPage(value) {
      sessionStorage.setItem("productsPage", value);
      productsPage = value;
   },
};

function getCopyOfObject(obj) {
   return cloneDeep(obj);
}

export default cache;

class LoadingManager {
   Product = new Product();
   Products = new Products();
   Category = new Category();
   Reviews = new Reviews();
   UserAccount = new UserAccount();

   constructor() {
      console.log("creating loading manager");
   }
}

class LoadableObject {
   // extractDataPath; --throw err if null
   // get requestPath(){}; --throw err if no function
   // isPending;
   //data;
   // error;
   callback;
   params;

   // set _isPending(value){
   //     this.isPending = value;
   //     console.log('is pending: ' + value);
   //     this.setLoadedObject();
   // }
   constructor() {}

   Load(callback, params) {
      this.callback = callback;

      console.log("Loading");
      if (!this.extractDataPath) throw Error("An object must have a path for data extraction");
      if (!this.requestPath) throw Error("An object must have a request string");

      let request = this.requestPath;
      if (this.params) request = `${request}?${this.params}`;
      console.log("request");
      console.log(request);
      console.log("params");
      console.log(this.params);

      const restAPI = new RestAPI();
      restAPI.ReadData(request, this.extractDataPath, (data, status, err) => this.OnDataLoaded(data, status, err));
      this.isPending = true;
      //do something useFetch() //path + params => {data, isPending, error}
   }

   OnDataLoaded(data, status, err) {
      console.log("callback");
      const restAPI = new RestAPI();
      if (status === restAPI.StatusCode.ERROR) {
         if (this.callback) this.callback(null, status, err);
      }

      if (status === restAPI.StatusCode.CANCELLED) {
         if (this.callback) this.callback(null, status, "cancelled");
      }

      if (status === restAPI.StatusCode.OK) {
         //this.data = data;
         // this.isPending = false;
         // this.error = null;
         this.setLoadedObject(data);

         if (this.callback) this.callback(data, status, err);
      }
   }
}

class Products extends LoadableObject {
   extractDataPath = ".";
   _filters;
   get filters() {
      return this._filters;
   }
   set filters(value) {
      this._filters = value;

      // update filters in cache
      const products = cache.ProductsLoaded;
      products.updateFilters(value);
      console.log(cache.ProductsLoaded);
      cache.ProductsLoaded = products;
      console.log(cache.ProductsLoaded);
   }
   page;

   /**
    * @returns {string}  request string to load obj.
    */
   get requestPath() {
      let params;
      if (this.filters) {
         params = this.filtersToQuery(this.filters);
      }

      return `${globals.DATABASE}/api/v1/products?${params ? params : ""}&${this.page ? `page=${this.page}` : ""}`;
   }
   getRequestPath() {
      return this.requestPath;
   }

   setLoadedObject(data) {
      console.log("setter");
      console.log(data);
      const page = data.page;
      const results = data.results;
      const products = data.data.products;

      let ProductsLoaded = cache.ProductsLoaded;

      // if (this.filters !== data.filters) return;

      ProductsLoaded.setCount(results);
      ProductsLoaded.pages[page] = products;

      cache.ProductsLoaded = ProductsLoaded;
   }

   constructor() {
      super();
   }

   filtersToQuery(filters) {
      if (!filters) return "";
      if (typeof filters === "string") filters = JSON.parse(filters);
      if (!filters) return "";

      const keys = Object.keys(filters);
      let query = "";
      for (let i = 0; i < keys.length; i++) {
         const key = keys[i];
         const value = filters[key];
         query += `&specifications.${key}=${value}`;
      }
      query = query.slice(1);

      return query;
   }
}

class Product extends LoadableObject {
   extractDataPath = ".data.product";
   id;

   /**
    * @returns {string}  request string to load obj.
    */
   get requestPath() {
      if (!this.id) throw Error("Product must have an id to be loaded");
      return `${globals.DATABASE}/api/v1/products/${this.id}`;
   }
   constructor() {
      super();
   }
   setLoadedObject(data) {
      if (data) cache.CurrentProduct = data;
      console.log("setter");
      console.log(data);
   }
}
class Category extends LoadableObject {
   extractDataPath = ".data.category";
   id;

   get requestPath() {
      if (!this.id) throw Error("Category must have an id to be loaded");
      return `${globals.DATABASE}/api/v1/category/${this.id}`;
   }
   constructor() {
      super();
   }
   setLoadedObject(data) {
      if (data) cache.CategoryLoaded = data;
      console.log("setter");
      console.log(data);
   }
}
class Reviews extends LoadableObject {
   extractDataPath = ".";
   _productId;
   get productId() {
      return this._productId;
   }
   set productId(value) {
      this._productId = value;

      // update product id in cache
      const reviews = cache.ReviewsLoaded;
      reviews.updateProduct(value);
      cache.ReviewsLoaded = reviews;
   }
   page;

   get requestPath() {
      if (!this.productId) throw Error("Reviews must have a product id to be loaded");
      // if(!this.page) throw Error("Reviews must have a page parameter to be loaded");
      if (!this.page) this.page = 1;
      return `${globals.DATABASE}/api/v1/products/${this.productId}/reviews?page=${this.page}`;
   }
   constructor() {
      super();
   }
   setLoadedObject(data) {
      console.log(data);
      const page = data.page;
      const results = data.results;
      const reviews = data.data.reviews;

      let ReviewsLoaded = cache.ReviewsLoaded;

      if (this.productId !== data.productId) return;

      ReviewsLoaded.setCount(results);
      ReviewsLoaded.pages[page] = reviews;
      cache.ReviewsLoaded = ReviewsLoaded;
   }
}
class UserAccount extends LoadableObject {
   uid;
   extractDataPath = ".data.user";
   get requestPath() {
      if (!this.uid) throw Error("UserAccount must have a uid to be loaded");
      return `${globals.DATABASE}/api/v1/users?uid=${this.uid}`;
   }
   constructor() {
      super();
   }
   setLoadedObject(data) {
      cache.UserAccount = data;
   }
}

// call const LM = LoadingManager()
// const lloadingInstance = LM.Products.Load()
//
//LM.Products.Load(params)
// --params: (params for server) ---probably add params manager
//
//LM.Product.Load(params) --params = id
//product.id = '13'
//
// if(loadingInstance.status === Loading) ...
// ---Loading or Canceled (error) or Finished
// if(loadingInstance.status === Finished) {
//  const data =  loadingInstance.data
// }

// if(loadingInstance .status === Canceled){
//  console.log(loadingInstance.error)
// }

class RestAPI {
   constructor() {}

   StatusCode = {
      OK: "OK",
      ERROR: "ERROR",
      CANCELLED: "CANCELLED",
   };

   async ReadData(url, pathToData, callback) {
      setTimeout(() => {
         console.log("inside");
         fetch(url)
            .then((res) => {
               if (!res.ok) {
                  throw Error("could not fetch the data for this resource");
               }
               return res.json();
            })
            .then((data) => {
               if (data && pathToData) {
                  data = this.extractData(data, pathToData);
               }

               callback(data, this.StatusCode.OK, null);
            })
            .catch((err) => {
               if (err.name === "AbortError") {
                  console.log("fetch aborted");
                  callback(null, this.StatusCode.CANCELLED, "fetch aborted");
               } else {
                  callback(null, this.StatusCode.ERROR, err.message);
               }
            });
      }, 1000);
      console.log("outside");
   }
   async WriteData(url, data, callback) {
      console.log(url);
      console.log(JSON.stringify(data));
      setTimeout(() => {
         fetch(url, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         })
            .then((res) => {
               // if (!res.ok) {
               //    throw Error("could not fetch the data for this resource");
               // }
               return res.json();
            })
            .then((data) => {
               callback(data, this.StatusCode.OK, null);
            })
            .catch((err) => {
               if (err.name === "AbortError") {
                  console.log("fetch aborted");
                  callback(null, this.StatusCode.CANCELLED, "fetch aborted");
               } else {
                  callback(null, this.StatusCode.ERROR, err.message);
               }
            });
      }, 1000);
   }

   extractData(data, path) {
      const properties = path.split(".");

      let res = data;
      for (let i = 0; i < properties.length; i++) {
         if (properties[i]) res = res && res[properties[i]];
      }

      console.log(res);

      return res;
   }
}
