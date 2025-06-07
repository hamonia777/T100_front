import { useEffect, useState } from "react";
import Modal from "./Modal.js";
import { use } from "react";

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
//오늘 날짜 출력
const today = new Date();
const dateToday = `${today.getFullYear()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

function validateDate(today, targetDate) {
  return today === targetDate;
}

const ReportContainer = ({ category, setLoading }) => {
  const [reportData, setReportData] = useState({}); //카테고리별 저장
  const [currentReport, setCurrentReport] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [star, setStar] = useState(0);
  const [date, setDate] = useState("");
  const [crawlApi, chatApi, reportApi, dateApi] = apiMap[category] || [];

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
    console.log(`ReportContainer에서 받은 평점: ${star}`);
  };

  const checkAndValidate = async () => {
    setLoading(true);
    try {
      // ✅ 먼저 보고서와 날짜 가져오기
      const reportRes = await fetch(`http://localhost:8080/api/${reportApi}`);
      const reportJson = await reportRes.json();
      const editedData = editContent(reportJson.data);

      const dateRes = await fetch(`http://localhost:8080/api/${dateApi}`);
      const serverDate = await dateRes.text();

      setReportData((prev) => ({
        ...prev,
        [category]: editedData,
      }));
      setCurrentReport(editedData);
      setDate(serverDate);

      // // ✅ 이제서야 validate 실행!
      // if (!validateDate(dateToday, serverDate)) {
      //   console.log("날짜 지남 → 새로 불러오기 시작작");
      //   await fetchReportData();
      // } else {
      //   console.log("보고서 이미 있음 → 그대로 사용");
      // }
    } catch (err) {
      setError(`에러 발생: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchReportData = async () => {
    if (!crawlApi || !chatApi || !reportApi) {
      setError("잘못된 카테고리입니다.");
      return;
    }

    setLoading(true);
    try {
      await fetch(`http://localhost:8080/api/${crawlApi}`);
      await fetch(`http://localhost:8080/api/${chatApi}`);

      const response = await fetch(`http://localhost:8080/api/${reportApi}`);
      if (!response.ok) {
        throw new Error(`Report fetch 실패: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.data) {
        const editedData = editContent(data.data);
        //console.log(data);
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
    if (!category) {
      return;
    } else {
      checkAndValidate();
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

  return (
    <div>
      <div className="report-container">
        <div className="report-title">
          {error ? (
            <p>Error: {error}</p>
          ) : reportData[category] ? (
            reportData[category].title
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

        {modalOpen && (
          <Modal
            open={modalOpen}
            close={closeModal}
            onRateSubmit={handleRatingSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ReportContainer;
