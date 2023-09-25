import axios from "axios";
export const GetItemExpense = async (setData) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken ? Locktoken.slice(29) : false;
  let id = sessionStorage.getItem("Expense");
  await axios
    .get(`${process.env.REACT_APP_URL_API}/api/spendings/${id}`, {
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

export const CreateExpenseApi = async (data, history, setError) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  await axios
    .post(`${process.env.REACT_APP_URL_API}/api/spendings`, data, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      history.push("/finance/Expense");
    })
    .catch((err) => {
      setError(err.response.data.errors);
    });
};

export const UpdateExpense = async (data, history, setError) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  let id = sessionStorage.getItem("Expense");
  await axios
    .post(`${process.env.REACT_APP_URL_API}/api/spendings/${id}`, data, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      history.push("/finance/Expense");
    })
    .catch((err) => {
      console.log(err);
      // setError(err.response.data.errors);
    });
};

export const deleteImage = (uuid) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  axios
    .delete(`${process.env.REACT_APP_URL_API}/api/cashflow-proofs/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};
