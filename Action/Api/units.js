import axios from "axios";
export const Created_Units = (
  data,
  setError,
  setSuccess,
  setLoading,
  toast
) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  setLoading(true);
  axios
    .post(`${process.env.REACT_APP_URL_API}/api/units`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Buat Satuan Berhasil");
    })
    .catch((err) => {
      setLoading(false);
      toast.error("Buat Satuan Gagal");
      console.log(err);
      setSuccess(false);
      if (err.response.status === 422) {
        setError(err.response.data.errors);
      }
    });
};

export const UpdateUnit = (
  data,
  setError,
  UnitKey,
  setSuccess,
  setLoading,
  toast
) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  setLoading(true);
  axios
    .put(`${process.env.REACT_APP_URL_API}/api/units/${UnitKey}`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Buat Satuan Berhasil");
    })
    .catch((err) => {
      setLoading(false);
      toast.error("Buat Satuan Gagal");
      setSuccess(false);
      if (err.response.status === 422) {
        setError(err.response.data.errors);
      }
    });
};
