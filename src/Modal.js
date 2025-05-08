import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ open, close, onRateSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (star) => {
    setRating(star);
  };

  const handleClose = () => {
    onRateSubmit(rating); // ReportContainer에 선택된 평점 전달
    close(); // 모달 닫음
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
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      fontSize: "2rem",
                      cursor: "pointer",
                      color: star <= (hover || rating) ? "#FFD700" : "#ccc",
                      transition: "color 0.2s",
                    }}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                {rating > 0
                  ? `현재 평점: ${rating} / 5`
                  : "별점을 선택해주세요!"}
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
