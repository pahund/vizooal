export default (() => {
  let max = 0;
  return (val) => {
    if (val > max) {
      console.log(val);
    }
    max = val;
  };
})();
