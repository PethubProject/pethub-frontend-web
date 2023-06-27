import { useRecoilState } from "recoil";
import useApiHooks from "../../api/BaseApi";
import { UserState } from "../../state/User";

export default function ChangeUserImage() {
  const [user, setUser] = useRecoilState(UserState);
  const { fileUpload } = useApiHooks();
  return (
    <label className="list-item v-exp">
      <input
        type="file"
        id="input-img"
        onChange={(e) => {
          var file = e.target.files[0];
          var formData = new FormData();
          formData.append("photo", file);
          if (user.role === "OWNER") {
            fileUpload({ url: "/api/owner/image", data: formData }).then(
              (r) => {
                setUser((p) => ({ ...p, userImage: r.data.img }));
              }
            );
          }
          // 수정
          if (user.role === "VET") {
            fileUpload({ url: "/api/owner/image", data: formData }).then(
              (r) => {
                setUser((p) => ({ ...p, userImage: r.data.img }));
              }
            );
          }
        }}
      ></input>
      {/* <label htmlFor="input-img">사진 변경</label>
       */}
      <div>사진 변경</div>
    </label>
  );
}
