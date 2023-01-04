import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LineChart from "./LineChart";
import removeIcon from "../assets/images/closeIcon.svg";
import greenTriangle from "../assets/images/greenTriangle.svg";
import redTriangle from "../assets/images/redTriangle.svg";

function AssetCard({ asset: assetData }) {
  // const [assetData, setAssetData] = useState(asset)
  const [triangle, setTriangle] = useState(greenTriangle);
  const [changeColor, setChangeColor] = useState("green");

  useEffect(() => {
    // Check if change is negative and if so change color and arrow
    if (assetData.change.includes("-")) {
      setTriangle(redTriangle);
      assetData.change = assetData.change.substring(1);
      setChangeColor("red");
    }
  }, []);

  return (
    <div className="asset">
      <img className="asset__remove" src={removeIcon} alt="remove" />
      <div className="asset__info">
        <p className="symbol">{assetData.symbol}</p>
        <span className="name">{assetData.name}</span>
        <hr className="info-divider" />
        <div className="flex">
          <p className="price">{assetData.price} $</p>
          <div className="change">
            <img src={triangle} alt="triangle" className="change__triangle" />
            <p className={"change__number " + changeColor}>{assetData.change}%</p>
          </div>
        </div>
      </div>
      <hr className="asset__divider" />
      <div className="asset__time-frame">
        <button className="time-frame-btn selected">1D</button>
        <button className="time-frame-btn">1W</button>
        <button className="time-frame-btn">1M</button>
        <button className="time-frame-btn">6M</button>
        <button className="time-frame-btn">1Y</button>
        <button className="time-frame-btn">3Y</button>
      </div>
      <hr className="asset__divider" />
      <LineChart data={assetData.sparkline} changeColor={changeColor}/>
    </div>
  );
}

AssetCard.propTypes = {
  asset: PropTypes.object.isRequired,
};

export default AssetCard;
