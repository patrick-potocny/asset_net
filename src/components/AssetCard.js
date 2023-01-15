import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import LineChart from "./LineChart";
import Modal from "./Modal";
import DelAsset from "./DelAsset";
import removeIcon from "../assets/images/closeIcon.svg";
import greenTriangle from "../assets/images/greenTriangle.svg";
import redTriangle from "../assets/images/redTriangle.svg";
import { updateTf } from "../lib/utlis";
import { AssetDataCtx } from "../AssetDataCtx";

function AssetCard({ asset }) {
  const { assetData, setAssetData } = useContext(AssetDataCtx);
  const [triangle, setTriangle] = useState(greenTriangle);
  const [changeColor, setChangeColor] = useState("green");
  const [isOpen, setIsOpen] = useState(false);
  const timeFrames = ["1D", "1W", "1M", "3M", "1Y", "3Y"];

  useEffect(() => {
    // Check if change is negative and if so change color and arrow
    if (!asset.rising) {
      setTriangle(redTriangle);
      setChangeColor("red");
    }
  }, []);

  return (
    <div className="asset">
      <img
        className="asset__remove"
        onClick={() => setIsOpen(true)}
        data-id={asset.id}
        src={removeIcon}
        alt="remove"
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DelAsset
          assetId={asset.id}
          assetSymbol={asset.symbol}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
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
        {timeFrames.map((tf) => (
          <button
            key={tf}
            onClick={() => {
              updateTf(asset.id, tf, assetData, setAssetData);
            }}
            className={`time-frame-btn ${
              tf === asset.timeFrame ? "selected" : ""
            }`}
          >
            {tf}
          </button>
        ))}
      </div>
      <hr className="asset__divider" />
      <LineChart data={asset.sparkline} changeColor={changeColor} />
    </div>
  );
}

AssetCard.propTypes = {
  asset: PropTypes.object.isRequired,
};

export default AssetCard;
