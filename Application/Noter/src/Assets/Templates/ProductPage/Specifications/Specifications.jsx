const Specifications = ({product}) => {
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

export default Specifications;
