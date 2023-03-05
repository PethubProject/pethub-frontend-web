/* eslint-disable no-extend-native */
String.prototype.empty = function () {
  if (this.replace(/[\s]+/gi, "").length > 0) {
    return false;
  } else {
    return true;
  }
};
