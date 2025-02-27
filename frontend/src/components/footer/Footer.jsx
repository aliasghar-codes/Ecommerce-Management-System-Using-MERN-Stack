import React from 'react'
import "./Footer.css"
import { GrInstagram } from "react-icons/gr";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { RiTwitterXFill, RiLinkedinFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="footer-content container">
                <div className="footer-one">
                    <h3>Subscribe</h3>
                    <a>Get 10% off on your first order</a>
                </div>
                <div className="footer-two">
                    <h3>Support</h3>
                    <div className="links">
                        <a>aliasgharbhatti30@gmail.com</a>
                        <a>+92310-3852-656</a>
                    </div>
                </div>
                <div className="footer-three">
                    <h3>Account</h3>
                    <div className="links">
                        <Link to="/login">Login / Register</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/products/category/a">Shop</Link>
                    </div>
                </div>
                <div className="footer-four">
                    <h3>Quick Link</h3>
                    <div className="links">
                        <a>Privacy Policy</a>
                        <a>Terms Of Use</a>
                        <a>FAQ</a>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>
                <div className="footer-five">
                    <h3>Follow Us On</h3>
                    <div className="footer-icons">
                        <div>
                            <a href="https://www.facebook.com" target='_blank'>
                                <BiLogoFacebookSquare />
                            </a>
                            <a href="https://www.x.com" target='_blank'>
                                <RiTwitterXFill />
                            </a>
                        </div>
                        <div>
                            <a href="https://www.instagram.com" target='_blank'>
                                <GrInstagram />
                            </a>
                            <a href="https://www.linkedin.com" target='_blank'>
                                <RiLinkedinFill />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <p>&copy; Copyright Ali_Asghar {year}. All rights reserved</p>
        </footer>
    )
}

export default Footer