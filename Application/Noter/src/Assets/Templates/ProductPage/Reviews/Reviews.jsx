import starImg from './../../../Images/Yellow_Star.svg';

const Reviews = () => {
    return (  
        <div className="reviewsSection">
        <div className="reviewsHeader">Customer reviews</div>
        <div className="review">
          <div className="name">Mr. Anderson</div>
          <div className="date">November 13, 2023</div>
          <div className="rating">
            <img src={starImg} width="14.4px" />
            <img src={starImg} width="14.4px" />
            <img src={starImg} width="14.4px" />
            <img src={starImg} width="14.4px" />
            <img src={starImg} width="14.4px" />
          </div>
          <div className="header">Would definitely buy again</div>
          <div className="text">
            For a refurbished item this unit is very good. I bought two for my
            granddaughters. Paid $14.48 each as compared to the price of new
            ones. Children are both 4 years old, so if they break them no harm
            no foul.
          </div>
        </div>

        <div className="review">
          <div className="name">TooYoungTooSimple</div>
          <div className="date">November 15, 2023</div>
          <div className="rating">
            <img src={starImg} width="14.4px" />
            <img src={starImg} width="14.4px" />
            <img src={starImg} width="14.4px" />
            <img src={starImg} width="14.4px" />
            <img src={starImg} width="14.4px" />
          </div>
          <div className="header">Great phone for the price</div>
          <div className="text">
            Not much bigger than my last phone, but way faster! Good price as I
            got it on sale. Has great features I'm still learning. Some really
            nice accessories too. Overall very pleased with his purchase Thx
            Noter!
          </div>
        </div>
      </div>
    );
}
 
export default Reviews;