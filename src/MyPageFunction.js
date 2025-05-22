import { useEffect, useState } from "react";
import "./MyPageFunction.css";

const modifyInfo = (info) => {
  console.log("info : ", info);
};

const MyPageFunction = ({ selectedIndex }) => {
  const [content, setContent] = useState(null); // 선택된 버튼에 따라 보여줄 내용

  const options = [
    { id: "viewMyInfo", label: "내 정보" },
    { id: "viewMyPost", label: "내가 쓴 게시물" },
    { id: "viewMyComments", label: "내가 쓴 댓글" },
  ];

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/myinfo", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Report fetch 실패: ${response.status}`);
      }
      setContent(data.data);
      //console.log("내 정보 불러오기 성공:", data.data);
      //console.log("content : ", content);

      modifyInfo(content);
    } catch (error) {
      console.error("내 정보 불러오기 실패:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/myCommunity", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Report fetch 실패: ${response.status}`);
      }

      const data = await response.json();
      //console.log("내가 쓴 게시물 불러오기 성공:", data.data);
      setContent(data.data);
      console.log("content : ", content);
    } catch (error) {
      console.error("내가 쓴 게시물 불러오기 실패:", error);
    }
  };

  const fetchComment = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/myComment", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Report fetch 실패: ${response.status}`);
      }

      const data = await response.json();
      //console.log("내가 쓴 댓글 불러오기 성공:", data.data);
      setContent(data.data);
      console.log("content : ", content);
    } catch (error) {
      console.error("내가 쓴 댓글 실패:", error);
    }
  };

  useEffect(() => {
    if (selectedIndex === options[0].id) {
      //console.log("fetchInfo");
      fetchInfo();
    } else if (selectedIndex === options[1].id) {
      //console.log("fetchPost");
      fetchPost();
    } else if (selectedIndex === options[2].id) {
      //console.log("fetchComment");
      fetchComment();
    } else {
      console.log("no selectedIndex");
    }
  }, [selectedIndex]);

  return (
    <div>
      <div className="show-settings">
        {content ? JSON.stringify(content, null, 2) : "불러오는 중..."}
      </div>
    </div>
  );
};
export default MyPageFunction;
