import axios from "axios";
export const LoginUserApi = (data, setError, setLoading, history) => {
  axios
    .post(`${process.env.REACT_APP_URL_API}/api/login`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      sessionStorage.setItem(
        "key",
        `1hLJn7bKqW3mVfIg9XoZtUDpYcExr${res.data.data.token.access_token}`
      );
      const user = res.data.data.user;
      sessionStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, name: user.name })
      );
      setError(false);
      setLoading(false);
      history.push("/dashboard");
    })
    .catch((err) => {
      sessionStorage.removeItem("key");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("editUser");
      sessionStorage.removeItem("idRoles");
      sessionStorage.removeItem("Units");

      setError(err.response.data.errors || err.response.data.meta.message);
      setLoading(false);
      console.log(err);
    });
};

export const LogoutUser = (history) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  axios
    .post(
      `${process.env.REACT_APP_URL_API}/api/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
      sessionStorage.removeItem("key");
      history.push("/login");
    })
    .catch((err) => {
      sessionStorage.removeItem("key");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("editUser");
      sessionStorage.removeItem("idRoles");
      sessionStorage.removeItem("Units");

      history.push("/login");
      console.log(err);
    });
};

export const CreateUser = (data, history, setError) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  axios
    .post(`${process.env.REACT_APP_URL_API}/api/users`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      history.push("/user");
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 422) {
        setError(err.response.data.errors);
      } else {
        sessionStorage.removeItem("key");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("editUser");
        sessionStorage.removeItem("idRoles");
        sessionStorage.removeItem("Units");

        history.push("/login");
      }
    });
};

export const UpdateUser = (
  data,
  editUser,
  history,
  setError,
  setErrorNewPassword
) => {
  const LockToken = sessionStorage.getItem("key");
  let tokenApi = LockToken.slice(29);

  axios
    .put(
      `${process.env.REACT_APP_URL_API}/api/users/${editUser.username}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokenApi}`,
        },
      }
    )
    .then(() => {
      history.push("/user");
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 422) {
        if (err.response.data.errors) {
          setError(err.response.data.errors);
        } else if (err.response.data.meta.message) {
          setErrorNewPassword(err.response.data.meta.message);
        }
      }
    });
};
