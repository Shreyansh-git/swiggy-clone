import { useState, useEffect, useRef } from "react";

const InfiniteScroll = ({
  setResto,
  filteredRestro,
  setFilteredRestro,
  lastElement,
}) => {
  const [pageNum, setPageNum] = useState(0);

  const TOTAL_PAGES = 10;

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
};

export default InfiniteScroll;
