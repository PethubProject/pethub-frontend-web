export const dateToDiffStr = (now, prev) => {
  const seconds = 1;
  const minute = seconds * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const diff = Math.trunc((now.getTime() - prev.getTime()) / 1000);
  let diffStr = "";
  if (diff < seconds) {
    diffStr = "방금 전";
  } else if (diff < minute) {
    diffStr = diff + "초 전";
  } else if (diff < hour) {
    diffStr = Math.trunc(diff / minute) + "분 전";
  } else if (diff < day) {
    diffStr = Math.trunc(diff / hour) + "시간 전";
  } else if (diff < day * 15) {
    diffStr = Math.trunc(diff / day) + "일 전";
  } else {
    diffStr = prev.format("yyyy-MM-dd HH:mm:dd");
  }

  return diffStr;
};
