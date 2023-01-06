import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LineChart from "./LineChart";
import removeIcon from "../assets/images/closeIcon.svg";
import greenTriangle from "../assets/images/greenTriangle.svg";
import redTriangle from "../assets/images/redTriangle.svg";

function AssetCard({ asset, updateTf }) {
  const [triangle, setTriangle] = useState(greenTriangle);
  const [changeColor, setChangeColor] = useState("green");

  useEffect(() => {
    // Check if change is negative and if so change color and arrow
    if (asset.change.includes("-")) {
      setTriangle(redTriangle);
      asset.change = asset.change.substring(1);
      setChangeColor("red");
    }

    // Give selected class to btn based on time frame
    document.querySelector(`[data-id="${asset.id}"][data-tf="${asset.timeFrame}"]`).classList.add('selected')
  }, []);

  return (
    <div className="asset">
      <img className="asset__remove" data-id={asset.id} src={removeIcon} alt="remove" />
      <div className="asset__info">
        <p className="symbol">{asset.symbol}</p>
        <span className="name">{asset.name}</span>
        <hr className="info-divider" />
        <div className="flex">
          <p className="price">{asset.price} $</p>
          <div className="change">
            <img src={triangle} alt="triangle" className="change__triangle" />
            <p className={"change__number " + changeColor}>{asset.change}%</p>
          </div>
        </div>
      </div>
      <hr className="asset__divider" />
      <div className="asset__time-frame">
        <button data-tf="1D" data-id={asset.id} onClick={updateTf} className="time-frame-btn">1D</button>
        <button data-tf="1W" data-id={asset.id} onClick={updateTf} className="time-frame-btn">1W</button>
        <button data-tf="1M" data-id={asset.id} onClick={updateTf} className="time-frame-btn">1M</button>
        <button data-tf="6M" data-id={asset.id} onClick={updateTf} className="time-frame-btn">6M</button>
        <button data-tf="1Y" data-id={asset.id} onClick={updateTf} className="time-frame-btn">1Y</button>
        <button data-tf="3Y" data-id={asset.id} onClick={updateTf} className="time-frame-btn">3Y</button>
      </div>
      <hr className="asset__divider" />
      <LineChart data={asset.sparkline} changeColor={changeColor}/>
    </div>
  );
}

AssetCard.propTypes = {
  asset: PropTypes.object.isRequired,
  updateTf: PropTypes.func.isRequired
};

export default AssetCard;
