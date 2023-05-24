export const isEmpty = (obj) => {
  if (
    obj === null ||
    obj === "" ||
    obj === undefined ||
    typeof obj === "undefined"
  ) {
    return true;
  }
  if (typeof obj === "string") {
    if (obj.replace(/[\s]+/gi, "").length === 0) {
      return true;
    }
  }
  if (typeof obj === "object") {
    if (!Array.isArray(obj) && Object.keys(obj).length === 0) {
      return true;
    }
    if (Array.isArray(obj) && obj.length === 0) {
      return true;
    }
  }
  return false;
};

export const contains = (obj, key) => {
  if (Object.keys(obj).includes(key)) {
    return true;
  }
  return false;
};

export const unscript = (data) => {
  if (isEmpty(data)) {
    return "";
  }

  var ret = data;

  ret = ret.replace(/<(S|s)(C|c)(R|r)(I|i)(P|p)(T|t)/, "&lt;script");
  ret = ret.replace(/<\/(S|s)(C|c)(R|r)(I|i)(P|p)(T|t)/, "&lt;/script");

  ret = ret.replace(/<(O|o)(B|b)(J|j)(E|e)(C|c)(T|t)/, "&lt;object");
  ret = ret.replace(/<\/(O|o)(B|b)(J|j)(E|e)(C|c)(T|t)/, "&lt;/object");

  ret = ret.replace(/<(A|a)(P|p)(P|p)(L|l)(E|e)(T|t)/, "&lt;applet");
  ret = ret.replace(/<\/(A|a)(P|p)(P|p)(L|l)(E|e)(T|t)/, "&lt;/applet");

  ret = ret.replace(/<(E|e)(M|m)(B|b)(E|e)(D|d)/, "&lt;embed");
  ret = ret.replace(/<\/(E|e)(M|m)(B|b)(E|e)(D|d)/, "&lt;embed");

  ret = ret.replace(/<(F|f)(O|o)(R|r)(M|m)/, "&lt;form");
  ret = ret.replace(/<\/(F|f)(O|o)(R|r)(M|m)/, "&lt;form");

  return ret;
};
