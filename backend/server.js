const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "testing",
});

app.get("/home", async (req, res) => {
  const { page, search } = req.query;

  const offset = parseInt(page - 1) * 15;
  const limit = 15;

  const totalData = await selectingAllData();

  const totalPageNumber = Math.ceil(+totalData.length / limit);

  let query;

  if (search !== "") {
    query = `SELECT * FROM customers WHERE customer_first_name LIKE '%${search}%' OR customer_last_name LIKE '%${search}%' OR customer_email LIKE '%${search}%' OR customer_gender = '${search}' OR customer_id LIKE '%${search}%' ORDER BY customer_id `;
  } else {
    query = "SELECT * FROM customers ORDER BY customer_id LIMIT ? OFFSET ?";
  }

  db.query(query, [limit, offset], (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result,
        totalPageNumber: totalPageNumber,
      });
    }
  });
});

const selectingAllData = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM customers";
    db.query(query, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

app.listen(3000, () => {
  console.log("listening to the port 3000");
});
