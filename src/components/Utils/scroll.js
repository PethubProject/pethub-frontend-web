export const scrollReload = (e, callback = () => {}) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target;
  //   console.log(scrollTop, scrollHeight, clientHeight, scrollHeight - 36);
  const reloadPoint = scrollTop + clientHeight;
  if (reloadPoint < scrollHeight && reloadPoint > scrollHeight - 36) {
    // console.log("reload");
    callback();
  }
};
