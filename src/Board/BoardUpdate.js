import { useLocation } from "react-router-dom";
import Updator from "./Updator";
import Navi from "../Navi";
import Ad from "../Ad";
import MyInfo from "../MyInfo";
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
