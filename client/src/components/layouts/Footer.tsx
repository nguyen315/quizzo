import React from 'react';
import '../../css/landing/decorated-footer.css';

const Footer: React.FC = () => {
  return (
    <div id="decorator-container">
      <div id="green-card" className="card"></div>
      <div id="red-card" className="card">
        <div className="hurray-info-card">\( ﾟヮﾟ)/</div>
      </div>
      <div id="orange-card" className="card">
        <div className="orange-info-card">
          made by <br /> Homebrew crew 🍻
        </div>
      </div>
      <div id="blue-card" className="card">
        <div className="blue-info-card">
          an 2021 <br />
          Cybozu internship
        </div>
      </div>
    </div>
  );
};

export default Footer;
