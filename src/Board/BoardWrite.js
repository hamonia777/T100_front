import React from "react";
import Navi from "../Navi.js";
import MyInfo from "../MyInfo.js";
import Ad from "../Ad.js";
import Write from "./Editor.js";
import "./BoardWrite.css";

function BoardWrite() {
  return (
    <div className="board-write">
      <div className="board-nav">
        <Navi />
      </div>

      <div className="board-write-ad">
        <Ad />
      </div>

      <div className="board-write-myInfo">
        <MyInfo />
      </div>

      <div className="board-write-container">
        <div className="board-write-content">
          <Write />
        </div>
      </div>
    </div>
  );
}

export default BoardWrite;
