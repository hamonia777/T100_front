import React, { useState } from "react";
import Navi from "./Navi.js";
import Ad from "./Ad.js";
import MyInfo from "./MyInfo.js";
import ReportContainer from "./ReportContainer.js";
import "./Main.css";

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); //선택된 버튼 인덱스

  const categories = [
    "종합 보고서",
    "비즈니스 및 금융 트렌드 보고서",
    "엔터테인먼트 트렌드 보고서",
    "법률 및 정부 트렌드 보고서",
    "스포츠 트렌드 보고서",
    "기타 트렌드 보고서",
  ];

  const handleButtonClick = (category, index) => {
    setSelectedCategory(category); // 어떤 카테고리 눌렀는지 저장
    setSelectedIndex(index);
  };

  const hasVisited = sessionStorage.getItem("hasVisited");
  if (!hasVisited) {
    console.log("hasNotVisited");
    sessionStorage.setItem("hasVisited", "true");
  } else {
    console.log("hasVisited");
  }

  return (
    <div className="report-page">
      <div className="report-navBar">
        <Navi />
      </div>

      <div className="report-ad">
        <Ad />
      </div>
      <div className="report-myInfo">
        <MyInfo />
      </div>

      <div className="report-category-list-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            className={selectedIndex === index ? "selected" : ""}
            onClick={() => handleButtonClick(category, index)}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="report-page">
          <ReportContainer category={selectedCategory} />
        </div>
      )}
    </div>
  );
};

export default Main;
