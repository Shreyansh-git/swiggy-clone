import { useEffect, useState } from "react";
import "../styles/header.css";

const Header = ({ resto, setFilteredRestro }) => {
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    let timer = setTimeout(() => {
      getSuggestion();
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const getSuggestion = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=12.96340&lng=77.58550&str=${value}&trackingId=undefined`
      );
      const data = await response.json();
      console.log(data);
      if (value.length > 1) setSuggestion(data?.data?.suggestions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="headerContainer">
      <div className="headerComponentLeft">
        <img
          alt="logo"
          src="https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg"
        />
        <div>Location</div>
      </div>
      <div className="headerComponentRight">
        <div>
          <input
            type="text"
            className="input-search"
            placeholder="Search for resturants"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <div className="dropdown">
            {value.length > 0
              ? suggestion.map((item) => {
                  return (
                    <div className="dropdown-list">
                      <img
                        alt="food"
                        className="searchImage"
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.cloudinaryId}`}
                      />
                      {item.cta.text}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div>offers</div>
        <div>help</div>
        <div>sign in</div>
        <div>cart</div>
      </div>
    </div>
  );
};

export default Header;
