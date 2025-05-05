import React, { useEffect, useState } from "react";
import Modal from "./Modal.js";
import Loading from "./Loading";

//보고서 내용 편집
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

// 카테고리별 API 매핑
const apiMap = {
  "종합 보고서": ["crawl", "chat", "report", "Date"],
  "비즈니스 및 금융 트렌드 보고서": [
    "BandfCrawl",
    "bandfChat",
    "bandfReport",
    "bandfDate",
  ],
  "엔터테인먼트 트렌드 보고서": [
    "EnterCrawl",
    "enterChat",
    "enterReport",
    "enterDate",
  ],
  "법률 및 정부 트렌드 보고서": [
    "LandgCrawl",
    "landgChat",
    "landgReport",
    "landgDate",
  ],
  "스포츠 트렌드 보고서": [
    "SportsCrawl",
    "sportsChat",
    "sportsReport",
    "sportsDate",
  ],
  "기타 트렌드 보고서": ["OtherCrawl", "otherChat", "otherReport", "otherDate"],
};

function validateDate(today, targetDate) {
  const diffInMs = Math.abs(today - targetDate);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays <= 7; // 7일 이내인지 확인
}

//보고서 평가하기
function showRate() {}

const ReportContainer = ({ category }) => {
  const [reportData, setReportData] = useState({}); //카테고리별 저장
  const [currentReport, setCurrentReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [star, setStar] = useState(0);

  //오늘 날짜 출력
  const today = new Date();
  const dateToday = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate()}`;
  let date;

  //모달창 열기 닫기
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //보고서 평점 값
  const handleRatingSubmit = (value) => {
    setStar(value);
    console.log(`ReportContainer에서 받은 평점: ${value}`);
  };

  const fetchReportData = async () => {
    const [crawlApi, chatApi, reportApi, dateApi] = apiMap[category] || [];

    const dateData = await fetch(`http://localhost:8080/api/${dateApi}`);
    date = await dateData.text();

    if (!crawlApi || !chatApi || !reportApi) {
      setError("잘못된 카테고리입니다.");
      return;
    }

    try {
      setLoading(true);
      //await fetch(`http://localhost:8080/api/${crawlApi}`);
      //await fetch(`http://localhost:8080/api/${chatApi}`);

      const response = await fetch(`http://localhost:8080/api/${reportApi}`);
      if (!response.ok) {
        throw new Error(`Report fetch 실패: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.data) {
        const editedData = editContent(data.data);

        setReportData((prev) => ({
          ...prev,
          [category]: editedData, //해당 카테고리의 보고서 저장
        }));

        setCurrentReport(editedData);
      } else {
        throw new Error("받은 데이터가 없습니다.");
      }
    } catch (err) {
      setError(`에러 발생: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  //보고서 유무 확인
  useEffect(() => {
    if (!category) return;
    //console.log(today, reportData[category]);
    // 먼저 저장된 게 있는지 확인
    if (
      reportData[category]
      //&& validateDate(today, reportData[category].date)
    ) {
      setCurrentReport(reportData[category]);
      setLoading(false);
      console.log("보고서 이미 있음");
    } else {
      console.log("보고서 없음");
      fetchReportData();
    }
  }, [category]);

  //보고서 가져오기 유무 확인인
  useEffect(() => {
    if (!category) return;
    if (reportData[category]) {
      setCurrentReport(reportData[category]);
      setLoading(false);
    } else {
      fetchReportData();
    }
  }, [category]);

  // 스크롤바가 맨 밑에 닿으면 점수 평가 모달창 띄움
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      if (scrolledToBottom) {
        setModalOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      {loading && <Loading />}

      <div className="report-container">
        <div className="report-title">
          {error ? (
            <p>Error: {error}</p>
          ) : reportData[category] ? (
            <h2 id="title" onClick={openModal}>
              {reportData[category].title}
            </h2>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="report-content-container">
          {error ? (
            <p>Error: {error}</p>
          ) : reportData[category] ? (
            <div
              className="report-content"
              dangerouslySetInnerHTML={{ __html: reportData[category].content }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {!loading && !error ? showRate() : null}
        <Modal
          open={modalOpen}
          close={closeModal}
          onRateSubmit={handleRatingSubmit}
        />
      </div>
    </div>
  );
};

export default ReportContainer;
