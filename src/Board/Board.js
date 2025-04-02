import React from "react";
import Navi from "../Navi.js";
import Ad from "../Ad.js";
import MyInfo from "../MyInfo.js";
import "./Board.css";

function Board() {
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

      <div className="board-container">
        <div className="board-Write-button">
          <button id="write-button">글쓰기</button>
        </div>
        <div className="board-postList">
          <h3>Board</h3>
        </div>
      </div>
    </div>
  );
}

export default Board;
