import { memo } from "react";

const DataTable = memo(({ data, lastTableRow }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => {
          if (data.length === i + 1) {
            return (
              <tr
                key={i}
                style={{
                  height: "100px",
                }}
                ref={lastTableRow}
              >
                <td>{item.customer_id}</td>
                <td>{item.customer_first_name}</td>
                <td>{item.customer_last_name}</td>
                <td>{item.customer_email}</td>
                <td>{item.customer_gender}</td>
              </tr>
            );
          } else {
            return (
              <tr
                key={i}
                style={{
                  height: "100px",
                }}
              >
                <td>{item.customer_id}</td>
                <td>{item.customer_first_name}</td>
                <td>{item.customer_last_name}</td>
                <td>{item.customer_email}</td>
                <td>{item.customer_gender}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
});

export default DataTable;
