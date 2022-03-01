export default (() => {
   let logged = false;
   return (...args) => {
       if (!logged) {
           console.log(...args);
       }
       logged = true;
   }
})();