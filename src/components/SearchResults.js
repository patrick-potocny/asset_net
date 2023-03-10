import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import { getAssetData, getSearchResults } from "../lib/apiHandler";
import { addAsset } from "../lib/localStorageHandler";
import moreThanDark from "../assets/images/moreThanDark.svg";
import moreThanLight from "../assets/images/moreThanLight.svg";
import { DarkModeCtx } from "../DarkModeCtx";
import { AssetDataCtx } from "../AssetDataCtx";

function SearchResults({ value, assetType, onClose }) {
  const [results, setResults] = useState([]);
  const [moreThanIcon, setMoreThanIcon] = useState(moreThanLight);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(DarkModeCtx);
  const {setAssetData} = useContext(AssetDataCtx)

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

  async function addClickedAsset(id, name) {
    // Adds to localStorage
    const newAsset = addAsset(id, name, assetType)
    if (!newAsset) {
      setError('This asset is already in portfolio')
      return
    }

    // Adds to assetData Ctx
    const newAssetData = await getAssetData(newAsset)
    setAssetData(current => [...current, newAssetData])
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
        <li key={result.id} className="result" onClick={() => addClickedAsset(result.id, result.name)}>
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
