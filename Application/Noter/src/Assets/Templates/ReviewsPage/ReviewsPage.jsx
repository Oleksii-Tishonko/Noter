import { useNavigate, useParams } from "react-router-dom";
import startImg from "./../../Images/Yellow_Star.svg";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import cache from "../../../Сache/cache";
import { useState } from "react";
import { useLocation } from "react-router-dom";

let page;
let productId;

const ReviewsPage = () => {
   const params = useParams();
   productId = params.productId;

   const navigator = useNavigate();

   const [reviews, setReviews] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);

   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const pageParam = queryParams.get("page");

   if (!pageParam) page = 1;
   else page = pageParam;

   useLayoutEffect(() => {
      console.log(productId);
      LoadData(productId);
   }, [page]);
   


   return (
      <div class="ReviewsPage">
         <div class="navbar">
            <Link to={`/product/${productId}`}>
               <div>About</div>
            </Link>
            <Link to={`/product/${productId}/specifications`}>
               <div>Specifications</div>
            </Link>
            <a className="selected">
               <div>Reviews</div>
            </a>
            <Link to={`/product/${productId}/questions`}>
               <div>Questions</div>
            </Link>
         </div>

         <button class="filters">Filters</button>
         <div className="reviewList"></div>
         {isPending && <div>Loading...</div>}
         {!isPending && error && <div className="error">Error: {error}</div>}
         {!isPending && reviews && reviews.length === 0 && (
            <div className="noReviews">
               <div className="header">No reviews yet</div>
               <div className="text">Be the first one to leave a review on this product!</div>
            </div>
         )}
         {!isPending &&
            reviews &&
            reviews.length > 0 &&
            reviews.map((review) => (
               <div className="review">
                  <div className="name">Expert</div>
                  <div className="date">November 13, 2030</div>
                  <div className="rating">
                     <img src={startImg} width="14.4px" />
                     <img src={startImg} width="14.4px" />
                     <img src={startImg} width="14.4px" />
                     <img src={startImg} width="14.4px" />
                     <img src={startImg} width="14.4px" />
                  </div>
                  <div className="header">{review.header}</div>
                  <div className="text">{review.text}</div>
               </div>
            ))}
         <div className="goToOtherPage">
            <button className={`goToPage ${isPreviousPageExist() ? "enabled" : "disabled"}`} onClick={() => previousPage()}>
               Previous
            </button>
            <button className={`goToPage ${isNextPageExist() ? "enabled" : "disabled"}`} onClick={() => nextPage()}>
               Next
            </button>
         </div>
      </div>
   );

   function LoadData(productId) {
    cache.ReviewsLoaded.updateProduct(productId);
    
      //checking if data exists in memory
      if (cache.ReviewsLoaded.isPageLoaded(page)) {
         console.log("data exists");
         setIsPending(false);
         setError(false);
         setReviews(cache.ReviewsLoaded.pages[page]);
         LoadNextPage();
      }
      //loading data from server
      else {
         console.log("data not exists");
         setIsPending(true);
         let loader = cache.LoadingManager.Reviews;
         loader.productId = productId;
         loader.page = page;
         loader.Load(OnDataLoaded);
      }
   }

   function OnDataLoaded(data, status, err) {
      if (status === "OK") {
         if (cache.ReviewsLoaded.isPageLoaded(page)) setReviews(cache.ReviewsLoaded.pages[page]);
      }
      setError(err);
      setIsPending(false);

      LoadNextPage();

      cache.LoadingManager.Products.Load();
      const loader = cache.LoadingManager.Product;
      loader.id = productId;
      loader.Load();
   }

   function LoadNextPage(){
      // Loading next page of reviews
      if(cache.ReviewsLoaded.isPageLoaded(Math.floor(page) + 1)) return;
      if(!cache.ReviewsLoaded.isPageExist(Math.floor(page) + 1)) return;

      const reviewsLoader = cache.LoadingManager.Reviews;
      reviewsLoader.productId = productId;
      reviewsLoader.page = Math.floor(page) + 1;
      reviewsLoader.Load();
   }

   function previousPage() {
      if (!page) page = 1;
      if (Math.floor(page) === 1) return;

      page--;
      navigator(`/product/${productId}/reviews?page=${page}`);
   }

   function nextPage() {
      if (!page) page = 1;
      page++;
      navigator(`/product/${productId}/reviews?page=${page}`);
   }

   function isNextPageExist() {
      return cache.ReviewsLoaded.isPageExist(Math.floor(page) + 1);
   }
   function isPreviousPageExist() {
      return Math.floor(page) !== 1;
   }
};

export default ReviewsPage;
