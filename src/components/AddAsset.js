import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import lessThan from "../assets/images/less-than.svg";
import SegmentedPicker from "./SegmentedPicker";
import SearchResults from "./SearchResults";
import { DarkModeCtx } from "../DarkModeCtx";
import searchDark from "../assets/images/searchDarkMode.svg";
import searchLight from "../assets/images/searchLightMode.svg";

function AddAsset({ onClose }) {
  const { darkMode } = useContext(DarkModeCtx);
  const currentAssetType = localStorage.getItem("assetType");
  const [assetType, setAssetType] = useState(
    currentAssetType === "all_assets" ? "crypto" : currentAssetType
  );
  const [searchIcon, setSearchIcon] = useState(null);
  const [inputVal, setInputVal] = useState(false);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setSearchIcon(darkMode ? searchDark : searchLight);
  }, [darkMode]);

  useEffect(() => {
    setInputVal(false);
  }, [assetType]);

  function handleEnter(e) {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  }

  return (
    <div className="add-asset">
      <div className="add-asset__back-btn" onClick={onClose}>
        <img src={lessThan} alt="<" />
        <span>Back</span>
      </div>
      <h2 className="add-asset__title">Add Asset</h2>
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

      <div className="add-asset__search">
        <img className="icon" src={searchIcon} alt="Magnifying glass" />
        <input
          type="text"
          placeholder="Search"
          className="input"
          onKeyDown={handleEnter}
          ref={inputRef}
        />
        <button
          className="btn"
          onClick={() => {
            setInputVal(inputRef.current.value);
          }}
          ref={buttonRef}
        >
          Search
        </button>
      </div>

      {inputVal && (
        <SearchResults
          value={inputVal}
          assetType={assetType}
          onClose={onClose}
        />
      )}
    </div>
  );
}

AddAsset.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddAsset;
