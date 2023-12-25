import React, { useState } from "react";

function Card({ card, handleClick, flipped, disabled }) {
  return (
    <div
      onClick={() => (!disabled ? handleClick(card) : null)}
      className={`card ${disabled && !flipped ? "disabled" : ""} ${
        flipped ? "NotHover" : ""
      }`}
    >
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="image" className="front-card" />
        <img
          src="/assets/images/card_background.jpg"
          alt="background"
          className="back-card"
        />
      </div>
    </div>
  );
}

export default Card;
