import Style from "../../styles/Layout/Layout.module.css";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={Style.layout}>
      <div className={`${Style.nav} ${isSticky ? Style.sticky : ""}`}>
        <div className={Style.cont}>
          <div className={Style.burgerCont}>
            <Link to="/">
              <img
                loading="lazy"
                src="/Icons/Logo-black.webp"
                alt="Goldstern"
              />
            </Link>
            {/* <div className={Style.lang}>
              <p className={Style.langSelect}>
                <img src="./Icons/english.webp" alt="" />
                en
              </p>
            </div> */}
            <div
              className={`${Style.burger} ${isOpen ? Style.open : ""}`}
              onClick={handleBurgerClick}
            >
              <div className={Style.line}></div>
              <div className={Style.line}></div>
              <div className={Style.line}></div>
            </div>
          </div>
          <ul className={`${Style.list} ${isOpen ? Style.open : ""}`}>
            <NavLink
              onClick={handleBurgerClick}
              to="/"
              className={({ isActive }) => (isActive ? Style.active : "")}
            >
              Home
            </NavLink>
            <NavLink
              onClick={handleBurgerClick}
              to="/about"
              className={({ isActive }) => (isActive ? Style.active : "")}
            >
              About Us
            </NavLink>
            {/*<NavLink
              onClick={handleBurgerClick}
              to="/blogs"
              className={({ isActive }) => (isActive ? Style.active : "")}
            >
              Blogs
            </NavLink>*/}
            <NavLink
              onClick={handleBurgerClick}
              to="/inventory"
              className={({ isActive }) => (isActive ? Style.active : "")}
            >
              Car Inventory
            </NavLink>
            <NavLink
              onClick={handleBurgerClick}
              to="/services"
              className={({ isActive }) => (isActive ? Style.active : "")}
            >
              Services
            </NavLink>
            <NavLink
              onClick={handleBurgerClick}
              to="/contact"
              className={({ isActive }) => (isActive ? Style.active : "")}
            >
              Contact Us
            </NavLink>
            <NavLink
              onClick={handleBurgerClick}
              to="/tracking"
              className={({ isActive }) => (isActive ? Style.active : "")}
            >
              Tracking
            </NavLink>
          </ul>
        </div>
      </div>
      <main className={isSticky ? Style.padded : ""}>
        <Outlet />
        <div className={Style.wrapper}></div>
      </main>
      <div className={Style.footer}>
        <div className={Style.socialMedia}>
          <a
            href="https://www.facebook.com/profile.php?id=61552608263446"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              <img loading="lazy" src="/Icons/facebook.webp" alt="Facebook" />
              Goldstern
            </p>
          </a>
          <a
            href="https://www.instagram.com/goldstern_eg/"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              <img loading="lazy" src="/Icons/instagram.webp" alt="Instagram" />
              goldstern_eg
            </p>
          </a>
          <a
            href="https://www.tiktok.com/@goldstern.eg"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              <img loading="lazy" src="/Icons/tiktok.webp" alt="Tiktok" />
              goldstern.eg
            </p>
          </a>
          <a
            href="https://www.linkedin.com/company/103967635"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              <img loading="lazy" src="/Icons/LinkedIn.webp" alt="LinkedIn" />
              Goldstern
            </p>
          </a>
        </div>
        <div className={Style.lineBreak}></div>
        <p>&copy; Goldstern, All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Layout;
