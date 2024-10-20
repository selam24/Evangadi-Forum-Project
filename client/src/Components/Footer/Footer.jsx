import React from "react";
import classes from "./footer.module.css"; // Modular CSS import
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome import
import footerLogo from "../../assets/img/footlogo.png";
import { Link } from "react-router-dom";
// import evalogo from "../../assets/img/EvangadiLogo.png"
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.logoSection}>
        {/* Insert logo */}
        <Link to="/">
          <img src={footerLogo} />
        </Link>
        <div className={classes.socialIcons}>
          <Link
            to="https://www.facebook.com/evangaditech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </Link>
          <Link
            to="https://www.instagram.com/evangaditech/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </Link>
          <Link
            to="https://www.youtube.com/@EvangadiTech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube"></i>
          </Link>
        </div>
      </div>

      <div className={classes.usefulLinks}>
        <h4>Useful Link</h4>
        <ul>
          <li>
            <Link to="/how-it-works">How it works </Link>
          </li>
          <li>
            <Link to="https://www.evangadi.com/legal/terms/" target="_blank">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="https://www.evangadi.com/legal/privacy/" target="_blank">
              Privacy policy
            </Link>
          </li>
        </ul>
      </div>

      <div className={classes.contactInfo}>
        <h4>Contact Info</h4>
        <p>Evangadi Networks</p>
        <p>
          <Link to="mailto:support@evangadi.com">support@evangadi.com</Link>
        </p>
        <p>
          <Link to="tel:+12023862702">+1-202-386-2702</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
