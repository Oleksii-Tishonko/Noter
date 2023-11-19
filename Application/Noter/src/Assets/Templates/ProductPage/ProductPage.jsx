import ProductPreview from "./ProductPreview/ProductPreview";


import ActionPanel from "./ActionPanel/ActionPanel";
import Specifications from "./Specifications/Specifications";
import Description from "./Description/Description";
import Reviews from "./Reviews/Reviews";
import { useParams } from "react-router-dom";
import globals from "../../../globals";
import useFetch from "../../Scripts/useFetch";
import { useEffect } from "react";

const ProductPage = () => {  
  const {id} = useParams();
  console.log(globals.ProductsLoaded);
  let {product, isPending, error} = {product: null, isPending: true, error: null};

  //checking if products loaded in memmory contain this product
  const productsFiltered = globals.ProductsLoaded.filter(product => {
    return product._id === id;
  });

  if(productsFiltered.length > 0) {
    product = productsFiltered[0];
    isPending = false;
    error = false;
  }
  //loading product from server
  else{
    let data;
    ({data, isPending, error} = useFetch(`${globals.DATABASE}/api/v1/products/${id}`, '.data.product'));
    product = data;
  }

  if(isPending){
    return <div>Loading...</div>
  }
  if(error){
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="ProductPage">
      <div className="aboutProduct">
        <div className="aboutProductLeft">
         <ProductPreview product={product}/>
        </div>

        <div className="aboutProductRight">
          <ActionPanel product={product}/>
        </div>
      </div>{/*--AboutProduct End--*/}

      <div className="summary">
        {/* <div className="summaryHeader">Summary</div> */}
        <div className="summaryText">{product.summary}</div>
      </div>

      <div className="moduleSeparator"></div>
      <Specifications product={product}/>
      <Description product={product}/>
      <div className="moduleSeparator"></div>
      <Reviews product={product}/>
    </div>
  );
};

export default ProductPage;
