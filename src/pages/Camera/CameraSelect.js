import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BoardHeader from "../../components/Header/HeaderBoard";
import { loading } from "../../components/Utils/Loading";

export default function CameraSelect() {
  const navigate = useNavigate();

  const onMoveCamera = useCallback((e) => {
    console.log(window.cordova?.plugins.permissions);
    if (window.cordova?.plugins.permissions) {
      var permissions = window.cordova.plugins.permissions;
      permissions.checkPermission(permissions.CAMERA, function (status) {
        if (status.hasPermission) {
          console.log("카메라 권한 있음");
          navigate("/ai", { state: { cordova: true } });
        } else {
          permissions.requestPermission(permissions.CAMERA, success, error);
          function error() {
            alert("권한 없음");
          }
          function success(status) {
            if (!status.hasPermission) {
              error();
              return;
            } else {
              navigate("/ai", { state: { cordova: true } });
            }
          }
        }
      });
    } else {
      navigate("/ai", { state: { cordova: false } });
    }
  }, []);
  return (
    <div id="main">
      <BoardHeader title="" />
      <div className="content">
        <div id="camera-select">
          <div onClick={onMoveCamera}>카메라로 촬영</div>
          <label htmlFor="image-select">사진 선택</label>
          <input
            id="image-select"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                loading.on();
                var formData = new FormData();
                formData.append("file", e.target.files[0]);
                axios
                  .post(process.env.REACT_APP_AI_API_URL+"/predict", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                  .then((resp) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = function () {
                      navigate("/ai/result", {
                        state: { imageSrc: reader.result, data: resp.data },
                      });
                    };
                    reader.onerror = function (error) {
                      console.log("Error: ", error);
                    };
                  })
                  .finally(() => {
                    loading.off();
                    e.target.value = null;
                  });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
