import Card from "./card";

const ResturantCards = ({ resto }) => {
  return (
    <div className="resturantList">
      {resto.length
        ? resto.map((item, index) => <Card key={index} restList={item.info} />)
        : null}
    </div>
  );
};

export default ResturantCards;
