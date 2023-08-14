import './header.css';
import React from 'react';

const chromeWebStoreLink =
  'https://chrome.google.com/webstore/detail/reportj/hijbdbjoelgicnhnghhhlkpbhjdmchfg';

const Header: React.FC = () => (
  <header className="header">
    <img className="header__logo" src="../logo48.png" alt="ReportJ" />
    <h2 className="header__title">ReportJ</h2>
    <a className="header__link" target="__blank" href={chromeWebStoreLink}>
      View in store
    </a>
  </header>
);

export default Header;
