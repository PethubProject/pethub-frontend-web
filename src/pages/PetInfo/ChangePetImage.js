// import { useEffect, useState, useCallback } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import useApiHooks from "../../api/BaseApi";

// export default function ChangePetImage() {
//     const { getApi } = useApiHooks();
//     const nav = useNavigate();
//     const [petContent, setPetContent] = useState({
//         petId:"",
//         petImage: "",
//         petName: "",
//         petAge: "",
//         // 강아지 이외(ex) 고양이 등)을 추가하면 추가돼야하는 코드
//         // animalGroup: "",
//         petBreed: "",
//         petGender: "",
//         petWeight: "",
//         petIntroduction: "",
//       });
//       const [searchParams, setSearchParams] = useSearchParams();
//       useEffect(() => {
//         const petId = searchParams.get("detailID");
//         getApi({ url: `/api/pet/${petId}` }).then((resp) => {
//           console.log(resp)
//           if (resp.data.data === undefined) {
//             alert("잘못된 접근입니다.");
//             nav(`/petinfo/`);
//             return;
//           }
//           setPetContent(resp.data.data);
//         });
//       }, []);
//   const { fileUpload } = useApiHooks();
//   return (
//     <label className="list-item v-exp">
//       <input
//         type="file"
//         id="input-img"
//         accept="image/*"
//         capture={"user"}
//         onChange={(e) => {
//           var file = e.target.files[0];
//           var formData = new FormData();
//           formData.append("photo", file);
//           fileUpload({ url: `/api/${petId}/image`, data: formData }).then(
//             (r) => {
//               console.log(r)
//               setPetContent((p) => ({ ...p, userImage: r.data.img }));
//             }
//           );
          
//         }}
//       ></input>
//       {/* <label htmlFor="input-img">사진 변경</label>
//        */}
//       <div>사진 변경</div>
//     </label>
//   );
// }
