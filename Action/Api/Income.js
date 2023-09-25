import axios from "axios";

export const GetItemIncome = async (setData) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken ? Locktoken.slice(29) : false;
  let id = sessionStorage.getItem("Income");
  await axios
    .get(`${process.env.REACT_APP_URL_API}/api/earnings/${id}`, {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setData(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const CreateIncomeApi = async (data, history, setError) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  await axios
    .post(`${process.env.REACT_APP_URL_API}/api/earnings`, data, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      history.push("/finance/Income");
    })
    .catch((err) => {
      console.log(err);
      setError(err.response.data.errors);
    });
};

export const UpdateIncome = async (data, history, setError) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  let id = sessionStorage.getItem("Income");
  await axios
    .post(`${process.env.REACT_APP_URL_API}/api/earnings/${id}`, data, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      history.push("/finance/Income");
    })
    .catch((err) => {
      console.log(err);
      // setError(err.response.data.errors);
    });
};
