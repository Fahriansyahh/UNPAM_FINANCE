const columns = [
  {
    name: "Nama Kategori Arus Kas",
    selector: (row) => (
      <div>
        <i
          className="mdi mdi-marker-check mr-2"
          style={{ color: "#AF25F5" }}
        ></i>
        {row.cashflow_category_name}
      </div>
    ),
  },
  {
    name: "persentase",
    selector: (row) => (
      <div className="text-center">{row.percentage || "0"}</div>
    ),
    center: true,
  },
  {
    name: "Tipe Arus Kas",
    selector: (row) => <div>{row.cashflow_type.cashflow_type_name}</div>,
    center: true,
  },
  {
    name: "Nama Item Arus Kas",
    selector: (row) => (
      <div>
        <ul>
          {row.children.length <= 0 ? (
            <li>Tidak ada</li>
          ) : (
            row.children.map((a) => {
              return <li key={a.id}>{a.cashflow_category_name}</li>;
            })
          )}
        </ul>
      </div>
    ),
  },
  {
    name: "Terbuat",
    selector: (row) => {
      const CreatedAt = new Date(row.created_at);
      const formattedDate = CreatedAt.toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      return formattedDate;
    },
    right: true,
  },
  {
    name: "Aksi",
    selector: (row) => (
      <ul className="d-inline-block m-0 p-0" style={{ listStyle: "none" }}>
        <li className="d-inline-block m-0 p-0">
          <i
            className="mdi mdi-border-color"
            style={{ color: "blue" }}
            data-toggle="tooltip"
            data-placement="top"
            title="edit unit"
            onClick={() => {
              handleStorage(row);
            }}
          ></i>
        </li>
        <li
          className="d-inline-block m-0 p-0 m-1"
          data-toggle="tooltip"
          data-placement="top"
          title="hapus unit"
        >
          <DeleteUser
            name={row.id}
            urlApi="api/cashflow-categories"
            header="cashflow-categories"
          />
        </li>
      </ul>
    ),
    right: true,
    maxWidth: "50px",
  },
];
