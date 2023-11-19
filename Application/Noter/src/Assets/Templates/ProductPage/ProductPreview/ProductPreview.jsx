import img1 from './../../../Images/img1.jpg';
import img2 from './../../../Images/img2.jpg';
import img3 from './../../../Images/img3.jpg';
import img4 from './../../../Images/img4.jpg';
import globals from './../../../../globals'

const ProductPreview = ({product}) => {
  const database = globals.DATABASE;

  const photosLink = `${database}/api/v1/products/photo`

  return (  
    <div className="productPreview">
        <div className="imageBar">
          {product.images.map((imageId) => 
          (<img key={imageId} src = {`${photosLink}/${imageId}`} width="39px" height="45px"/>))}
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
}
 
export default ProductPreview;