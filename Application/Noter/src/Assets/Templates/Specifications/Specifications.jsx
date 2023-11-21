import { Link, useParams } from "react-router-dom";
import globals from "../../../globals";
import useFetch from "../../Scripts/useFetch";

const Specifications = () => {
    const {id} = useParams();

    let specifications;
    let {product, isPending, error} = {specifications: null, isPending: true, error: null};

    if(globals.ProductsLoaded && globals.ProductsLoaded.length !== 0){
        console.log('products loaded');
        console.log(globals.ProductsLoaded);
        const productsFiltered = globals.ProductsLoaded.filter(product => {
        return product._id === id;
        });

        if(productsFiltered.length > 0) {
            isPending = false;
            error = false;

            specifications = productsFiltered[0].specifications;
        }

        
    }
    else{
        console.log('products not loaded');
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

    if(product) specifications = product.specifications;

    return (
        <div className="SpecificationsPage">
        <div className="navbar">
        <Link to={`/products/${id}`}><div>About</div></Link>
        <a><div className="selected">Specifications</div></a>
        <Link to={`/products/${id}/reviews`}><div>Reviews</div></Link>
        <Link to={`/products/${id}/questions`}><div>Questions</div></Link>
    </div>
    <div className="specs">
        <p id="header">Specifications</p>
      <table className="listOfSpecs">
        {Object.entries(specifications).map(([property, value]) => (
        <tr key={property}>
          <th>{property}</th>
          <td>{value}</td>
        </tr>
      ))}
      {/* To make a normal page */}
      {Object.entries(specifications).map(([property, value]) => (
        <tr key={property}>
          <th>{property}</th>
          <td>{value}</td>
        </tr>
      ))}
      {Object.entries(specifications).map(([property, value]) => (
        <tr key={property}>
          <th>{property}</th>
          <td>{value}</td>
        </tr>
      ))}
      {Object.entries(specifications).map(([property, value]) => (
        <tr key={property}>
          <th>{property}</th>
          <td>{value}</td>
        </tr>
      ))}
      {Object.entries(specifications).map(([property, value]) => (
        <tr key={property}>
          <th>{property}</th>
          <td>{value}</td>
        </tr>
      ))}
      </table>
    </div>
            
        </div>
    );
}
 
export default Specifications;