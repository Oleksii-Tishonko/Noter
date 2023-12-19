import { useLocation, useNavigate, useParams } from "react-router-dom";
import globals from "../../../globals";
import { Link } from "react-router-dom";
import { useState, useLayoutEffect, useEffect } from "react";

const ProductPage = () => {
   const { id } = useParams();

   console.log(cache.ProductsLoaded);
   const [product, setProduct] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   //Start
   useLayoutEffect(() => {
      window.scrollTo(0, 0);
      LoadData(id);
   }, []);

   function handleBackToResults(){
      if(!product) return;
      const filters = cache.Filters;
      const category = product.category;
      const page = cache.ProductsPage;

      const productParams = new URLSearchParams();

      productParams.set("category", category);
      productParams.set("filters", filters);
      if(page) productParams.set("page", page);

      navigate(`/products?${productParams.toString()}`);
   }
   

   
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
            <div onClick={() => handleBackToResults()}>{"< Back to results"}</div>
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
      if (cache.ProductsLoaded && cache.ProductsLoaded.pages.length > 0) {
         console.log('global set');
         //checking if products loaded in memmory contain this product
         for(let i = 1; i < cache.ProductsLoaded.pages.length; i++){
            if(!cache.ProductsLoaded.pages[i]) continue;
            console.log(cache.ProductsLoaded.pages[i]);
            for(let j = 0; j < cache.ProductsLoaded.pages[i].length; j++){
               if(cache.ProductsLoaded.pages[i][j]._id === id){
                  console.log('product found');
                  console.log(cache.ProductsLoaded.pages[i][j]);
                  cache.CurrentProduct = cache.ProductsLoaded.pages[i][j];
                  dataLoaded = true;

                  setProduct(cache.CurrentProduct);
                  setIsPending(false);
                  setError(false);
                  break;
               }
            }
            if(dataLoaded) break;
         }
      }
      if(!dataLoaded && cache.CurrentProduct && cache.CurrentProduct._id === id){
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

      if (dataLoaded) LoadReviews();
   }
   function LoadReviews(){
      const reviewsLoader = cache.LoadingManager.Reviews;
      reviewsLoader.productId = id;
      reviewsLoader.Load();
   }

   function OnDataLoaded(data, status, err) {
      if (status === "OK") {
         setProduct(data);
      }
      setError(err);
      setIsPending(false);

      // Loading products
      const loader = cache.LoadingManager.Products;
      loader.filters = cache.Filters;
      if(cache.ProductsPage) loader.page = cache.ProductsPage;
      loader.Load();
      
      LoadReviews();
   }
};

export default ProductPage;

//Components

const ProductPreview = ({ product }) => {
   const [mainImage, setMainImage] = useState(product.imageCover);
   const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
   });

   const handleImageClick = (imageId) => {
      setMainImage(imageId);
   };

   useEffect(() => {
      resizeMainImage();
   }, [mainImage, windowSize]);

   useEffect(() => {
      const handleResize = () => {
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      };

      window.addEventListener("resize", handleResize);

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const database = globals.DATABASE;

   const photosLink = `${database}/api/v1/products/photo`;

   return (
      <div className="productPreview">
         <div className="imageBar">
            {product.images.map((imageId) => (
               <div className="imageContainer" id={imageId === mainImage ? 'selected' : ''} onMouseOver={() => handleImageClick(imageId)}>
                  <img key={imageId} src={`${photosLink}/${imageId}`} width="39px" height="45px"/>
               </div>
            ))}
            {/* <img src={img4} width="39px" />
          <img src={img3} width="33.4px" />
          <img src={img4} width="39px" /> */}
         </div>
         <div className="productImageContainer">
            <img className="productImage" src={`${photosLink}/${mainImage}`} onLoad={() => resizeMainImage()} />
         </div>
      </div>
   );

   function resizeMainImage(){
      const image = document.querySelector(".productImage");
      const imageContainer = document.querySelector(".productImageContainer");

      const imageWidth = image.width;
      const imageHeight = image.height;
      const imagewidth = image.offsetWidth;

      const imageContainerWidth = imageContainer.offsetWidth;
      const imageContainerHeight = imageContainer.offsetHeight;

      console.log(`imageContainerWidth: ${imageContainerWidth}`);
      console.log(`imageWidth: ${imageWidth}`);
      console.log(`imagewidth: ${imagewidth}`);
      console.log(`imageContainerHeight: ${imageContainerHeight}`);
      console.log(`imageHeight: ${imageHeight}`);

      if (imageWidth >= imageContainerWidth && imageHeight < imageContainerHeight) {
         //move using transform translate (y = 55%)
         image.style.transform = "translate(-50%, -56%)";
      } else image.style.transform = "translate(-50%, -50%)";
   }
};

import starImg from "./../../Images/Yellow_Star.svg";
import halfStarImg from "./../../Images/Half_Star.svg";
import grayStarImg from "./../../Images/Gray_Star1.svg";
import cache from "../../../Сache/cache";
import { set } from "lodash";
const ActionPanel = ({ product }) => {
   return (
      <div className="ActionPanel">
         <h2 className="productName">{product.name}</h2>
         <div className="reviews">
            <Rating ratingAverage={product.ratingsAverage} />
            <a className="reviewsLink">{product.ratingsQuantity} reviews</a>
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
const Rating = ({ratingAverage}) => {
   if(!ratingAverage) ratingAverage = 0;
   const stars = [];

   for(let i = 0; i < 5; i++){
      if(ratingAverage >= 1){
         stars.push(<img src={starImg} width="17px" />);
      }
      else if(ratingAverage > 0){
         stars.push(<img src={halfStarImg} width="17px" />);
      }
      else{
         stars.push(<img src={grayStarImg} width="17px" />);
      }
      ratingAverage--;
   }

   return(
      <div className="rating">
         {stars}
      </div>
   )
}

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
            {Object.entries(product.specifications)
               .slice(0, 5)
               .map(([property, value]) => (
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
         <Link className="specsLink" to={`/product/${product._id}/specifications`}>
            More...
         </Link>
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
