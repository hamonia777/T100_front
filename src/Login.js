import "./App.css";
import Sign from "./Sign.js";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 및 인증 정보 허용
        }
      );
  
      console.log("전체 응답 헤더:", response.headers);
  
      // 모든 헤더 키 출력 (디버깅용)
      Object.keys(response.headers).forEach((key) => {
        console.log(`${key}: ${response.headers[key]}`);
      });
  
      // accesstoken 또는 AccessToken 읽기
      const accessToken =
        response.headers["accesstoken"] || response.headers["accessToken"] || response.headers["AccessToken"];
      if (accessToken) {
        console.log("Access Token:", accessToken);
        // 토큰 저장 (예: localStorage 또는 쿠키)
        document.cookie = `accessToken=${accessToken}; path=/; secure`;
      } else {
        console.error("Access Token이 응답에 없습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };
  

  return (
    <>
      {isLoading ? (
        <ShapeLoading setLoading={setIsLoading} />
      ) : (
        <div className="Mlog">
          <b className="w">Welcome!</b>
          <div className="SMlog">
            <div className="Ll">
              <label className="IL" htmlFor="ID">
                ID
              </label>
                <input
                  type="text"
                  id="username"
                  className="II"
                  maxLength="20"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              <br />
              <label className="PL" htmlFor="PW">
                PW
              </label>
              <input type="password" id="PW" className="IP" maxLength="20" />
              <br />
              <button type="submit" className="LB">
                login
              </button>

              <br />

              <Link to="/Sign" className="SB">
                회원가입
              </Link>
              <button onClick={() => handleSign} className="IS">
                아이디 찾기
              </button>
              <button onClick={() => handleSign} className="PS">
                비밀번호 찾기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
