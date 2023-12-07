import { useParams } from 'react-router-dom';
import startImg from './../../Images/Yellow_Star.svg'
import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import cache from '../../../Сache/cache';
import { useState } from 'react';

const ReviewsPage = () => {
    const {productId} = useParams();

    const[reviews, setReviews] = useState(null);
    const[isPending, setIsPending] = useState(true);
    const[error, setError] = useState(null);

    useLayoutEffect(() => {
        console.log(productId);
        LoadData(productId);
    }, []);

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
          {error && <div className="error">Error: {error}</div>}
          {reviews && reviews.length === 0 && <div className="noReviews">
            <div className='header'>No reviews yet</div>
            <div className='text'>Be the first one to leave a review on this product!</div>
            </div>}
          {reviews && reviews.length > 0 &&
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
          {/* <div class="review">
            <div class="name">Mr. Anderson</div>
            <div class="date">November 13, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Would definitely buy again</div>
            <div class="text">For a refurbished item this unit is very good. I bought two for my granddaughters. Paid $14.48 each as compared to the price of new ones. Children are both 4 years old, so if they break them no harm no foul.</div>
        </div>

        <div class="review">
            <div class="name">TooYoungTooSimple</div>
            <div class="date">November 15, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Great phone for the price</div>
            <div class="text">Not much bigger than my last phone, but way faster! Good price as I got it on sale. Has great features I'm still learning. Some really nice accessories too. Overall very pleased with his purchase Thx Noter!</div>
        </div>

        <div class="review">
            <div class="name">Mr. Anderson</div>
            <div class="date">November 13, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Would definitely buy again</div>
            <div class="text">For a refurbished item this unit is very good. I bought two for my granddaughters. Paid $14.48 each as compared to the price of new ones. Children are both 4 years old, so if they break them no harm no foul.</div>
        </div>

        <div class="review">
            <div class="name">Mr. Anderson</div>
            <div class="date">November 13, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Would definitely buy again</div>
            <div class="text">For a refurbished item this unit is very good. I bought two for my granddaughters. Paid $14.48 each as compared to the price of new ones. Children are both 4 years old, so if they break them no harm no foul.</div>
        </div>

        <div class="review">
            <div class="name">BRIEN</div>
            <div class="date">November 17, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Easy phones</div>
            <div class="text">The Amazon package arrived quickly and was as ordered. The four handset phone system works well in our home. Good sound. Ergonomic. We have had good success with similar Panasonic phones in the past and are hopeful that these will be equally good.</div>
        </div>

        <div class="review">
            <div class="name">BRIEN</div>
            <div class="date">November 17, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Easy phones</div>
            <div class="text">The Amazon package arrived quickly and was as ordered. The four handset phone system works well in our home. Good sound. Ergonomic. We have had good success with similar Panasonic phones in the past and are hopeful that these will be equally good.</div>
        </div>

        <div class="review">
            <div class="name">Norma hernandez</div>
            <div class="date">November 18, 2021</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Would definitely buy again</div>
            <div class="text">For a refurbished item this unit is very good. I bought two for my granddaughters. Paid $14.48 each as compared to the price of new ones. Children are both 4 years old, so if they break them no harm no foul.</div>
        </div> */}
       </div>
    );

    function LoadData(productId){
       //checking if data exists in memory
       if (false && cache.ReviewsLoaded) {
          console.log("data exists");
          setIsPending(false);
          setError(false);
          setProducts(cache.ReviewsLoaded);
       }
       //loading data from server
       else {
          console.log("data not exists");
          setIsPending(true);
          let loader = cache.LoadingManager.Reviews;
          loader.productId = productId;
          loader.Load(OnDataLoaded);
       }
    }

    function OnDataLoaded(data, status, err){
        if (status === "OK") {
           setReviews(data);
        }
        setError(err);
        setIsPending(false);
    }
}
 
export default ReviewsPage;