import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useApiHooks from "../../api/BaseApi";
import { useEffect } from "react";
import defaultImg from "../../resources/image/userDefault.png";
import ImgWrapper from "../../components/Wrapper/ImgWrapper.js";
import { Card } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import BoardHeader from "../../components/Header/HeaderBoard";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserState } from "../../state/User";
export default function TeleHealthDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { postApi } = useApiHooks();
  const [vetContent, setVetContent] = useState({
    vetImage: null,
    name: "",
    hosName: "",
    introduction: "",
    address: "",
    openHour: "",
    closeHour: "",
    reviewList: [],
    career: "",
  });
  const user = useRecoilValue(UserState);
  const setUserState = useSetRecoilState(UserState);
  const navigate = useNavigate();
  const createRoom = useCallback((targetId) => {
    getApi({ url: `/api/exist/chat/${targetId}` }).then((resp) => {
      const { data } = resp.data;
      console.log(data);
      if (!data.status) {
        postApi({ url: `/api/create/chat-room/${targetId}` }).then((resp) => {
          navigate("/chat/room", {
            state: {
              targetId: targetId,
              chatRoomId: resp.data.data.roomId,
              senderId: user.userId,
            },
          });
        });
      } else {
        navigate("/chat/room", {
          state: {
            targetId: targetId,
            chatRoomId: data.roomId,
            senderId: user.userId,
          },
        });
      }
    });
  }, []);

  const { getApi } = useApiHooks();
  //"api/vet/{vetId}"
  useEffect(() => {
    getApi({ url: `api/vet/${searchParams.get("userId")}` }).then((resp) => {
      setVetContent(resp.data.data);

      setUserState((p) => ({
        ...p,
        ["reviewList"]: vetContent.reviewList,
      }));
      console.log(user.reviewList.length);
      console.log(resp.data.data);
      console.log(user);
      console.log(242422);
    });
  }, []);
  return (
    <div
      id="main"
      style={{ display: "flex", justifyContent: "center", gap: "32px" }}
    >
      <BoardHeader title="수의사 정보" />
      <ImgWrapper
        src={process.env.REACT_APP_API_URL + vetContent.vetImage}
        alt={"수의사 이미지"}
        width="500px"
        height="200px"
        borderRadius="50%"
        defaultImg={defaultImg}
      />
      <div
        className="content"
        style={{ display: "flex", justifyContent: "center", gap: "32px" }}
      >
        <Card
          title={vetContent.name + " 의사"}
          // extra={<a href="#">More</a>}
          style={{ width: 400 }}
        >
          <div>
            <div>
              <label className="insert-title">{"병원명"}</label>

              {"  " + vetContent.hosName}
              <span
                className="insert-title"
                key={Math.random()}
                onClick={() => {
                  navigate(
                    `/telehealth/content/review?userId=${searchParams.get(
                      "userId"
                    )}`
                  );
                }}
              >
                <CommentOutlined /> 리뷰
              </span>
              <span>{user.reviewList.length + ">"}</span>
            </div>
          </div>
          <br />
          <div>
            <label className="insert-title">진료시간 </label>
            {vetContent.openHour + "~" + vetContent.closeHour}
          </div>
          <br />
          <div>
            <label className="insert-title">경력 </label>
            <div style={{ display: "block", margin: "9px" }}>
              {vetContent.career
                ? vetContent.career.split("\n").map((line) => {
                    return (
                      <span>
                        {line}
                        <br />
                      </span>
                    );
                  })
                : "없음"}
            </div>
          </div>
          <br />
          <div>
            <label className="insert-title">소개 </label>
            <div style={{ display: "block", margin: "9px" }}>
              {vetContent.introduction}
            </div>
          </div>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "32px" }}>
        <button
          style={{
            width: "400px",
            height: "40px",
            background: "#3eebad",
            borderRadius: "10px",
            color: "white",
          }}
          onClick={(_) => {
            createRoom(searchParams.get("userId"));
          }}
        >
          진료접수하기
        </button>
      </div>
      <BottomTabNavigation />
    </div>
  );
}

// 수의사 목록에 병원이름, 진료시간 항목 추가하기

//훈창님에게 게시판, 펫등록, 등등 안되는 거 말하기

//안되는 거해결하고 상담 댓글 목록 참고해서 리뷰 기능구현

//진료접수하면 채팅 목록에 추가되도록하기

//css 미무리하기
