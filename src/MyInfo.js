import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyInfo.css";

function MyInfo() {
  const [content, setContent] = useState(null);
  const [nick, setNick] = useState("");
  const navigate = useNavigate();

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
      //console.log("내 정보 불러오기 성공:", data.data);
      setNick(data.data.nick);
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
      //console.log("내가 쓴 게시물 불러오기 성공:");
      setContent(data.data.slice(-5).reverse());
      //console.log("content : ", content);
    } catch (error) {
      console.error("내가 쓴 게시물 불러오기 실패:", error);
    }
  };
  const onClickItem = (index) => {
    const board = {
      id: content[index].community_id,
      title: content[index].title,
      author: content[index].nick,
      createdAt: content[index].created_at.split("T")[0],
      content: content[index].content,
    };
    navigate("/boarddetail", { state: { board } });
  };

  useEffect(() => {
    fetchInfo();
    fetchPost();
  }, []);

  return (
    <div className="myInfo">
      <p id="helloUser">안녕하세요 '{nick}'님!</p>
      <div className="report-showMyPost">
        <hr />
        <p id="report-myinfo-title"> [ 내가 작성한 게시글 ] </p>
        <ul>
          {Array.isArray(content) &&
            content.map((post, index) => (
              <li key={post.community_id} className="report-myPost-items">
                <p id="myPostTitle" onClick={() => onClickItem(index)}>
                  {post.title}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
export default MyInfo;
