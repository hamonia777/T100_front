// Write.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css"; // CSS 따로 분리해서 import

function Write() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    console.log("제목:", subject);
    console.log("내용:", content);
  };

  const handleCancel = () => {
    setSubject("");
    setContent("");
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <input
          className="title-input"
          placeholder="제목을 입력해 주세요"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
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

      <div className="button-container">
        <button className="submitButton" onClick={handleSave}>
          저장하기
        </button>
        <button className="cancelButton" onClick={handleCancel}>
          취소하기
        </button>
      </div>
    </div>
  );
}

export default Write;
