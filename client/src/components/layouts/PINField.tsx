import React from 'react';
import rightArrow from '../../assets/right-arrow.svg';
import '../../css/landing/pin-field.css';

const PINField: React.FC = () => {
  return (
    <div id="pin-field">
      <form className="enter-pin-field">
        <input id="pin" type="type" placeholder="Enter PIN to join"></input>
      </form>
      <button className="enter-arrow-btn">
        <img src={rightArrow} className="right-arrow" />
      </button>
    </div>
  );
};

export default PINField;
