const ctime = new Date();
const lists = [
  {
    id: 1,
    title: "1번 게시물 제목",
    content: "1번 게시물 내용.",
    user: "작성자 1",
    createdtime: ctime.toISOString(),
  },
  {
    id: 2,
    title: "2번 게시물 제목",
    content: "12345678910111213141516",
    user: "작성자 2",
    createdtime: ctime.toISOString(),
  },
];

export default lists;
