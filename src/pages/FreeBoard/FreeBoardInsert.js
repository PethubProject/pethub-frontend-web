import { useNavigate, useSearchParams } from "react-router-dom";
import BtnRegister from "../../components/Button/BtnRegister";
import BoardHeader from "../../components/Header/HeaderBoard";
import LayoutUserExist from "../../components/Layout/LayoutUserExist";
import { useCallback, useState } from "react";
import { isEmpty } from "../../utils/Utils";
import useApiHooks from "../../api/BaseApi";
export default function FreeBoardInsert() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { postApi } = useApiHooks();

  const [formData, setFormData] = useState({
    postTitle: "",
    postContents: "",
  });

  const onFormChagne = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  }, []);
  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader
          title="자유게시판 글 등록"
          right={
            <div className="btn-wrapper">
              {/* <button className="btn">임시저장</button> */}
              <BtnRegister
                onClick={() => {
                  Object.keys(formData).map((k) => {
                    const v = formData[k];

                    console.log(v);
                    console.log(isEmpty(v));
                  });
                  postApi({ url: "/api/post/save", data: formData }).then(
                    (resp) => console.log(resp)
                  );
                }}
              />
            </div>
          }
        />

        <form id="freeboard">
          <div className="form-item">
            <label>제목</label>
            <input
              className="form-item-input"
              type="text"
              placeholder="제목입력"
              onChange={onFormChagne}
              value={formData.postTitle}
              name="postTitle"
            />
          </div>
          <div className="form-item">
            <label>내용</label>
            <textarea
              className="form-item-textarea"
              placeholder="내용입력"
              rows={15}
              onChange={onFormChagne}
              value={formData.postContents}
              name="postContents"
            ></textarea>
          </div>
        </form>
        {/* <BottomTabNavigation /> */}
      </div>
    </LayoutUserExist>
  );
}
