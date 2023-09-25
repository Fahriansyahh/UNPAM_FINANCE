import axios from "axios";

export const getItemsAsset = async (url, Select, label, signal) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken ? Locktoken.slice(29) : false;
  await axios
    .get(`${process.env.REACT_APP_URL_API}/${url}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: signal,
    })
    .then(async (response) => {
      const newOptions = await response.data.data.map((a) => {
        let data;
        switch (label) {
          case "unit":
            data = a.unit_name;
            break;
          case "parent":
            data = a.facility_type_name;
            break;
          default:
            data = undefined;
            break;
        }
        return {
          value: a.id,
          label: data,
        };
      });

      newOptions.unshift({ label: "null", value: null });
      Select(newOptions);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getChild = async (parent, Select, signal, index) => {
  if (parent) {
    const Locktoken = sessionStorage.getItem("key");
    let token = Locktoken ? Locktoken.slice(29) : false;
    console.log(parent);
    await axios
      .get(
        `${process.env.REACT_APP_URL_API}/api/facility-types/parent/${parent}/children`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: signal,
        }
      )
      .then(async (response) => {
        console.log(response);
        const newOptions = response.data.data.map((item) => {
          return {
            value: item.id,
            label: item.facility_type_name,
          };
        });
        newOptions.unshift({ label: "Pilihan", value: null });
        console.log(index);
        Select((prevState) => {
          let updatedParent = [];
          if (Array.isArray(prevState)) {
            updatedParent = [...prevState];
          }
          updatedParent[index] = newOptions; // Add new element at the given index
          return updatedParent;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const create_Asset = async (data, setError, history, signal) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  await axios
    .post(`${process.env.REACT_APP_URL_API}/api/assets`, data, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: signal,
    })
    .then(() => {
      history.push("/finance/Asset");
    })
    .catch((err) => {
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
      console.log(err);
    });
};

export const AssetShow = async (setOldData, signal) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken ? Locktoken.slice(29) : false;
  let id = sessionStorage.getItem("idAsset");
  await axios
    .get(`${process.env.REACT_APP_URL_API}/api/assets/${id}`, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    })
    .then((response) => {
      setOldData(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const UpdateAsset = async (data, setError, history, signal) => {
  const Locktoken = sessionStorage.getItem("key");
  let token = Locktoken.slice(29);
  let id = sessionStorage.getItem("idAsset");
  await axios
    .post(`${process.env.REACT_APP_URL_API}/api/assets/${id}`, data, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    })
    .then(() => {
      history.push("/finance/Asset");
    })
    .catch((err) => {
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
      console.log(err);
    });
};
