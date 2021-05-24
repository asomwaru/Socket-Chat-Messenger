const loginHandler = () => {
  if (sessionStorage.username === undefined) {
    window.location.href = "/login";
  }
};

window.onload = loginHandler;
// document.getElementById("")
