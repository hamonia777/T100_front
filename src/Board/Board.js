import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navi from "../Navi.js";
import Ad from "../Ad.js";
import MyInfo from "../MyInfo.js";
import "./Board.css";

function modifyBoardList(board) {
  const formattedData = board.map((item) => ({
    id: item.community_id,
    title: item.title,
    author: item.nick,
    createdAt: item.created_at.split("T")[0],
    content: item.content.replace(/<\/?[^>]+(>|$)/g, ""),
  }));
  return formattedData;
}

const Board = ({ onClickTitle }) => {
  const [boardList, setBoardList] = useState([]);

  const fetchBoardList = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/community/allcommunity",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Report fetch 실패: ${response.status}`);
      }

      const formattedData = modifyBoardList(data.data);
      setBoardList(formattedData);
      console.log(boardList);
    } catch (error) {
      console.error("게시글 목록 불러오기 실패:", error);
    }
  };

  const BoardDetailInfo = (board) => {
    onClickTitle(board);
  };

  useEffect(() => {
    fetchBoardList();
  }, []);

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
              {boardList
                .map((board) => (
                  <li key={board.id} className="board-post-item">
                    <Link to="/boarddetail" state={{ board }}>
                      {board.title}
                    </Link>

                    <span>작성자: {board.author}</span>
                    <span style={{ fontSize: "12px", color: "gray" }}>
                      | 작성 일자: {board.createdAt}
                    </span>
                  </li>
                ))
                .reverse()}
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
