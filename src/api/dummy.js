export const dummyFreeBoardContent = [
  {
    title: "자유게시판 게시글 1번",
    desc: "자유게시판 게시글 1번",
    contentId: 1,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
  {
    title: "자유게시판 게시글 2번",
    desc: "자유게시판 게시글 2번",
    contentId: 2,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
  {
    title: "자유게시판 게시글 3번",
    desc: "자유게시판 게시글 3번",
    contentId: 3,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
  {
    title: "자유게시판 게시글 4번",
    desc: "자유게시판 게시글 4번",
    contentId: 4,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
  {
    title: "자유게시판 게시글 5번",
    desc: "자유게시판 게시글 5번",
    contentId: 5,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
  {
    title: "자유게시판 게시글 6번",
    desc: "자유게시판 게시글 6번",
    contentId: 6,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
  {
    title: "자유게시판 게시글 7번",
    desc: "자유게시판 게시글 7번",
    contentId: 7,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
  {
    title: "자유게시판 게시글 8번",
    desc: "자유게시판 게시글 8번",
    contentId: 8,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
  {
    title: "자유게시판 게시글 9번",
    desc: "자유게시판 게시글 9번",
    contentId: 9,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
  {
    title: "자유게시판 게시글 10번",
    desc: "자유게시판 게시글 10번",
    contentId: 10,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
  {
    title: "자유게시판 게시글 11번",
    desc: "자유게시판 게시글 11번",
    contentId: 11,
    regDt: new Date().toISOString(),
    regUser: "관리자",
  },
];

export const dummyFreeBoardReply = [
  { contentId: 2, regUser: "유저1", regDt: "2022-02-10", desc: "댓글1" },
  { contentId: 3, regUser: "유저2", regDt: "2022-02-10", desc: "댓글12" },
  { contentId: 4, regUser: "유저3", regDt: "2022-02-10", desc: "댓글14" },
  { contentId: 1, regUser: "유저4", regDt: "2022-02-10", desc: "댓글1111" },
  { contentId: 2, regUser: "유저5", regDt: "2022-02-10", desc: "댓글1222" },
  { contentId: 10, regUser: "유저6", regDt: "2022-02-10", desc: "댓글1333" },
  { contentId: 2, regUser: "관리자", regDt: "2022-02-10", desc: "댓글1333" },
];

export const randomFreeBoardList = () => {
  return Array(1000)
    .fill(0)
    .map((d, i) => {
      return {
        title: `자유게시판 ${i} 글 제목`,
        desc: `자유게시판 ${i} 게시글 내용`,
        contentId: i,
        regDt: new Date().toISOString(),
        regUser: `유저 ${parseInt(Math.random() * 100)}`,
      };
    });
};
export const randomFreeBoardReplyList = (contentId = 10) => {
  const max = parseInt(Math.random() * contentId);
  const user = Array(max).fill(`유저 ${parseInt(Math.random() * contentId)}`);
  return Array(max)
    .fill(0)
    .map((d, i) => {
      return {
        contentId: Math.floor(Math.random() * 1000),
        regDt: new Date().toISOString(),
        regUser: `유저 ${parseInt(Math.random() * contentId)}`,
        desc: `댓글 내용 ${parseInt(Math.random() * contentId)}`,
      };
    });
};
