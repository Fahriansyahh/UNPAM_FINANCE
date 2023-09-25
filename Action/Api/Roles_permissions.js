import axios from "axios";

export const GetAllPermisions = (setData) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken ? Locktoken.slice(29) : false;
  axios
    .get(`${process.env.REACT_APP_URL_API}/api/permissions`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      setData(data.data.permissions);
    })
    .catch((err) => {
      sessionStorage.removeItem("key");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("editUser");
      sessionStorage.removeItem("idRoles");
      sessionStorage.removeItem("Units");
      window.location.reload();
      console.log(err);
    });
};

export const CreatePermission = (dataApi, setError, history) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  axios
    .post(`${process.env.REACT_APP_URL_API}/api/roles`, dataApi, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      history.push("/Roles_Permission");
    })
    .catch((err) => {
      if (err.response.status === 422) {
        setError(err.response.data.errors);
      }
    });
};

export const getApiId = (Roles, setActive, setData) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken ? Locktoken.slice(29) : false;
  axios
    .get(
      `${process.env.REACT_APP_URL_API}/api/roles/${Roles}
    `,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => {
      setActive(data.data.permissions);
      setData(data.data.permissions);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateApi = (dataApi, history, setError, RolesId) => {
  const LockToken = sessionStorage.getItem("key");
  let tokenApi = LockToken.slice(29);
  axios
    .put(`${process.env.REACT_APP_URL_API}/api/roles/${RolesId}`, dataApi, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenApi}`,
      },
    })
    .then(() => {
      history.push("/Roles_Permission");
    })
    .catch((err) => {
      if (err.response.status === 422) {
        setError(err.response.data.errors);
      }
    });
};
