import "./SearchResultsStyles.css";
import {useEffect, useLayoutEffect, useState} from "react";
import cache from "../../../Сache/cache";
import {Link, useLocation, useParams} from "react-router-dom";
import searchIcon from "./../../Images/search.svg";
import {useNavigate} from "react-router-dom";
import globals, {ProductsLoaded} from "../../../globals";
import Filter from "../../Scripts/filter";
import FiltersTab from "./../Filters/FiltersTab";

let pageParams = null;
let categoryId = null;
let page = 1;
let keywords = "";
let pageNavigation;

const SearchResults = () => {
    const [products, setProducts] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigate();
    pageNavigation = navigation;

    const location = useLocation();
    pageParams = new URLSearchParams(location.search);
    // if (pageParams) pageParams = pageParams.replace(/%20/g, " ");

    categoryId = pageParams.get("category");

    // console.log('params');
    // console.log(params);

    // console.log(cache.ProductsLoaded);

    //Start
    useLayoutEffect(() => {
        cache.Filters = getFilters();

        if (pageParams.has("page")) page = pageParams.get("page");
        if (page) cache.ProductsPage = page;

        if (pageParams.has("keywords")) keywords = pageParams.get("keywords");

        if (!pageParams.has("category") || categoryId.length < 16) navigation("/404");
        LoadData();
    }, [location.search]);

    return (
        <div className="searchResultsPage">
            <h1 id="header">Noter Shop</h1>
            <NavBar />

            <div className="pageContent">
                <FiltersTab />

                <div className="searchResults">
                    {isPending && <div>Loading...</div>}
                    {error && <div className="error">error: {error}</div>}
                    {!isPending && products && (
                        <div>
                            <ProductsList products={products} />
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
            </div>
        </div>
    );

    function isPreviousPageExist() {
        return Math.floor(page) !== 1;
    }
    function isNextPageExist() {
        try {
            return cache.ProductsLoaded.isPageExist(Math.floor(page) + 1);
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    function nextPage() {
        if (!page) page = 1;
        page++;
        pageParams.set("page", page);
        window.scrollTo(0, 0);
        pageNavigation(`/products?${pageParams.toString()}`);
    }
    function previousPage() {
        if (!page) page = 1;
        if (Math.floor(page) === 1) return;
        page--;
        pageParams.set("page", page);
        window.scrollTo(0, 0);
        pageNavigation(`/products?${pageParams.toString()}`);
    }

    function LoadData() {
        //checking if data exists in memory

        if (cache.ProductsLoaded.isPageLoaded(page) && cache.ProductsLoaded.compareFilters(cache.ProductsLoaded.filters, getFilters()) && cache.ProductsLoaded.keywords == keywords) {
            console.log("data exists");
            setIsPending(false);
            setError(false);
            setProducts(cache.ProductsLoaded.pages[page]);

            LoadOtherData();
        }
        //loading data from server
        else {
            console.log("data not exists");
            setIsPending(true);
            let loader = cache.LoadingManager.Products;
            console.warn(filtersToQuery(getFilters()));
            loader.filters = getFilters();
            console.log(loader.params);
            loader.requestPath;
            if (page) loader.page = page;
            if (keywords) loader.keywords = keywords;
            console.log(loader.params);
            loader.Load(OnDataLoaded);
        }
    }

    function filtersToQuery(filters) {
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

    function OnDataLoaded(data, status, err) {
        if (status === "OK") {
            console.log("status: OK");
            if (cache.ProductsLoaded.isPageLoaded(page)) setProducts(cache.ProductsLoaded.pages[page]);
        }
        setError(err);
        setIsPending(false);

        LoadOtherData();
    }

    function LoadOtherData() {
        if (isPreviousPageExist() && !cache.ProductsLoaded.isPageLoaded(Math.floor(page) - 1)) LoadPreviousPage();
        if (isNextPageExist() && !cache.ProductsLoaded.isPageLoaded(Math.floor(page) + 1)) LoadNextPage();
    }

    function LoadNextPage() {
        if (!isNextPageExist()) return;
        const productsLoader = cache.LoadingManager.Products;
        productsLoader.filters = getFilters();
        productsLoader.page = Math.floor(page) + 1;
        productsLoader.Load();
    }
    function LoadPreviousPage() {
        if (page === 1) return;
        const productsLoader = cache.LoadingManager.Products;
        productsLoader.filters = getFilters();
        productsLoader.page = Math.floor(page) - 1;
        productsLoader.Load();
    }
};

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

function checkCurrentFilters() {
    const filters = getFilters();

    if (!cache.ProductsLoaded.isPageLoaded(page)) return false;
    if (!filters) return true;
    const products = cache.ProductsLoaded.pages[page];

    const keys = Object.keys(filters);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const options = parseOptions(filters[key]);
        for (let j = 0; j < options.length; j++) {
            const option = options[j];

            let isOptionFound = false;

            for (let k = 0; k < products.length; k++) {
                const product = products[k];
                const productOption = product.specifications[key];
                if (productOption === option) isOptionFound = true;
            }

            if (!isOptionFound) return false;
        }
    }

    return true;
}

export default SearchResults;

const Product = ({product}) => {
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

const ProductsList = ({products}) => {
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

function getFilters() {
    let filters = pageParams.get("filters");
    if (filters) filters = JSON.parse(filters);

    if (filters && filters.length !== 0) return filters;
    return null;
}
function parseOptions(options) {
    if (!options) return [];
    options = options.split(",");
    return options;
}

import shoppingCartImg from "./../../Images/shopping_cart2.svg";

const NavBar = () => {
    const [userName, setUserName] = useState(null);
    const [isAuthentificated, setIsAuthentificated] = useState(false);
    const [accountLink, setAccountLink] = useState("");
    const [searchInput, setSearchInput] = useState("");

    useLayoutEffect(() => {
        setUserName(cache.UserName);
        if (!cache.Cart.isLoaded()) cache.Cart.loadCart();
        else console.log(`cart is loaded: ${JSON.stringify(cache.Cart)}`);
    }, []);

    useEffect(() => {
        const username = cache.UserName;

        if (!userName) {
            setUserName(cache.UserName);
        } //setter not working instantly

        if (!username || username === "null") setUserName("Login");

        if (username && username !== "null") setAccountLink("/userAccount");
        else setAccountLink("/authentificate");
    }, [userName]);

    useEffect(() => {
        if (userName !== "Login" && userName) setIsAuthentificated(true);
        else setIsAuthentificated(false);
    }, [userName]);

    useEffect(() => {
        console.warn(`isAuthentificated: ${isAuthentificated}`);
        console.log(userName);
    }, [isAuthentificated]);

    function SearchForResults() {
        console.log("Searching for results");
        pageParams.set("keywords", searchInput);

        console.log(searchInput);
        console.log(pageParams.toString());
        pageNavigation(`/products?${pageParams.toString()}`);
    }

    function ClearKeywords() {
        console.log("Clearing keywords");
        setSearchInput("");
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") SearchForResults();
    }

    return (
        <div className="navBar">
            <div className="searchbar">
                <div className="searchImage">
                    <img src={searchIcon} />
                </div>
                <input className="searchInput" value={searchInput} type="text" onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}></input>
                <button className="deleteInput" onClick={() => ClearKeywords()}>
                    X
                </button>
                <button className="searchButton" onClick={() => SearchForResults()}>
                    Find
                </button>
            </div>
            <Link to={accountLink} className="userAccount">
                {userName}
            </Link>
            <Link to={`/cart`} className="cart">
                <img src={shoppingCartImg} width="35px" />
                <a className="cartSize">{isAuthentificated ? cache.Cart.getItemsCount() : 0}</a>
            </Link>
        </div>
    );
};
