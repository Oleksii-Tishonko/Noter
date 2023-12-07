import useFetch from "../Assets/Scripts/useFetch";
import globals from "../globals";
import { useEffect } from "react";

let ProductsLoaded = null;
let CurrentProduct = null;
let CategoryLoaded = null;
let ReviewsLoaded = null;

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
};

function getCopyOfObject(obj) {
   return JSON.parse(JSON.stringify(obj));
}

export default cache;

class LoadingManager {
   Product = new Product();
   Products = new Products();
   Category = new Category();
   Reviews = new Reviews();

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
      if (!this.extractDataPath)
         throw Error("An object must have a path for data extraction");
      if (!this.requestPath)
         throw Error("An object must have a request string");

      let request = this.requestPath;
      if(this.params) request = `${request}?${this.params}`
      console.log('request');
      console.log(request);
      console.log('params');
      console.log(this.params);

      const restAPI = new RestAPI();
      restAPI.ReadData(
         request,
         this.extractDataPath,
         (data, status, err) => this.OnDataLoaded(data, status, err),
      );
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
   extractDataPath = ".data.products";

   /**
    * @returns {string}  request string to load obj.
    */
   get requestPath() {
      return `${globals.DATABASE}/api/v1/products`;
   }
   getRequestPath() {
      return this.requestPath;
   }

   setLoadedObject(data) {
      if (data) cache.ProductsLoaded = data;
      console.log("setter");
      console.log(data);
   }

   constructor() {
      super();
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
   extractDataPath = ".data.reviews";
   productId;

   get requestPath() {
      if (!this.productId) throw Error("Reviews must have an id to be loaded");
      return `${globals.DATABASE}/api/v1/products/${this.productId}/reviews`;
   }
   constructor() {
      super();
   }
   setLoadedObject(data) {
      if (data) cache.ReviewsLoaded = data;
      console.log("setter");
      console.log(data);
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
