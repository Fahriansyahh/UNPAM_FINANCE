import axios from "axios";

export const CreateInstitusions = async (data, history, setError) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  await axios
    .post(`${process.env.REACT_APP_URL_API}/api/institutions`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      history.push("/Institusions");
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.errors) {
        let error = err.response.data.errors;
        const errorArray = [];
        Object.keys(error).forEach((key) => {
          errorArray.push({
            [key]: {
              error: error[key][0],
            },
          });
        });
        setError(errorArray);
      } else {
        sessionStorage.clear();
        window.location.reload();
      }
    });
};

export const UpdateInstitution = async (params, data, Check) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  console.log(params);
  await axios
    .put(`${process.env.REACT_APP_URL_API}/api/institutions/${params}`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      Check(true);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSelectInstitution = async (Select) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  await axios
    .get(`${process.env.REACT_APP_URL_API}/api/institutions/all`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      const newOptions = response.data.data.map((item) => {
        return {
          value: item.id,
          label: item.institution_name,
          code: item.institution_code,
        };
      });
      newOptions.unshift({ label: "Pilihan", value: null });
      Select(newOptions);
    })
    .catch((err) => {
      console.log(err);
    });
};
