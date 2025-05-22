import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navi from "../Navi.js";
import Ad from "../Ad.js";
import MyInfo from "../MyInfo.js";
import "../Board/BoardDetail.css";

// JWT 디코딩
function parseJwt(token) {
  const payload = token.split(".")[1];
  const decoded = atob(payload); // Base64 디코딩
  return JSON.parse(decoded);
}

const BoardDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { board } = location.state || {};
  const [input, setInput] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editInput, setEditInput] = useState("");

  //수정하기, 삭제하기 버튼 선택적으로 보여주기 위해 cookie의 정보를 확인해서 작성자와 비교
  const showUpdateAndDeleteButton = () => {
    const raw = document.cookie.split("=")[1];
    const decodeCookie = parseJwt(raw);
    //console.log("raw :", raw, "\ndecodeCookie :", decodeCookie);
    //console.log("board : ", board.author);
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.comment_id);
    setEditInput(comment.content);
  };

  //게시글 삭제하기
  const deletePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/community/${board.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            community_id: board.id,
          }),
        }
      );

      const data = await response.json();
      console.log("서버 응답:", data);

      if (data.success) {
        alert("게시글 삭제 완료");
        navigate("/board");
      }
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  // 댓글 추가하기
  const addComment = async () => {
    // console.log(input, typeof input, typeof board.id, typeof new Date().toISOString().split("T")[0]);
    try {
      const response = await fetch(
        `http://localhost:8080/api/community/${board.id}/comment`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: input,
            mail: board.author, //내 nick을 써야하는데 토큰에 문제 있음. 일단은 게시글 작성자의 nick으로 전송함
            community_id: board.id,
          }),
        }
      );

      const data = await response.json();
      //console.log("서버 응답:", data);
      setInput("");
      fetchComment();

      if (data.success) {
        console.log("댓글 저장 완료");
      }
    } catch (error) {
      console.error("댓글 저장 실패:", error);
    }
  };

  // 댓글 불러오기
  const fetchComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/community/${board.id}/comment`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      //console.log("서버 응답:", data);
      setCommentList(data.data);
      //console.log("댓글 목록:", data.data);

      if (data.success) {
        console.log("댓글 불러오기 완료");
      }
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  //댓글 수정하기
  const updateComment = async (comment) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/community/${board.id}/${editingCommentId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment_id: editingCommentId,
            community_id: board.id,
            content: editInput,
            nick: comment.nick,
            mail: board.author,
            createdAt: comment.created_at,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        console.log("댓글 수정 완료");
        setEditingCommentId(null);
        setEditInput("");
        fetchComment();
      }
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  //댓글 삭제하기
  const deleteComment = async (cmtId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/community/${board.id}/${cmtId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment_id: cmtId,
          }),
        }
      );

      const data = await response.json();
      console.log("서버 응답:", data);
      fetchComment();
      //console.log("댓글 목록:", data.data);

      if (data.success) {
        console.log("댓글 삭제 완료");
      }
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div className="board-detail-page">
      {showUpdateAndDeleteButton()}
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
          <div
            className="board-detail-content"
            dangerouslySetInnerHTML={{ __html: board.content }}
          ></div>
        </div>

        <div className="board-detail-button-container">
          <button className="updateButton">
            <Link to="/boardupdate" className="updateButton" state={{ board }}>
              {" "}
              수정하기{" "}
            </Link>
          </button>
          <button className="deleteButton" onClick={deletePost}>
            삭제하기
          </button>
        </div>
      </div>

      <div className="board-detail-comment-container">
        <div className="input-comment">
          <input
            type="text"
            placeholder="댓글 달기..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? addComment() : null)}
          />
          <button className="btn-submit" onClick={addComment}>
            게시
          </button>
        </div>
        <div className="comment-list">
          <ul>
            {commentList.map((comment) => (
              <li key={comment.comment_id} className="comment-item">
                <span>{comment.nick}</span>
                <span>{comment.created_at}</span>

                {editingCommentId === comment.comment_id ? (
                  <div>
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                    />
                    <button
                      className="comment-updating-btn"
                      onClick={() => updateComment(comment)}
                    >
                      저장
                    </button>
                    <button
                      className="comment-cancel-btn"
                      onClick={() => setEditingCommentId(null)}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <>
                    <p>{comment.content}</p>
                    <div className="comment-actions">
                      <button
                        className="comment-update-btn"
                        onClick={() => handleEditClick(comment)}
                      >
                        수정
                      </button>
                      <button
                        className="comment-delete-btn"
                        onClick={() => deleteComment(comment.comment_id)}
                      >
                        삭제
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
