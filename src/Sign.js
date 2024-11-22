import "./Sign.css";
import Login from "./Login.js";
import { Link } from "react-router-dom";

function Sign() {
  return (
    <div className="BG">
      <div className="MD">
        <div className="FD">
          <label className="Le" for="email">
            이메일
          </label>
          <input type="email" id="email" className="Ie" maxLenght="30"></input>
          <button className="Bes">중복확인</button>
          <br />

          <label className="Lp" for="password">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="Ip"
            maxLenght="30"
          ></input>
          <br />

          <label className="Lps" for="Ps">
            비밀번호 확인
          </label>
          <input type="password" id="Ps" className="IPs" maxLenght="30"></input>
          <button className="Bps">확인</button>
          <br />

          <label className="Ln" for="nickname">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            className="In"
            maxLenght="30"
          ></input>
          <button className="Bns">중복확인</button>
          <br />

          <label className="Lt" for="tel">
            전화번호
          </label>
          <input type="tel" id="tel" className="It" maxLenght="30"></input>
          <br />

          <label className="Lb" for="Bir">
            생년월일
            <br />
            (6자리)
          </label>
          <input type="text" id="Bir" className="Ib" maxLenght="30"></input>
          <br />

          <button className="BS">회원가입</button>
          <Link to="/" className="BC">
            취소
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sign;
