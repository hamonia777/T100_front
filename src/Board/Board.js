import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
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
    content: item.content,
  }));
  return formattedData;
}

const Board = ({ onClickTitle }) => {
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

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

  useEffect(() => {
    fetchBoardList();
  }, []);

  // ✨ return() 바로 위에 위치시켜주세요
  const itemsCountPerPage = 5;
  const startIndex = (page - 1) * itemsCountPerPage;
  const endIndex = startIndex + itemsCountPerPage;
  const currentPageData = boardList
    .slice()
    .reverse()
    .slice(startIndex, endIndex);

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
              {currentPageData.map((board) => (
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

        <div className="board-pagination">
          <Pagination
            activePage={page} // 현재 페이지
            itemsCountPerPage={itemsCountPerPage} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={boardList.length} // 총 아이템 갯수
            pageRangeDisplayed={5} // paginator의 페이지 범위
            prevPageText={"‹"} // "이전"을 나타낼 텍스트
            nextPageText={"›"} // "다음"을 나타낼 텍스트
            onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
          />
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
