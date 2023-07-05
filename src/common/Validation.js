export function Validation() {
  const obj = {
    id: (id) => {
      var result = { status: true, msg: "사용 가능합니다." };
      var regExp = `^[a-z]+[a-z0-9]{8,20}$`;
      const regex = new RegExp(regExp, "g");
      if (!regex.test(id)) {
        result.status = false;
        result.msg = "아이디는 8~20자";
      }
      return result;
    },
    pw: (pw) => {
      var result = { status: true, msg: "사용 가능합니다." };
      var regExp =
        "^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)-_=+])" +
        `.{8,20}$`;
      const regex = new RegExp(regExp, "g");
      if (!regex.test(pw)) {
        result.status = false;
        result.msg = "비밀번호는 8~20자";
      }
      return result;
    },
    checkPw: (pw, checkPw) => {
      var result = obj.pw(checkPw);
      if (pw !== checkPw) {
        return false;
      }
      return result;
    },
  };
  return obj;
}

export const validUserRole = (user, { owner, vet }) => {
  if (user.role === "OWNER") {
    return owner();
  }
  if (user.role === "VET") {
    return vet();
  }
};
