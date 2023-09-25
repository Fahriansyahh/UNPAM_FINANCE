import axios from "axios";

export const getParent = async (setOptionsParent, typeCategories) => {
  const Locktoken = sessionStorage.getItem("key") || "";
  let token = Locktoken.slice(29);
  await axios
    .get(
      `${process.env.REACT_APP_URL_API}/api/cashflow-categories?cashflow-type=${typeCategories}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      const newOptions = res.data.data.map((a) => {
        return {
          value: a.id,
          label: a.cashflow_category_name,
        };
      });
      newOptions.unshift({ label: "Pilihan", value: null });
      setOptionsParent(newOptions);
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

export const CreateCashflow = async (data, setError, history) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  await axios
    .post(`${process.env.REACT_APP_URL_API}/api/cashflow-categories`, data, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      history.push("/Cashflow_Categories");
    })
    .catch((err) => {
      if (err.response.status === 422) {
        setError(err.response.data.errors);
      }
    });
};

export const updateCashflow = async (data, setError, history) => {
  const LockToken = sessionStorage.getItem("key");
  let tokenApi = LockToken.slice(29);
  const id = sessionStorage.getItem("Cashflow");
  axios
    .put(
      `${process.env.REACT_APP_URL_API}/api/cashflow-categories/${id}`,
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
      history.push("/Cashflow_Categories");
    })
    .catch((err) => {
      if (err.response.status === 422) {
        setError(err.response.data.errors);
      }
    });
};

export const getCashflowId = async (setOldData) => {
  const Locktoken = sessionStorage.getItem("key") || "";
  let token = Locktoken.slice(29);
  const id = sessionStorage.getItem("Cashflow");
  await axios
    .get(`${process.env.REACT_APP_URL_API}/api/cashflow-categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setOldData(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const ChildrenCashflowApi = async (setDataChildren, id) => {
  const Locktoken = sessionStorage.getItem("key") || "";
  let token = Locktoken.slice(29);
  await axios
    .get(
      `${process.env.REACT_APP_URL_API}/api/cashflow-categories/parent/${id}/children`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      const newOptions = res.data.data.map((a) => {
        return {
          value: a.id,
          label: a.cashflow_category_name,
        };
      });
      newOptions.unshift({ label: "Pilihan", value: null });
      setDataChildren(newOptions);
    })
    .catch((err) => {
      console.log(err);
    });
};
