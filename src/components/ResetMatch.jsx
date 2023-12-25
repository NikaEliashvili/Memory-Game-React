import React from "react";
import Confetti from "react-confetti";
import { SlReload } from "react-icons/sl";
function ResetMatch({ resetGame }) {
  return (
    <>
      <Confetti />
      <div className="reset-container">
        <div className="reset-div">
          <h1>You Won!</h1>
          <button onClick={resetGame}>
            Play again <SlReload className="icon" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetMatch;
