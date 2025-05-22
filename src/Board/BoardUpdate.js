import { useLocation } from "react-router-dom";
import Updator from "./Updator";
import Navi from "../Navi.js";
import Ad from "../Ad.js";
import MyInfo from "../MyInfo.js";
import "./BoardUpdate.css";

const BoardUpdate = () => {
  const location = useLocation();
  const { board } = location.state || {};

  return (
    <div>
      <div className="board-update-container">
        <div className="board-update-navBar">
          <Navi />
        </div>

        <div className="board-update-ad">
          <Ad />
        </div>

        <div className="board-update-myInfo">
          <MyInfo />
        </div>

        <div className="board-update-content">
          <Updator state={{ board }} />
        </div>
      </div>
    </div>
  );
};

export default BoardUpdate;
