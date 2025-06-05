import React, { useState } from "react";
import Navi from "./Navi.js";
import MyInfo from "./MyInfo.js";
import ReportContainer from "./ReportContainer.js";
import Loading from "./Loading";
import "./Main.css";

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); //선택된 버튼 인덱스
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="report-page">
      {loading && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}
      <div className="report-navBar">
        <Navi />
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
          <ReportContainer
            category={selectedCategory}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
