import React, { useEffect, useState } from "react";
import Navi from "./Navi.js";
import "./Main.css";

const Main = () => {
  const [reportData, setReportData] = useState(null); // 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    // 데이터 fetch
    const fetchReportData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/report");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReportData(data.data); // 필요한 데이터만 상태에 저장
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div className="BD">
      <Navi />
      <div className="Ma">
        <div className="Ai"></div>
        <div className="Sb">
          {error ? (
            <p>Error: {error}</p>
          ) : reportData ? (
            <h2>{reportData.title}</h2> // title 데이터를 Sb에 렌더링
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="Re">
          {error ? (
            <p>Error: {error}</p>
          ) : reportData ? (
            <p>{reportData.content}</p> // content 데이터를 Re에 렌더링
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="Uf"></div>
      </div>
    </div>
  );
};

export default Main;
