import { Link, NavLink, Outlet } from "react-router-dom";
import React, { useState } from "react";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="layout">
      <div className="nav">
        <div className="cont">
          <div className="burger-cont">
            <Link to="/">
              <img src="/Icons/Logo-black.png" alt="Goldstern" />
            </Link>
            <div
              className={`burger ${isOpen ? "open" : ""}`}
              onClick={handleBurgerClick}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <ul className={`list ${isOpen ? "open" : ""}`}>
            <NavLink onClick={handleBurgerClick} to="/">
              Home
            </NavLink>
            <NavLink onClick={handleBurgerClick} to="/about">
              About Us
            </NavLink>
            <NavLink onClick={handleBurgerClick} to="/inventory">
              Car Inventory
            </NavLink>
            <NavLink onClick={handleBurgerClick} to="/services">
              Services
            </NavLink>
            <NavLink onClick={handleBurgerClick} to="/contact">
              Contact Us
            </NavLink>
          </ul>
          <Link
            className={`login ${isOpen ? "open" : ""}`}
            onClick={handleBurgerClick}
            to="/">
            User-Portal
          </Link>
        </div>
      </div>
      <main>
        <Outlet />
        <div className="wrapper"></div>
      </main>
      <div className="footer">
        <div className="social-media">
          <a
            href="https://www.facebook.com/profile.php?id=61552608263446"
            target="_blank"
            rel="noreferrer">
            <p>
              <img src=".\Icons\facebook.png" alt="Facebook" />
              Goldstern
            </p>
          </a>
          <a
            href="https://www.instagram.com/goldstern_eg/"
            target="_blank"
            rel="noreferrer">
            <p>
              <img src=".\Icons\instagram.png" alt="Instagram" />
              goldstern_eg
            </p>
          </a>
          <a
            href="https://www.tiktok.com/@goldstern.eg"
            target="_blank"
            rel="noreferrer">
            <p>
              <img src=".\Icons\tiktok.png" alt="Tiktok" />
              goldstern.eg
            </p>
          </a>
        </div>
        <div className="line-break"></div>
        <p>&copy; Goldstern, All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Layout;
