const ctime = new Date();
const AnswerLists = [
  {
    id: 1,
    title: "1번 게시물 답변 제목",
    content: "1번 게시물 답변 내용.",
    user: "수의사 1",
    createdtime: ctime.toISOString(),
  },
  {
    id: 2,
    title: "2번 게시물 답변 제목",
    content: "12345678910111213141516",
    user: "수의사 2",
    createdtime: ctime.toISOString(),
  },
];

export default AnswerLists;
