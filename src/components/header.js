import { useEffect, useState } from "react";
import "../styles/header.css";

const Header = ({ resto, setFilteredRestro }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log(value);
      setFilteredRestro(
        resto.filter((item) =>
          item.info.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, resto, setFilteredRestro]);

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
              setValue(e.target.value);
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
