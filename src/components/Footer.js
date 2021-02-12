import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      <div id="signature">
        <span>Made with </span>
        <span>❤️</span>
        <span> & </span>
        <span>☕</span>
        <span> by </span>
        <a id="github-link" href="https://github.com/arndzk" target="blank">
          arndzk
        </a>
      </div>
    </div>
  );
};

export default Footer;
