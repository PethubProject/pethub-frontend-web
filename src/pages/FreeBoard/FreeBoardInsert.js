import { useNavigate, useSearchParams } from "react-router-dom";
import BtnRegister from "../../components/Button/BtnRegister";
import BoardHeader from "../../components/Header/HeaderBoard";
import LayoutUserExist from "../../components/Layout/LayoutUserExist";
import { useCallback, useState } from "react";
import useApiHooks from "../../api/BaseApi";
import { isEmpty, unscript } from "../../utils/Utils";
import BottomFileUpload from "../../components/Navigation/BottomFileUpload";
export default function FreeBoardInsert() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { postApi, postApiWithFile } = useApiHooks();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });

  const onFormChagne = useCallback((e) => {
    const { name, value } = e.target;
    setPostData((p) => ({ ...p, [name]: value }));
  }, []);

  const onRegist = useCallback(() => {
    var ok = true;
    Object.keys(postData).map((k) => {
      const v = postData[k];
      if (isEmpty(v)) {
        document.querySelector(`[name="${k}"]`).focus();
        ok = false;
        return false;
      }
    });
    if (!ok) {
      return false;
    }
    postApi({ url: "/api/post", data: postData }).then((resp) => {
      if (resp.status === 200) {
        navigate(`/freeboard/content?contentId=${resp.data.data}`, {
          replace: true,
        });
      }
    });
    // var formData = new FormData();
    // formData.append("file", null);
    // Object.keys(postData).map((k) => {
    //   formData.append(k, postData[k]);
    // });
    // postApiWithFile({ url: "/api/post/save", data: formData }).then((resp) => {
    //   console.log(resp);
    // });
  }, [postData]);
  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader
          title="자유게시판 글 등록"
          right={
            <div className="btn-wrapper">
              {/* <button className="btn">임시저장</button> */}
              <BtnRegister onClick={onRegist} />
            </div>
          }
        />

        <form id="freeboard" className="content">
          <div className="form-item">
            <label>제목</label>
            <input
              className="form-item-input"
              type="text"
              placeholder="제목입력"
              onChange={onFormChagne}
              value={postData.title}
              name="title"
              maxLength="255"
            />
          </div>
          <div className="form-item">
            <label>내용</label>
            <textarea
              className="form-item-textarea"
              placeholder="내용입력"
              rows={20}
              onChange={onFormChagne}
              value={postData.content}
              name="content"
              maxLength="500"
            ></textarea>
          </div>
        </form>
        <BottomFileUpload />
      </div>
    </LayoutUserExist>
  );
}
