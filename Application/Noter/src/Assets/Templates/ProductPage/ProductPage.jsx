import { useParams } from "react-router-dom";
import globals from "../../../globals";
import { Link } from "react-router-dom";
import { useState, useLayoutEffect } from "react";

const ProductPage = () => {
   const { id } = useParams();

   console.log(cache.ProductsLoaded);
   const [product, setProduct] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);

   //Start
   useLayoutEffect(() => {
      LoadData(id);
   }, []);

   

   
   //loading product from server
   // else {
   //    let data;
   //    ({ data, isPending, error } = useFetch(
   //       `${globals.DATABASE}/api/v1/products/${id}`,
   //       ".data.product",
   //    ));
   //    product = data;
   // }

   if (isPending) {
      return <div>Loading...</div>;
   }
   if (error) {
      return <div className="error">Error: {error}</div>;
   }

   return (
      <div className="ProductPage">
         <div className="navbar">
            <a>
               <div className="selected">About</div>
            </a>
            <Link to={`/product/${product._id}/specifications`}>
               <div>Specifications</div>
            </Link>
            <Link to={`/product/${product._id}/reviews`}>
               <div>Reviews</div>
            </Link>
            <Link to={`/product/${product._id}/questions`}>
               <div>Questions</div>
            </Link>
         </div>
         <div class="backToResults">
            <Link to="/">{"< Back to results"}</Link>
         </div>

         <div className="aboutProduct">
            <div className="aboutProductLeft">
               <ProductPreview product={product} />
            </div>

            <div className="aboutProductRight">
               <ActionPanel product={product} />
            </div>
         </div>
         {/*--AboutProduct End--*/}

         <Summary product={product}/>

         <div className="moduleSeparator"></div>
         <Specifications product={product} />
         <Description product={product} />
         <div className="moduleSeparator"></div>
         <Reviews product={product} />
      </div>
   );

   function LoadData(id) {
      let dataLoaded = false;
      //checking if data exists in memory
      if (cache.ProductsLoaded && cache.ProductsLoaded.length !== 0) {
         console.log('global set');
         //checking if products loaded in memmory contain this product
         const productsFiltered = cache.ProductsLoaded.filter((product) => {
            return product._id === id;
         });

         if (productsFiltered.length > 0) {
            setProduct(productsFiltered[0]);
            setIsPending(false);
            setError(false);

            dataLoaded = true;
            cache.CurrentProduct = productsFiltered[0];
         }
      }
      if(cache.CurrentProduct && cache.CurrentProduct._id === id){
         setProduct(cache.CurrentProduct);
         setIsPending(false);
         setError(false);

         dataLoaded = true;
      }
      //loading data from server
      if (!dataLoaded) {
         console.log("loading from server");
         setIsPending(true);
         const loader = cache.LoadingManager.Product;
         loader.id = id;
         loader.Load(OnDataLoaded);
      }
   }

   function OnDataLoaded(data, status, err) {
      if (status === "OK") {
         setProduct(data);
      }
      setError(err);
      setIsPending(false);

      cache.LoadingManager.Products.Load();
   }
};

export default ProductPage;

//Components

const ProductPreview = ({ product }) => {
   const database = globals.DATABASE;

   const photosLink = `${database}/api/v1/products/photo`;

   return (
      <div className="productPreview">
         <div className="imageBar">
            {product.images.map((imageId) => (
               <img
                  key={imageId}
                  src={`${photosLink}/${imageId}`}
                  width="39px"
                  height="45px"
               />
            ))}
            {/* <img src={img4} width="39px" />
          <img src={img3} width="33.4px" />
          <img src={img4} width="39px" /> */}
         </div>
         <img
            className="productImage"
            src={`${photosLink}/${product.imageCover}`}
            height="300px"
         />
      </div>
   );
};

import starImg from "./../../Images/Yellow_Star.svg";
import cache from "../../../Сache/cache";
const ActionPanel = ({ product }) => {
   return (
      <div className="ActionPanel">
         <h2 className="productName">{product.name}</h2>
         <div className="reviews">
            <div className="rating">
               <img src={starImg} width="17px" />
               <img src={starImg} width="17px" />
               <img src={starImg} width="17px" />
               <img src={starImg} width="17px" />
               <img src={starImg} width="17px" />
            </div>
            <a className="reviewsLink">148 reviews</a>
         </div>
         <div className="productActions">
            <div className="sellerSection">
               <a className="sellerLink">
                  <div className="seller">
                     <a className="sellerText">Seller: </a>
                     <a className="sellerName">Noter</a>
                  </div>
               </a>
            </div>
            <div className="getProductSection">
               <div className="priceBox">
                  <a className="price">{`${product.price} $`}</a>
               </div>
               <button className="addToCart">Add To Cart</button>
               <button className="buyProduct">Buy now</button>
            </div>
         </div>
      </div>
   );
};

const Summary = ({product}) =>{
   return(
      <div className="summary">
         {/* <div className="summaryHeader">Summary</div> */}
         <div className="summaryText">{product.summary}</div>
      </div>
   )
}

const Specifications = ({ product }) => {
   console.log(product.specifications);

   return (
      <div className="specs">
         <p id="header">Specifications</p>
         <table className="listOfSpecs">
            {Object.entries(product.specifications).map(([property, value]) => (
               <tr key={property}>
                  <th>{property}</th>
                  <td>{value}</td>
               </tr>
            ))}

            {/* <tr>
          <th>Model</th>
          <td>Galaxy A32 5G</td>
        </tr> */}
         </table>
         <div className="specsLink">More...</div>
      </div>
   );
};

const Description = ({ product }) => {
   return (
      <div className="description">
         <div className="decriptionHeader">Description</div>
         <div className="descriptionText">{product.description}</div>
      </div>
   );
};

const Reviews = () => {
   return (
      <div className="reviewsSection">
         <div className="reviewsHeader">Customer reviews</div>
         <div className="review">
            <div className="name">Mr. Anderson</div>
            <div className="date">November 13, 2023</div>
            <div className="rating">
               <img src={starImg} width="14.4px" />
               <img src={starImg} width="14.4px" />
               <img src={starImg} width="14.4px" />
               <img src={starImg} width="14.4px" />
               <img src={starImg} width="14.4px" />
            </div>
            <div className="header">Would definitely buy again</div>
            <div className="text">
               For a refurbished item this unit is very good. I bought two for
               my granddaughters. Paid $14.48 each as compared to the price of
               new ones. Children are both 4 years old, so if they break them no
               harm no foul.
            </div>
         </div>

         <div className="review">
            <div className="name">TooYoungTooSimple</div>
            <div className="date">November 15, 2023</div>
            <div className="rating">
               <img src={starImg} width="14.4px" />
               <img src={starImg} width="14.4px" />
               <img src={starImg} width="14.4px" />
               <img src={starImg} width="14.4px" />
               <img src={starImg} width="14.4px" />
            </div>
            <div className="header">Great phone for the price</div>
            <div className="text">
               Not much bigger than my last phone, but way faster! Good price as
               I got it on sale. Has great features I'm still learning. Some
               really nice accessories too. Overall very pleased with his
               purchase Thx Noter!
            </div>
         </div>
      </div>
   );
};
