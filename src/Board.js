import React from "react";
import Navi from "./Navi.js";

function Board() {
  return (
    <div className="board">
      <Navi />
      <div className="adLeft"></div>
      <div className="postList"></div>
      <div className="myInfo"></div>
    </div>
  );
}

export default Board;
