import { Link, useParams } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import cache from "../../../Сache/cache";

const Specifications = () => {
   const { id } = useParams();

   const [specifications, setSpecifications] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);

   //Start
   useLayoutEffect(() => {
      LoadData(id);
   }, []);

   if (isPending) {
      return <div>Loading...</div>;
   }
   if (error) {
      return <div className="error">Error: {error}</div>;
   }

   return (
      <div className="SpecificationsPage">
         <div className="navbar">
            <Link to={`/product/${id}`}>
               <div>About</div>
            </Link>
            <a>
               <div className="selected">Specifications</div>
            </a>
            <Link to={`/product/${id}/reviews`}>
               <div>Reviews</div>
            </Link>
            <Link to={`/product/${id}/questions`}>
               <div>Questions</div>
            </Link>
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
               
            </table>
         </div>
      </div>
   );

   function LoadData(id) {
      let dataLoaded = false;
      //checking if data exists in memory
      
      if(cache.CurrentProduct){
         setSpecifications(cache.CurrentProduct.specifications);
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
         setSpecifications(data.specifications);
      }
      setError(err);
      setIsPending(false);

      cache.LoadingManager.Products.Load();
   }
};

export default Specifications;
