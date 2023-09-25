import axios from "axios";

export const GetAllParent = (setOptionsName) => {
  const Locktoken = sessionStorage.getItem("key") || "";
  let token = Locktoken.slice(29);
  axios
    .get(`${process.env.REACT_APP_URL_API}/api/facility-types/all`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const newOptions = res.data.data.map((a) => {
        return {
          value: a.id,
          label: a.facility_type_name,
        };
      });
      newOptions.unshift({ label: "Buat Parent Baru", value: null });
      setOptionsName(newOptions);
    })

    .catch((err) => {
      console.log(err);
      sessionStorage.removeItem("key");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("editUser");
      sessionStorage.removeItem("idRoles");
      sessionStorage.removeItem("Units");
      window.location.reload();
    });
};

export const CreateApi = (data, setError, history) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  axios
    .post(`${process.env.REACT_APP_URL_API}/api/facility-types`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      history.push("/Facility_type");
    })
    .catch((err) => {
      if (err.response.status === 422) {
        setError(err.response.data.errors);
      }
    });
};

export const UpdateApi = (id, data, setError, history) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);

  axios
    .put(`${process.env.REACT_APP_URL_API}/api/facility-types/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      history.push("/Facility_type");
    })
    .catch((err) => {
      if (err.response.status === 422) {
        setError(err.response.data.errors);
      }
    });
};
