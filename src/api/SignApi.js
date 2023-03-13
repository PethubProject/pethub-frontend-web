const memberId = "admin";
const memberPw = "admin001*";

export const apiSignIn = async (member) => {
  console.log(member);
  let resp = { status: "success", data: { memberId: memberId } };
  if (memberId !== member.memberId || memberPw !== member.memberPw) {
    resp.status = "fail";
    resp.data = {};
  }
  return resp;
};
