import {useNavigate, useParams} from "react-router-dom";
import starImg from "./../../Images/Yellow_Star.svg";
import GrayStarImg from "./../../Images/Gray_Star1.svg";
import {Link} from "react-router-dom";
import {useContext, useEffect, useLayoutEffect} from "react";
import cache from "../../../Сache/cache";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import ReviewEditor from "./ReviewEditor";
import globals from "../../../globals";
import {AuthContext} from "../Authentificate/AuthContext";

let page;
let productId;
let uid;

const ReviewsPage = () => {
    const {user} = useContext(AuthContext);
    const params = useParams();
    productId = params.productId;

    const navigator = useNavigate();

    const [reviews, setReviews] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [loginPopupOpen, setLoginPopupOpen] = useState(false);
    const [reviewEditorOpen, setReviewEditorOpen] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get("page");

    if (!pageParam) page = 1;
    else page = pageParam;

    useEffect(() => {
        if (user) {
            uid = user.uid;
        }
        console.warn(user);
    }, [user]);

    useLayoutEffect(() => {
        console.log(productId);
        LoadData(productId);
    }, [page]);

    function handleWriteReview() {
        if (cache.UserName && cache.UserName !== "null") setReviewEditorOpen(true);
        else setLoginPopupOpen(true);
    }

    const closePopup = () => {
        setLoginPopupOpen(false);
    };

    function handleSignIn() {
        cache.PageInvokedSignIn = location.pathname;
        console.log(cache.PageInvokedSignIn);
        navigator("/authentificate");
    }

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

            {/* <button class="filters">Filters</button> */}
            <div className="reviewList"></div>
            {isPending && <div>Loading...</div>}
            {!isPending && error && <div className="error">Error: {error}</div>}
            {!isPending && reviews && reviews.length === 0 && (
                <div className="noReviews">
                    <div className="header">No reviews yet</div>
                    <div className="text">Be the first one to leave a review on this product!</div>
                    <div className="writeReview">
                        {!reviewEditorOpen && (
                            <div className="leaveReview" onClick={() => handleWriteReview()}>
                                Write a review
                            </div>
                        )}
                        {loginPopupOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>Write a review</h2>
                                    <p>To continue, please sign in or create an account</p>
                                    <button onClick={() => handleSignIn()}>Sign in</button>
                                    <button onClick={closePopup}>Close</button>
                                </div>
                            </div>
                        )}
                        {reviewEditorOpen && <ReviewEditor onReviewSubmitted={OnReviewSubmitted} />}
                    </div>
                </div>
            )}
            {!isPending && reviews && reviews.length > 0 && (
                <div>
                    <div className="writeReview">
                        {!reviewEditorOpen && (
                            <div className="leaveReviewLeft" onClick={() => handleWriteReview()}>
                                Write a review
                            </div>
                        )}
                        {loginPopupOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>Write a review</h2>
                                    <p>To continue, please sign in or create an account</p>
                                    <button onClick={() => handleSignIn()}>Sign in</button>
                                    <button onClick={closePopup}>Close</button>
                                </div>
                            </div>
                        )}
                        {reviewEditorOpen && <ReviewEditor onReviewSubmitted={OnReviewSubmitted} />}
                    </div>
                    {reviews.map((review) => (
                        <div className="review">
                            <div className="name">{review.user.firstName}</div>
                            <div className="date">{review.dateCreated}</div>
                            <div className="rating">
                                {LoadStarsForRating(review.rating)}
                                {/* <div className="ratingNumber">{review.rating}</div> */}
                            </div>
                            <div className="header">{review.title}</div>
                            {review.pros && (
                                <div className="pros">
                                    <a className="inlineHeader">Pros:</a> {review.pros}
                                </div>
                            )}
                            {review.cons && (
                                <div className="cons">
                                    <a className="inlineHeader">Cons:</a>
                                    {review.cons}
                                </div>
                            )}
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
            )}
        </div>
    );
    function LoadStarsForRating(rating) {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) stars.push(<img src={starImg} width="14.4px" />);
            else stars.push(<img src={GrayStarImg} width="14.4px" />);
        }
        return stars;
    }

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
        } else console.log(data);
        setError(err);
        setIsPending(false);

        LoadNextPage();

        cache.LoadingManager.Products.Load();
        const loader = cache.LoadingManager.Product;
        loader.id = productId;
        loader.Load();
    }

    function LoadNextPage() {
        // Loading next page of reviews
        if (cache.ReviewsLoaded.isPageLoaded(Math.floor(page) + 1)) return;
        if (!cache.ReviewsLoaded.isPageExist(Math.floor(page) + 1)) return;

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

    function OnReviewSubmitted(title, pros, cons, text, rating) {
        writeReview(title, pros, cons, text, rating);
    }

    function writeReview(title, pros, cons, text, rating) {
        if (!uid) console.warn("User uid not loaded");

        const review = {
            product: productId,
            title: title,
            pros: pros,
            cons: cons,
            text: text,
            rating: rating,
            user: uid,
        };

        console.log(`Review: ${review}`);
        // send review to server
        const ReastAPI = cache.RestAPI;
        const url = `${globals.DATABASE}/api/v1/reviews`;
        ReastAPI.WriteData(url, review, OnReviewWritten);
    }

    function OnReviewWritten(data, status, err) {
        if (status === "OK") console.log("Review written");
        else console.log("Error writing review");
        console.log(`data: ${JSON.stringify(data)}`);
    }
};

export default ReviewsPage;
