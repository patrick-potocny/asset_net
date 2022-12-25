import React, { useEffect, useState } from "react";
import logoLight from "../assets/images/logoLight.svg";
import logoDark from "../assets/images/logoDark.svg";
import moon from "../assets/images/moon.svg";
import sun from "../assets/images/sun.svg";

function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [icon, setIcon] = useState(moon);
  const [logo, setLogo] = useState(logoLight);

  // Gets users preffered mode if its saved in localStorage, if not saves current mode
  useEffect(() => {
    let usersDarkMode = localStorage.getItem("darkMode");
    if (usersDarkMode === null) {
      localStorage.setItem("darkMode", true);
    } else if (usersDarkMode === "false") {
      setDarkMode(false);
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
      <div className="header__toggle" tabIndex={0}>
        <input
          type="checkbox"
          className="header__checkbox"
          id="checkbox"
          checked={darkMode}
          onChange={handleChange}
        />
        <label htmlFor="checkbox" className="header__label">
          <div className="header__ball">
            <img src={icon} alt="moon" />
          </div>
        </label>
      </div>
    </header>
  );
}

export default Header;
