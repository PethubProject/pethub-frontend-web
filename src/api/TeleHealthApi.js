import uuid from "react-uuid";
import vetImg from "../resources/image/vet_ani_img.png";
export const getVetList = async () => {
  return Array(1000)
    .fill(0)
    .map((d, i) => {
      return {
        vet_id: uuid().replace(/[-]+/gi, ""),
        name: `수의사 ${i}`,
        profile: vetImg,
        introduction: `수의사 ${i} 소개`,
        location: `수의사 ${i} 주소`,
        time: `수의사 ${i} 진료시간`,
        score: `수의사 ${i} 평점`,
        career: `수의사 ${i} 커리어`,
        hospital: `수의사 ${i} 병원이름`,
        modified_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
    });
};
