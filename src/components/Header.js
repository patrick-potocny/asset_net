import React, { useEffect, useState } from "react";
import logoLight from "../assets/images/logoLight.svg";
import logoDark from "../assets/images/logoDark.svg";
import moon from "../assets/images/moon.svg";
import sun from "../assets/images/sun.svg";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [icon, setIcon] = useState(sun);
  const [logo, setLogo] = useState(logoDark);

  // Sets mode to light mode if user preffers it
  useEffect(() => {
    if (localStorage.getItem('darkMode') === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode === true) {
      setIcon(moon);
      setLogo(logoLight);
      document.body.classList.remove("lightMode");
      localStorage.setItem("darkMode", true);
    } else if (darkMode === false) {
      setIcon(sun);
      setLogo(logoDark);
      document.body.classList.add("lightMode");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  function handleChange() {
    setDarkMode(!darkMode);
  }

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="AssetNet" />
      <div className="header__toggle">
        <input
          type="checkbox"
          className="header__checkbox"
          id="checkbox"
          data-testid="dark-mode-toggle"
          checked={darkMode}
          onChange={handleChange}
        />
        <label htmlFor="checkbox" className="header__label">
          <div className="header__ball">
            <img src={icon} alt="mode-icon" />
          </div>
        </label>
      </div>
    </header>
  );
}

export default Header;
