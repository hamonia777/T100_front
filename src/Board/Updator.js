// Write.js
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./Updator.css";

function Updator() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { board } = location.state || {};

  const handleSave = () => {
    console.log("제목:", subject);
    console.log("내용:", content);
  };

  const handleCancel = () => {
    setSubject("");
    setContent("");
    navigate("/board");
  };

  return (
    <div className="updator-wrapper">
      <div className="updator-container">
        <input
          className="title-input"
          value={board.title}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div className="content-input">
          <ReactQuill
            className="quill-editor"
            value={board.content}
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
