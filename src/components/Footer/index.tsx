//?=== IMPORT CSS FILE ===?//
import "./index.css";
import brand from "../../assets/logo.png";
import { FaFacebook, FaTelegram, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-1">
            <Link to={"/"}>
              <img src={brand} alt="Brand" />
            </Link>
            <h5>Sign up for our newsletter</h5>
            <form className="newsletter">
              <input type="text" placeholder="Enter your email" />
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
            <div className="socials">
              <FaFacebook className="icon" />
              <FaYoutube className="icon" />
              <RiInstagramFill className="icon" />
              <FaTelegram className="icon" />
            </div>
          </div>
          <div className="col-2">
            <ul>
              <li className="menu_title">PRODUCTS</li>
              <li>Standalone</li>
              <li>Salesforce</li>
            </ul>
            <ul>
              <li className="menu_title">SOLUTIONS</li>
              <li>Solutions Overview</li>
              <li>Use Case - Subscription</li>
              <li>Use Case - Consumption</li>
            </ul>
            <ul>
              <li className="menu_title">COMPANY</li>
              <li>Careers</li>
              <li>About US</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <hr className="line" />
        <div className="copyright">
          <span>
            &copy;{new Date().getFullYear()} GST a UTF Fire & Security Company
          </span>
        </div>
      </div>
    </footer>
  );
}