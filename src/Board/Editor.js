import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
//import { Button } from "react-bootstrap";
import React from "react";

function Write() {
  return (
    <div>
      <div style={{ width: "65%", height: "90vh" }}>
        <div style={{ width: "1000px", margin: "auto", borderRadius: "10px" }}>
          {/* ======== Subject ======== */}

          <input
            className="Subject"
            placeholder="제목을 입력해 주세요"
            style={{
              padding: "7px",
              width: "65%",
              fontSize: "15px",
            }}
          ></input>

          <div style={{ height: "650px" }}>
            {/* ======== Quill ======== */}

            <ReactQuill
              placeholder="내용을 입력해 주세요"
              style={{ width: "65%" }}
            />
          </div>

          {/* ======== Button ======== */}

          <div style={{ float: "right" }}>
            <button variant="dark"> 저장하기</button>
            <button variant="danger" style={{ marginLeft: "10px" }}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Write;
