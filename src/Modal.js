import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";

const Modal = ({ open, close, onRateSubmit }) => {
  const [rating, setRating] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const [selected, setSelected] = useState(0);
  const [ratecontent, setRatecontent] = useState("");

  const handleClick = (e) => {
    setSelected(e.target.value);
    setRating(e.target.value);
  };

  const handleClose = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/eval", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: +rating, //점수가 string이기 때문에 +를 붙여서 number로 변환
          content: ratecontent,
        }),
      });

      if (!response.ok) {
        throw new Error(`평가 요청 실패: ${response.status}`);
      }

      const data = await response.json();
      console.log("평가 성공:", data);
      close(); // 모달 닫기
    } catch (error) {
      console.error("평가 실패:", error);
    }
  };

  const handleContent = (e) => {
    setRatecontent(e.target.value);
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <h3>보고서는 어떠셨나요?</h3>
            <button className="close" onClick={handleClose}>
              &times;
            </button>
          </header>

          <main>
            <div className="main-div">
              <div className="dropdown-contianer">
                <div className="rate-score-container">
                  <span
                    className="rate-dropdown-title"
                    onClick={(e) => {
                      setDropdown(!dropdown);
                      e.stopPropagation();
                    }}
                  >
                    점수를 매겨주세요!
                  </span>

                  <select
                    className="rate-dropdown-items"
                    value={selected}
                    onChange={handleClick}
                  >
                    <option value="0">0점</option>
                    <option value="1">1점</option>
                    <option value="2">2점</option>
                    <option value="3">3점</option>
                    <option value="4">4점</option>
                    <option value="5">5점</option>
                  </select>
                </div>

                <div className="rate-content-container">
                  <textarea
                    className="rate-textarea"
                    placeholder="리뷰를 작성해주세요!"
                    value={ratecontent}
                    onChange={handleContent}
                  ></textarea>
                </div>
              </div>
            </div>
          </main>

          <footer>
            <button className="close" onClick={handleClose}>
              닫기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
