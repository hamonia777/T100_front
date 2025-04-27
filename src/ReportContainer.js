import React, { useEffect, useState } from "react";
import Loading from "./Loading";

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

const ReportContainer = ({ category }) => {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    "종합 보고서",
    "비즈니스 및 금융 트렌드 보고서",
    "엔터테인먼트 트렌드 보고서",
    "법률 및 정부 트렌드 보고서",
    "스포츠 트렌드 보고서",
    "기타 트렌드 보고서",
  ];

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        // 카테고리에 따라 다른 API 호출
        // if (category === categories[0]) {
        //   //종합
        //   console.log(category);
        //   await fetch("http://localhost:8080/api/crawl");
        //   await fetch("http://localhost:8080/api/chat");
        // } else if (category === categories[1]) {
        //   //비즈니스 및 금융 트렌드
        //   console.log(category);
        //   setReportData();
        //   setLoading(true);
        //   await fetch("http://localhost:8080/api/BandfCrawl");
        //   await fetch("http://localhost:8080/api/bandfChat");
        // } else if (category === categories[2]) {
        //   //엔터테인먼트 트렌드
        //   console.log(category);
        //   await fetch("http://localhost:8080/api/EnterCrawl");
        //   await fetch("http://localhost:8080/api/enterChat");
        // } else if (category === categories[3]) {
        //   //법률 및 정부 트렌드
        //   console.log(category);
        //   await fetch("http://localhost:8080/api/LandgCrawl");
        //   await fetch("http://localhost:8080/api/landgChat");
        // } else if (category === categories[4]) {
        //   //스포츠 트렌드
        //   console.log(category);
        //   await fetch("http://localhost:8080/api/SportsCrawl");
        //   await fetch("http://localhost:8080/api/sportsChat");
        // } else if (category === categories[5]) {
        //   //기타 트렌드
        //   console.log(category);
        //   await fetch("http://localhost:8080/api/OtherCrawl");
        //   await fetch("http://localhost:8080/api/otherChat");
        // }

        //const data = await response.json(); //보고서 내용 받아오기
        const response = await fetch("http://localhost:8080/api/bandfReport"); //보고서 확인 api
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
    <div>
      {loading && <Loading />}

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

export default ReportContainer;
