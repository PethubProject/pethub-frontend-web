export const ID_REG_EX = /^[a-z][a-zA-Z0-9]{4,19}$/g;
export const PASSWORD_REG_EX =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&]{7,50}$/g;
export const EMAIL_REG_EX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
