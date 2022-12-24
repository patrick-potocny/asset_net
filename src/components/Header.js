import React from "react";
import logoLight from "../assets/images/logoLight.svg";
import moon from '../assets/images/moon.svg'

function Header() {
  return (
    <header className="header">
      <img src={logoLight} className="logo" alt="AssetNet" />
      <div className="toggle">
        <input type="checkbox" className="checkbox" id="checkbox" />
        <label htmlFor="checkbox" className="label">
          <div className="ball"><img src={moon} alt="moon" /></div>
        </label>
      </div>
    </header>
  );
}

export default Header;
