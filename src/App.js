import { useState, useEffect } from "react";
import { RotatingTriangles } from "react-loader-spinner";
import ResturantCards from "./components/resturantCards";
import "./App.css";
import Header from "./components/header";

function App() {
  const [resto, setResto] = useState([]);
  const [filteredRestro, setFilteredRestro] = useState(resto);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRestList = async () => {
      const res = await fetch(
        "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=12.96340&lng=77.58550&carousel=true&third_party_vendor=1"
      );
      const resList = await res.json();
      console.log(resList);
      setIsLoading(false);
      setResto(
        resList.data.cards.filter(
          (item) => item.card.card.id === "restaurant_grid_listing"
        )[0].card.card.gridElements.infoWithStyle.restaurants
      );
      setFilteredRestro(
        resList.data.cards.filter(
          (item) => item.card.card.id === "restaurant_grid_listing"
        )[0].card.card.gridElements.infoWithStyle.restaurants
      );
    };
    getRestList();
  }, []);
  const payload = {
    nextOffset: "COVCELQ4KIDY6KOu4qqCLzClEzgD",
    widgetOffset: {
      NewListingView_category_bar_chicletranking_TwoRows: "",
      NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
      Restaurant_Group_WebView_PB_Theme: "",
      Restaurant_Group_WebView_SEO_PB_Theme: "",
      collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "10",
      inlineFacetFilter: "",
      restaurantCountWidget: "",
    },
    filters: {},
    lat: "12.96340",
    lng: "77.58550",
    seoParams: {
      seoUrl: "https://www.swiggy.com/restaurants",
      pageType: "FOOD_HOMEPAGE",
      apiName: "FoodHomePage",
    },
    _csrf: "TsUFyhRHOZ4N-sfie7tL0g6jysolZOOgdCDkC-tQ",
  };

  const loadMore = async () => {
    const res = await fetch(
      "https://www.swiggy.com/mapi/restaurants/list/update",
      {
        method: "POST",
        body: payload,
      }
    );
    const updatedList = await res.json();
    console.log(updatedList);
  };

  return (
    <div className="App">
      <Header resto={resto} setFilteredRestro={setFilteredRestro} />
      {isLoading ? (
        <div className="loader">
          <RotatingTriangles />
        </div>
      ) : (
        <div>
          <ResturantCards resto={filteredRestro} />
          <button className="button-see-more" onClick={loadMore}>
            See More
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
