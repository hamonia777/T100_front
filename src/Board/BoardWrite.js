import React from "react";
import Navi from "../Navi.js";
import Ad from "../Ad.js";
import MyInfo from "../MyInfo.js";
import "./BoardWrite.css";

function BoardWrite() {
  return (
    <div className="board">
      <div className="board-nav">
        <Navi />
      </div>

      <div className="board-ad">
        <Ad />
      </div>
      <div className="board-myInfo">
        <MyInfo />
      </div>

      <div className="board-write">
        <h3>WTF</h3>
      </div>
    </div>
  );
}

export default BoardWrite;
