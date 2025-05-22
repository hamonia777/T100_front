import { Link } from "react-router-dom";
import { useState } from "react";
import MyPageFunction from "./MyPageFunction";
import "./MyPage.css";
function MyPage() {
  const [selectedIndex, setSelectedIndex] = useState(null); //선택된 버튼 인덱스

  const options = [
    { id: "viewMyInfo", label: "내 정보" },
    { id: "viewMyPost", label: "내가 쓴 게시물" },
    { id: "viewMyComments", label: "내가 쓴 댓글" },
  ];

  const handleButtonClick = (option) => {
    setSelectedIndex(option.id);
    //console.log(selectedIndex);
  };
  return (
    <div>
      <div className="myPage-Logo">
        <Link to="/main" id="logo">
          T100
        </Link>
      </div>
      <div className="myPage-container">
        <div className="bookMarks">
          <ul>
            {options.map((option, index) => (
              //console.log(option, index)
              <li key={index}>
                <button
                  id={option.id}
                  className={selectedIndex === option.id ? "selected" : ""}
                  onClick={() => handleButtonClick(option)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="myPage-contents">
          <MyPageFunction selectedIndex={selectedIndex} />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
