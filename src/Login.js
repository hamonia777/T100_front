import "./App.css";
import Sign from "./Sign.js";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [showSign, setShowSign] = useState(false);

  const handleSign = () => {
    setShowSign(!showSign);
  };

  return (
    <>
      {showSign ? (
        <div className="Mlog">
          <Sign />
        </div>
      ) : (
        <div className="Mlog">
          <b className="w">Welcome!</b>
          <div className="SMlog">
            <div className="Ll">
              <form className="LF">
                <label className="IL" htmlFor="ID">
                  ID
                </label>
                <input type="text" id="ID" className="II" maxLength="20" />
                <br />
                <label className="PL" htmlFor="PW">
                  PW
                </label>
                <input type="password" id="PW" className="IP" maxLength="20" />
                <br />
                <button type="submit" className="LB">
                  login
                </button>
              </form>
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
