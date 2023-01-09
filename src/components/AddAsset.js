import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import lessThan from "../assets/images/less-than.svg";
import SegmentedPicker from "./SegmentedPicker";
import { DarkModeCtx } from "../DarkModeCtx";
import searchDark from "../assets/images/searchDarkMode.svg";
import searchLight from "../assets/images/searchLightMode.svg";

function AddAsset({ onClose }) {
  const { darkMode } = useContext(DarkModeCtx);
  const [assetType, setAssetType] = useState("crypto");
  const [searchIcon, setSearchIcon] = useState(searchLight);
  const [searchVal, setSearchVal] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    setSearchIcon(darkMode ? searchDark : searchLight);
  }, [darkMode]);

  function handleEnter(e) {
    if (e.key === "Enter") {
      document.getElementsByClassName("search__btn")[0].click();
    }
  }

  return (
    <div className="add-asset">
      <div className="back-btn" onClick={onClose}>
        <img src={lessThan} alt="<" />
        Back
      </div>
      <h2 className="title">Add Asset</h2>
      <SegmentedPicker
        name="search-asset-type"
        callback={(val) => {
          setAssetType(val);
        }}
        controlRef={useRef()}
        options={[
          {
            label: "Crypto",
            value: "crypto",
            ref: useRef(),
          },
          {
            label: "Stocks",
            value: "stocks",
            ref: useRef(),
          },
        ]}
        defaultOption={assetType}
      />

      <div className="search">
        <img className="search__icon" src={searchIcon} alt="Magnifying glass" />
        <input
          type="text"
          placeholder="Search"
          className="search__input"
          value={searchVal}
          onChange={(val) => setSearchVal(val.target.value)}
          onKeyDown={handleEnter}
          ref={inputRef}
        />
        <button className="search__btn">Search</button>
      </div>
    </div>
  );
}

AddAsset.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddAsset;
