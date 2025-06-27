import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation(); // 👈 get current route

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // 👈 scroll to top on route change
  }, [location.pathname]); // 👈 trigger on pathname change

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100); // Adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="layout">
      <div className={`nav ${isSticky ? "sticky" : ""}`}>
        <div className="cont">
          <div className="burger-cont">
            <Link to="/">
              <img src="/Icons/Logo-black.webp" alt="Goldstern" />
            </Link>
            <div
              className={`burger ${isOpen ? "open" : ""}`}
              onClick={handleBurgerClick}
            >
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
            <NavLink onClick={handleBurgerClick} to="/tracking">
              Tracking
            </NavLink>
          </ul>
          <Link
            className={`login ${isOpen ? "open" : ""}`}
            onClick={handleBurgerClick}
            to="/"
          >
            User-Portal
          </Link>
        </div>
      </div>
      <main className={isSticky ? "padded" : ""}>
        <Outlet />
        <div className="wrapper"></div>
      </main>
      <div className="footer">
        <div className="social-media">
          <a
            href="https://www.facebook.com/profile.php?id=61552608263446"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              <img src="/Icons/facebook.webp" alt="Facebook" />
              Goldstern
            </p>
          </a>
          <a
            href="https://www.instagram.com/goldstern_eg/"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              <img src="/Icons/instagram.webp" alt="Instagram" />
              goldstern_eg
            </p>
          </a>
          <a
            href="https://www.tiktok.com/@goldstern.eg"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              <img src="/Icons/tiktok.webp" alt="Tiktok" />
              goldstern.eg
            </p>
          </a>
          <a
            href="https://www.linkedin.com/company/103967635"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              <img src="/Icons/LinkedIn.webp" alt="LinkedIn" />
              Goldstern
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
