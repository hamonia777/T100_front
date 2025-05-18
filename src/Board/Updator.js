// Write.js
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "./Updator.css";

function Updator() {
  const navigate = useNavigate();
  const location = useLocation();
  const { board } = location.state || {};
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/community/${board.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            community_id: board.id,
            title: title,
            content: content,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`보고서 수정 실패: ${response.status}`);
      }

      const data = await response.json();
      console.log("서버 응답:", data);

      if (data.success) {
        alert("게시글 수정 완료");
        navigate("/board");
      }
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  const handleCancel = () => {
    navigate("/board");
  };

  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setContent(board.content);
    }
  }, [board]);

  return (
    <div className="updator-wrapper">
      <div className="updator-container">
        <input
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="content-input">
          <ReactQuill
            className="quill-editor"
            value={content}
            onChange={setContent}
          />
        </div>
      </div>

      <div className="button-container">
        <button className="updateButton" onClick={handleSave}>
          수정하기
        </button>
        <button className="cancelButton" onClick={handleCancel}>
          취소하기
        </button>
      </div>
    </div>
  );
}

export default Updator;
