const Description = ({product}) => {
  return (
    <div className="description">
      <div className="decriptionHeader">Description</div>
      <div className="descriptionText">{product.description}</div>
    </div>
  );
};

export default Description;
