export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return { Authorization: user.token, "Content-Type":"application/json"};
  } else {
    return {};
  }
}
