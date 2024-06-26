import { useState, useEffect, useRef } from "react";
import { RotatingTriangles } from "react-loader-spinner";
import ResturantCards from "./components/resturantCards";
import "./App.css";
// import callResData from "./components/infiniteScroll";
import Header from "./components/header";

function App() {
  const [resto, setResto] = useState([]);
  const [filteredRestro, setFilteredRestro] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastElement, setLastElement] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const TOTAL_PAGES = 10;

  useEffect(() => {
    const getRestList = async () => {
      const res = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const resList = await res.json();
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

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        console.log(pageNum);
        setPageNum((no) => no + 1);
      }
    })
  );
  const callResData = async () => {
    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58450&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const resList = await res.json();
    const updatedList = resList.data.cards.filter(
      (item) => item.card.card.id === "restaurant_grid_listing"
    )[0].card.card.gridElements.infoWithStyle.restaurants;

    setResto([...filteredRestro, ...updatedList]);
    setFilteredRestro([...filteredRestro, ...updatedList]);
  };

  useEffect(() => {
    if (pageNum <= TOTAL_PAGES) {
      callResData();
    }
  }, [pageNum]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

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
        </div>
      )}
      <div ref={setLastElement}>
        <RotatingTriangles />
      </div>
    </div>
  );
}

export default App;

// useEffect(() => {
// InfiniteScroll(setResto, filteredRestro, setFilteredRestro, lastElement);
// }, []);

// window.onscroll = async (e) => {
//   if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
//     console.log(window.scrollY);
//     const res = await fetch(
//       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58450&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//     );
//     const resList = await res.json();
//     const updatedList = resList.data.cards.filter(
//       (item) => item.card.card.id === "restaurant_grid_listing"
//     )[0].card.card.gridElements.infoWithStyle.restaurants;

//     setResto([...filteredRestro, ...updatedList]);
//     setFilteredRestro([...filteredRestro, ...updatedList]);
//   }
// };
