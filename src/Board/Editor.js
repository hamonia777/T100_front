// Write.js
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css"; // CSS 따로 분리해서 import

const Editor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/community", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      const data = await response.json();
      console.log("서버 응답:", data);

      navigate("/board");
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    navigate("/board");
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <input
          className="title-input"
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="content-input">
          <ReactQuill
            className="quill-editor"
            placeholder="내용을 입력해 주세요"
            value={content}
            onChange={setContent}
          />
        </div>
      </div>

      <div className="write-button-container">
        <button className="submitButton" onClick={handleSave}>
          저장하기
        </button>
        <button className="cancelButton" onClick={handleCancel}>
          취소하기
        </button>
      </div>
    </div>
  );
};

export default Editor;
