// App.js
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Start from "./Start";
import Login from "./Login";
import Sign from "./Sign";
import Main from "./Main";
import Board from "./Board/Board";
import BoardWrite from "./Board/BoardWrite";
import ReportContainer from "./ReportContainer";
import MyPage from "./MyPage";
import BoardDetail from "./Board/BoardDetail";
import BoardUpdate from "./Board/BoardUpdate";
import WorldMap from "./WorldMap"; // WorldMap 컴포넌트 추가
import CountryDetails from "./CountryDetails"; // CountryDetails 컴포넌트 추가

function App() {
  const navigate = useNavigate();

  // 나라 선택 시 이동할 함수
  const handleCountrySelect = (countryName) => {
    navigate(`/country?name=${encodeURIComponent(countryName)}`);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/main" element={<Main />} />
        <Route
          path="/map"
          element={<WorldMap onCountrySelect={handleCountrySelect} />}
        />
        <Route path="/country" element={<CountryDetails />} />
        <Route path="/board" element={<Board />} />
        <Route path="/boardwrite" element={<BoardWrite />} />
        <Route path="/boarddetail" element={<BoardDetail />} />
        <Route path="/boardupdate" element={<BoardUpdate />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/reportcontent" element={<ReportContainer />} />
      </Routes>
    </div>
  );
}

export default App;
