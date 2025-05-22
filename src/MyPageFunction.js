import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPageFunction.css";

const MyPageFunction = ({ selectedIndex }) => {
  const [content, setContent] = useState(null); // 선택된 버튼에 따라 보여줄 내용
  const [nick, setNick] = useState("");
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [clickChangeNick, setClickChangeNick] = useState(false); // 닉네임 변경 클릭 여부
  const [clickChangePwd, setClickChangePwd] = useState(false); // 비밀번호 변경 클릭 여부
  const navigate = useNavigate();

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
      setPwd(data.data.pass);
      //console.log("내 정보 불러오기 성공:", data.data);
      //console.log("content : ", content);
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
      setContent(data.data.reverse());
      //console.log("content : ", content);
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
    } catch (error) {
      console.error("내가 쓴 댓글 실패:", error);
    }
  };

  const patchNick = async () => {
    //console.log(typeof nick);
    try {
      const response = await fetch("http://localhost:8080/api/nickChange", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newNick: nick,
        }),
      });

      const text = await response.text(); // JSON이 아닐 수 있으니 text로 받음
      //console.log("서버 응답 원문:", text);
      if (!text) {
        throw new Error(`Report fetch 실패: ${response.status}`);
      }
      //const data = await response.json();
      console.log("닉네임 변경 성공");
    } catch (error) {
      console.error("닉네임 변경 실패:", error);
    }
    setClickChangeNick(false);
  };

  const patchPwd = async () => {
    //console.log(pwd);
    try {
      const response = await fetch("http://localhost:8080/api/passChange", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pass: pwd,
          newPass: newPwd,
        }),
      });

      const data = await response.json();
      //console.log("서버 응답:", data);
      if (!response.ok) {
        throw new Error(`Report fetch 실패: ${response.status}`);
      }
      console.log("비밀번호 변경 성공", data);
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
    }
    setPwd(newPwd);
    setClickChangePwd(false);
  };
  const onClickChangeNick = async () => {
    console.log("닉네임 변경 클릭");
    setClickChangeNick(true);
    setClickChangePwd(false);
  };

  const onClickChangePwd = async () => {
    console.log("비밀번호 변경 클릭");
    setClickChangePwd(true);
    setClickChangeNick(false);
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

  const onClickUpdate = (index) => {
    const board = {
      id: content[index].community_id,
      title: content[index].title,
      author: content[index].nick,
      createdAt: content[index].created_at.split("T")[0],
      content: content[index].content,
    };
    navigate("/boardupdate", { state: { board } });
  };

  const onClickDelete = async (index) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/community/${content[index].community_id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            community_id: content[index].community_id,
          }),
        }
      );

      const data = await response.json();
      console.log("서버 응답:", data);

      if (data.success) {
        alert("게시글 삭제 완료");
      }
      window.location.reload();
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  useEffect(() => {
    if (selectedIndex === options[1].id) {
      //console.log("fetchPost");
      fetchPost();
    } else if (selectedIndex === options[2].id) {
      //console.log("fetchComment");
      fetchComment();
    } else {
      fetchInfo();
    }
    console.log(content);
    setClickChangeNick(false);
    setClickChangePwd(false);
  }, [selectedIndex]);

  return (
    <div>
      <div className="show-settings">
        {/* 내 정보 */}
        {selectedIndex === "viewMyInfo" &&
          content &&
          typeof content === "object" && (
            <div className="myInfo-content">
              <p>이름: {content.name}</p>
              <p>닉네임 : {content.nick}</p>
              <p>생년월일 : {content.birth}</p>
              <p>이메일: {content.email}</p>
              <p>전화번호: {content.phone}</p>
              <button id="updateNick" onClick={() => onClickChangeNick()}>
                닉네임 변경
              </button>
              <button id="updatePwd" onClick={() => onClickChangePwd()}>
                비밀번호 변경
              </button>
            </div>
          )}

        {clickChangeNick && (
          <div className="changeNick-content">
            <p>변경할 닉네임을 입력하세요:</p>
            <div className="changeNick-input">
              <input
                type="text"
                placeholder="닉네임"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
              />
              <button id="changeNick-btn" onClick={patchNick}>
                변경
              </button>
            </div>
          </div>
        )}

        {clickChangePwd && (
          <div className="changePwd-content">
            <p>변경할 비밀번호를 입력하세요:</p>
            <div className="changePwd-input">
              <input
                type="password"
                placeholder="새 비밀번호"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />
              <button id="changePwd-btn" onClick={patchPwd}>
                변경
              </button>
            </div>
          </div>
        )}

        {/* 내가 쓴 게시물 */}
        {selectedIndex === "viewMyPost" && Array.isArray(content) && (
          <div className="myPost-content">
            <ul>
              {content.map((post, index) => (
                <li key={post.community_id} className="myPost-items">
                  <p id="myPostTitle" onClick={() => onClickItem(index)}>
                    {post.title}
                  </p>
                  <div className="myPost-btns">
                    <button
                      id="myPostUpdateBtn"
                      onClick={() => onClickUpdate(index)}
                    >
                      수정
                    </button>
                    <button
                      id="myPostDeleteBtn"
                      onClick={() => onClickDelete(index)}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 내가 쓴 댓글 */}
        {selectedIndex === "viewMyComments" && Array.isArray(content) && (
          <div className="myComments-content">
            <ul>
              {content.map((comment, index) => (
                <li
                  key={index}
                  className="myCommentsItems"
                  onClick={() => onClickItem(index)}
                >
                  {comment.content}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!content && <p>불러오는 중 또는 선택된 항목이 없습니다.</p>}
      </div>
    </div>
  );
};
export default MyPageFunction;
