import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getSearchResults } from "../lib/apiHandler";
import { v4 as uuid } from "uuid";
import moreThanDark from '../assets/images/moreThanDark.svg'
import moreThanLight from '../assets/images/moreThanLight.svg'
import { DarkModeCtx } from "../DarkModeCtx";

function SearchResults({ value, assetType }) {
  const [results, setResults] = useState([]);
  const [moreThanIcon, setMoreThanIcon] = useState(moreThanLight)
  const {darkMode} = useContext(DarkModeCtx)

  useEffect(() => {
    setMoreThanIcon(darkMode ? moreThanDark : moreThanLight);
  }, [darkMode]);

  useEffect(() => {
    setResults(getSearchResults(value, assetType));
  }, [value]);

  return (
    <ul className="search-results" role='list'>
      {results.map((result) => (
        <li key={uuid()} className="result">
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
};

export default SearchResults;
