import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAssetData, getSearchResults } from "../lib/apiHandler";
import { addAsset } from "../lib/localStorageHandler";
import {v4 as uuid} from 'uuid'
import moreThanDark from "../assets/images/moreThanDark.svg";
import moreThanLight from "../assets/images/moreThanLight.svg";
import { DarkModeCtx } from "../DarkModeCtx";
import Spinner from "./Spinner";
import { AssetDataCtx } from "../AssetDataCtx";

function SearchResults({ value, assetType, onClose }) {
  const [results, setResults] = useState("");
  const [moreThanIcon, setMoreThanIcon] = useState(moreThanLight);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(DarkModeCtx);
  const {assetData, setAssetData} = useContext(AssetDataCtx)

  useEffect(() => {
    setMoreThanIcon(darkMode ? moreThanDark : moreThanLight);
  }, [darkMode]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await getSearchResults(value, assetType);
        setResults(response);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    }
    fetchData();
  }, [value]);

  async function AddAsset(e) {
    const id = e.target.getAttribute("data-id");

    // Adds to localStorage
    const newAsset = addAsset(id, assetType)
    if (!newAsset) {
      setError('This asset is already in portfolio')
      return
    }

    // Adds to assetData Ctx
    const newAssetData = await getAssetData(newAsset)
    assetData.push(newAssetData)
    setAssetData(assetData)
    onClose()
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    if (error === 'This asset is already in portfolio') {
      return (
        <p className="error">
          {error}
        </p>
      )
    }

    return (
      <p className="error">
        Oops, something went wrong <br />
        Please try again
      </p>
    );
  }

  if (results.length === 0) {
    return <p className="error">No assets found</p>;
  }

  return (
    <ul className="search-results" role="list">
      {results.map((result) => (
        <li key={uuid()} data-id={result.id} className="result" onClick={AddAsset}>
          <div className="result__info">
            <span className="symbol">{result.symbol}</span>
            <span className="name">{result.name}</span>
          </div>
          <img className="result__add" src={moreThanIcon} alt="more-than" />
        </li>
      ))}
    </ul>
  );
}

SearchResults.propTypes = {
  value: PropTypes.string.isRequired,
  assetType: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SearchResults;
