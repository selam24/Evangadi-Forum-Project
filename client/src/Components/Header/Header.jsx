import React, { useContext, useEffect, useState } from "react";
import classes from "./header.module.css";
import evangadiLogo from "../../assets/img/EvangadiLogo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    // Check if user is authenticated by looking for a token in localStorage

    setIsAuthenticated(!!token);
  }, [token]);
  return (
    <header className={classes.header}>
      {/* Logo */}
      <div className={classes.header__logo}>
        <Link to="/">
          <img src={evangadiLogo} alt="Evangadi Logo" />
        </Link>
      </div>
      {/* Menu icon for mobile */}
      <div className={classes.header__menu_icon} onClick={toggleSidebar}>
        <AiOutlineMenu />
      </div>
      <div className={classes.header__right}>
        {/* Navigation Links */}
        <nav className={classes.header__nav}>
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How it works</Link>
        </nav>

        {/* Sign-in Button */}
        {isAuthenticated ? (
          <button className={classes.header__signin} onClick={signOut}>
            SIGN OUT
          </button>
        ) : (
          <button className={classes.header__signin}>
            SIGN IN
          </button>
        )}
      </div>
      {/* Sidebar for mobile */}
      {isSidebarOpen && (
        <div className={classes.header__sidebar}>
          <span className={classes.header__close_icon} onClick={toggleSidebar}>
            {/* Close (X) icon */}
            <IoMdClose />
          </span>
          <nav className={classes.header__nav}>
            <a href="/" onClick={toggleSidebar}>
              Home
            </a>
            <a href="/how-it-works" onClick={toggleSidebar}>
              How it works
            </a>
          </nav>
          {isAuthenticated ? (
            <button className={classes.header__signin} onClick={signOut}>
              SIGN OUT
            </button>
          ) : (
            <button className={classes.header__signin} onClick={signOut}>
              SIGN IN
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
