import "./Sign.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Sign() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState(""); // 비밀번호 확인
  const [nick, setNick] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [isEmailAvailable, setIsEmailAvailable] = useState(false); // 이메일 사용 가능 여부
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 확인 여부
  const navigate = useNavigate();

  const cancelButton = () => {
    navigate("/");
  };

  const handSign = async (e) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 확인 일치 여부 확인
    if (pass !== passConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 이메일 중복 확인 여부 체크
    if (!isEmailChecked) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }
    if (!isEmailAvailable) {
      alert("사용할 수 없는 이메일입니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/signup", {
        nick,
        email,
        pass,
        phone,
        birth,
      });
      console.log("회원가입 성공:", response.data);
      // 회원가입 성공 후 처리 로직 추가
      alert("회원가입이 완료되었습니다!");
      navigate("/login"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      // 오류 처리 로직 추가
    }
  };

  const checkEmailDuplication = async () => {
    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8080/api/signup/checkEmail",
        {
          params: { email: email },
        }
      );
      if (response.data.msg == "이메일 유효") {
        alert("사용 가능한 이메일입니다.");
        setIsEmailAvailable(true);
      } else {
        alert("이미 사용 중인 이메일입니다.");
        setIsEmailAvailable(false);
      }
      setIsEmailChecked(true);
    } catch (error) {
      console.error("이메일 중복 확인 오류:", error);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="BG">
      <div className="MD">
        <div className="FD">
          <form onSubmit={handSign}>
            <label className="Le" htmlFor="email">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="Ie"
              maxLength="30"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailChecked(false); // 이메일 변경 시 중복 확인 상태 초기화
              }}
            />
            <button
              type="button"
              className="Bes"
              onClick={checkEmailDuplication}
            >
              중복확인
            </button>
            <br />

            <label className="Lp" htmlFor="pass">
              비밀번호
            </label>
            <input
              type="password"
              id="pass"
              className="Ip"
              maxLength="30"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <br />

            <label className="Lps" htmlFor="passConfirm">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passConfirm"
              className="IPs"
              maxLength="30"
              value={passConfirm}
              onChange={(e) => setPassConfirm(e.target.value)}
            />
            <br />

            <label className="Ln" htmlFor="nick">
              닉네임
            </label>
            <input
              type="text"
              id="nick"
              className="In"
              maxLength="30"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
            />
            <button className="Bns">중복확인</button>
            <br />

            <label className="Lt" htmlFor="phone">
              전화번호
            </label>
            <input
              type="tel"
              id="phone"
              className="It"
              maxLength="30"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />

            <label className="Lb" htmlFor="birth">
              생년월일
              <br />
              (6자리)
            </label>
            <input
              type="text"
              id="birth"
              className="Ib"
              maxLength="6"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
            <br />

            <button type="submit" className="BS">
              회원가입
            </button>
            <button className="BC" onClick={() => cancelButton} type="button">
              취소
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sign;
