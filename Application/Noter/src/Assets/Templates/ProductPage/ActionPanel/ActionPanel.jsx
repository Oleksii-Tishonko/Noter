import starImg from './../../../Images/Yellow_Star.svg';

const ActionPanel = ({product}) => {
  return (
    <div className="ActionPanel">
      <h2 className="productName">{product.name}</h2>
      <div className="reviews">
        <div className="rating">
          <img src={starImg} width="17px" />
          <img src={starImg} width="17px" />
          <img src={starImg} width="17px" />
          <img src={starImg} width="17px" />
          <img src={starImg} width="17px" />
        </div>
        <a className="reviewsLink">148 reviews</a>
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

export default ActionPanel;
