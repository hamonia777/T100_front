import { Link } from "react-router-dom";
import React from "react";
import Navi from "../Navi.js";
import Ad from "../Ad.js";
import MyInfo from "../MyInfo.js";
import "./Board.css";

const boardList = [
  {
    id: 1,
    title: "첫 번째 게시글",
    author: "홍길동",
    createdAt: "2025-04-07",
    content:
      "이것은 첫 번째 게시글의 내용입니다. 여기에 다양한 내용이 들어갑니다.",
  },
  {
    id: 2,
    title: "두 번째 게시글",
    author: "김철수",
    createdAt: "2025-04-06",
    content:
      "두 번째 게시글 내용입니다. 이곳에는 다른 정보들이 포함될 수 있습니다.",
  },
  {
    id: 3,
    title: "세 번째 게시글",
    author: "이영희",
    createdAt: "2025-04-05",
    content: "세 번째 게시글입니다. 여기에 대해 더 많은 내용이 있습니다.",
  },
  {
    id: 4,
    title: "네 번째 게시글",
    author: "박지민",
    createdAt: "2025-04-04",
    content: "네 번째 게시글입니다. 이 글은 더 긴 내용을 포함할 수 있습니다.",
  },
  {
    id: 5,
    title: "다섯 번째 게시글",
    author: "최민수",
    createdAt: "2025-04-03",
    content:
      "다섯 번째 게시글 내용입니다. 여기에 다양한 정보를 넣을 수 있습니다.",
  },
];

const Board = ({ onClickTitle }) => {
  const BoardDetailInfo = (board) => {
    onClickTitle(board);
  };

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
        <h3 id="board-title">게시판</h3>
        <div className="board-postList">
          <div>
            <ul>
              {boardList.map((board) => (
                <li key={board.id} className="board-post-item">
                  <Link to="/boarddetail" state={{ board }}>
                    {board.title}
                  </Link>

                  <span>작성자: {board.author}</span>
                  <span style={{ fontSize: "12px", color: "gray" }}>
                    | 작성 일자: {board.createdAt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="board-Write-button">
          <Link to="/boardwrite">
            <button id="write-button">작성하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Board;
