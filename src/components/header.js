import { useState } from "react";
import "../styles/header.css";

const Header = ({ resto, setFilteredRestro }) => {
  const [value, setValue] = useState("");

  const updateResto = (e) => {
    console.log(e);
    setValue(e.target.value);
    setFilteredRestro(
      resto.filter((item) =>
        item.info.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
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
            placeholder="Search for resturants"
            value={value}
            onChange={(e) => {
              updateResto(e);
            }}
          />
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
