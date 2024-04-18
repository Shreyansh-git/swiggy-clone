import "../styles/card.css";

const Card = ({ restList }) => {
  const imageId = restList?.cloudinaryImageId;
  return (
    <div className="cardContainer">
      <div className="foodImageDiv">
        <img
          className="foodImage"
          alt="food"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${imageId}`}
        />
      </div>
      <div className="cardDetails">
        <div className="restroName">{restList?.name}</div>
        <div className="cardItemDetails">
          {/* <img alt="star"></img> */}
          <div className="cardRating">{restList?.avgRating}</div>
          <div className="deliveryTime">{restList?.foodType} mins</div>
        </div>
        <div>{restList?.cuisines.join(", ")}</div>
      </div>
    </div>
  );
};
export default Card;
