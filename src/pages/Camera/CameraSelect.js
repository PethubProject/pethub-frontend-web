import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loading } from "../../components/Utils/Loading";
import { useEffect } from "react";

export default function CameraSelect() {
  const navigate = useNavigate();

  return (
    <div id="main">
      <div className="content">
        <div id="camera-select">
          <div
            onClick={(e) => {
              navigate("/ai");
            }}
          >
            카메라로 촬영
          </div>
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
                  .post("http://localhost:9898/predict", formData, {
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
