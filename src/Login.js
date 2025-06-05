import "./App.css";
import Sign from "./Sign.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import ShapeLoading from "./ShapeLoading.js"; // 파일 경로에 따라 수정 필요
import axios from "axios";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true); // 로딩 상태 시작
      const response = await axios.post(
        "http://localhost:8080/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken =
        response.headers["accesstoken"] ||
        response.headers["accessToken"] ||
        response.headers["AccessToken"] ||
        response.headers["authorization"];
      if (accessToken) {
        console.log("Access Token:", accessToken);
        const pureAccessToken = accessToken.replace("Bearer ", "");
        document.cookie = `accessToken=${pureAccessToken}; path=/; secure`;
        //localStorage.setItem("accessToken", accessToken);
        console.log(response);

        // 로그인 성공 시 WorldMap으로 이동
        navigate("/map");
      } else {
        console.error("Access Token이 응답에 없습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <>
      {isLoading ? (
        <ShapeLoading setLoading={setIsLoading} />
      ) : (
        <div className="Mlog">
          <div className="SMLlog">
            <b className="w">Welcome!</b>
            <form className="LF" onSubmit={handleLogin}>
              <label className="IL" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="II"
                maxLength="20"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
              <label className="PL" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="IP"
                maxLength="20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button type="submit" className="LB">
                Login
              </button>
            </form>
            <Link to="/Sign" className="SB">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
