import axios from "axios";
//! data tabel
export const dataTabel = async (
  urlApi,
  filterText,
  page,
  perPage,
  setData,
  setTotalRows,
  setLoading,
  history,
  params = "",
  categories = ""
) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken ? Locktoken.slice(29) : false;
  await axios
    .get(
      `${
        params
          ? process.env.REACT_APP_URL_API +
            "/" +
            urlApi +
            "?search=" +
            filterText +
            "&" +
            params +
            "=" +
            categories +
            "&page=" +
            page +
            "&limit=" +
            perPage
          : process.env.REACT_APP_URL_API +
            "/" +
            urlApi +
            "?search=" +
            filterText +
            "&page=" +
            page +
            "&limit=" +
            perPage
      }`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setData(response.data.data);
      setTotalRows(response.data.meta.total);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      if (!error.response.data.message) {
        sessionStorage.removeItem("key");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("editUser");
        sessionStorage.removeItem("idRoles");
        sessionStorage.removeItem("Units");
        history.push("/login");
      }
    });
};
//!backup data
export const backupData = async (
  urlApi,
  filterText,
  page,
  newPerPage,
  setData,
  setPerPage,
  setLoading,
  history,
  params = "",
  categories = ""
) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken ? Locktoken.slice(29) : false;
  await axios
    .get(
      `${
        params
          ? process.env.REACT_APP_URL_API +
            "/" +
            urlApi +
            "?search=" +
            filterText +
            "&" +
            params +
            "=" +
            categories +
            "&page=" +
            page +
            "&limit=" +
            newPerPage
          : process.env.REACT_APP_URL_API +
            "/" +
            urlApi +
            "?search=" +
            filterText +
            "&page=" +
            page +
            "&limit=" +
            newPerPage
      } `,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setData(response.data.data);
      setPerPage(newPerPage);
      setLoading(false);
    })
    .catch((error) => {
      if (error.response.data.meta.message) {
        sessionStorage.removeItem("key");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("editUser");
        sessionStorage.removeItem("idRoles");
        sessionStorage.removeItem("Units");
        history.push("/login");
      }
    });
};
