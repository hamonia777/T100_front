import React, { useEffect, useState } from "react";
import Navi from "./Navi.js";
import Loading from "./Loading.js";
import Ad from "./Ad.js";
import MyInfo from "./MyInfo.js";
import "./Main.css";

function editContent(data) {
  if (!data || !data.content) return data;

  let content = data.content;
  content = content.replace(/-/gi, ""); // '-'를 제거
  content = content.replace(/######\s?(.*)/g, "<h6>$1</h6>");
  content = content.replace(/#####\s?(.*)/g, "<h5>$1</h5>");
  content = content.replace(/####\s?(.*)/g, "<h4>$1</h4>"); // '####'를 <h4> 태그로 변환
  content = content.replace(/###\s?(.*)/g, "<h3>$1</h3>"); // 숫자 많은거부터 하는 이유는 작은거부터하면 ##나 ###나 겹쳐서 전부 커짐
  content = content.replace(/##\s?(.*)/g, "<h2>$1</h2>");
  content = content.replace(/#\s?(.*)/g, "<h1>$1</h1>");

  content = content.replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>"); // '**'를 <strong> 태그로 변환
  data.content = content;
  return data;
}

const Main = () => {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        //await fetch("http://localhost:8080/api/crawl"); //크롤링 api
        //await fetch("http://localhost:8080/api/chat"); //보고서 생성 api

        const response = await fetch("http://localhost:8080/api/report"); //보고서 확인 api
        if (!response.ok) {
          throw new Error(`Chat API error! status: ${response.status}`);
        }
        const data = await response.json(); //보고서 내용 받아오기

        // 데이터가 제대로 들어왔을 때만 상태 업데이트 함!
        if (data && data.data) {
          const editedData = editContent(data.data);
          setReportData(editedData); //보고서 내용 저장
          setLoading(false); //loading 그만
        } else {
          throw new Error("No data received");
        }
      } catch (err) {
        setError(`데이터 불러오기 실패: ${err.message}`);
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div className="report-page">
      <div className="report-navBar">
        <Navi />
      </div>

      {loading && <Loading />}

      <div className="report-ad">
        <Ad />
      </div>
      <div className="report-myInfo">
        <MyInfo />
      </div>

      <div className="report-container">
        <div className="report-title">
          {error ? (
            <p>Error: {error}</p>
          ) : reportData ? (
            <h2 id="title">{reportData.title}</h2>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="report-content-container">
          {error ? (
            <p>Error: {error}</p>
          ) : reportData ? (
            <div
              className="report-content"
              dangerouslySetInnerHTML={{ __html: reportData.content }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
