import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Twitter, Github, Discord } from 'react-bootstrap-icons';

const FooterCol = ({ title, items }) => (
  <div className="footer-column">
    <h3>{title}</h3>
    <hr />
    {items.map(({ name, to }, index) => {
      if (to) {
        return (
          <NavLink key={index} to={to}>
            {name}
          </NavLink>
        );
      }
      return <span key={index}>{name}</span>;
    })}
  </div>
);

FooterCol.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      to: PropTypes.string,
    }),
  ).isRequired,
};

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer>
    <div className="footer-columns">
      <FooterCol
        title="Manoa Link"
        items={[
          { name: 'Blog', to: 'https://uhmanoalink.github.io' },
          { name: 'About Us', to: 'https://uhmanoalink.github.io/about-us' },
          { name: 'FAQ', to: 'https://uhmanoalink.github.io/faq' },
        ]}
      />
      <FooterCol
        title="Sitemap"
        items={[
          { name: 'Register Now', to: '/register' },
          { name: 'Dashboard', to: '/dashboard' },
          { name: 'Your Profile', to: '/profile' },
          { name: 'Help', to: '/help' },
        ]}
      />
      <div className="align-right">
        <FooterCol
          title="Contact"
          items={[
            { name: '1680 East-West Road Honolulu, HI 96822' },
            { name: 'Office: 808.956.7420' },
            { name: 'Fax: 808.956.3548' },
            { name: 'Email: icsinfo@hawaii.edu' },
          ]}
        />
      </div>
    </div>
    <hr />
    <div className="footer-bottom">
      <div>
        <span>Copyright © 2023 ManoaLink</span>
        <a href="/">Privacy Policy</a>
        <a href="/">Terms of Service</a>
      </div>
      <div>
        <a href="/" className="footer-icon">
          <Twitter width={24} height={24} />
        </a>
        <a href="/" className="footer-icon">
          <Github width={24} height={24} />
        </a>
        <a href="/" className="footer-icon">
          <Discord width={24} height={24} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
