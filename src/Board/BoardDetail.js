import { useLocation } from "react-router-dom";
import Navi from "../Navi";
import Ad from "../Ad";
import MyInfo from "../MyInfo";
import "../Board/BoardDetail.css";

const BoardDetail = () => {
  const location = useLocation();
  const { board } = location.state || {};

  return (
    <div className="board-detail-page">
      <div className="board-detail-navBar">
        <Navi />
      </div>

      <div className="board-detail-ad">
        <Ad />
      </div>
      <div className="board-detail-myInfo">
        <MyInfo />
      </div>

      <div className="board-detail-container">
        <div className="board-detail-info">
          <div className="board-detail-title">
            제목 : {board.title}
            <p className="board-detail-author">작성자 : {board.author}</p>
            <p className="board-detail-date">작성일 : {board.createdAt}</p>
            <hr />
          </div>
          <div className="board-detail-content">{board.content}</div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
