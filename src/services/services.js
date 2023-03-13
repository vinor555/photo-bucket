import axios from "axios";

export function loginUser(user, password) {
  const body = {
    user: user,
    password: password,
  };
  console.log(body);
  axios
    .post(
      "http://ec2-100-26-49-196.compute-1.amazonaws.com:3000/users/login",
      body
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
