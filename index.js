const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

let sql;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.listen(3001);

const db = new sqlite3.Database(
  "./invoices.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);

app.get("/", (request, response) => {
  const {
    filterFinancialYear,
    filterInvoiceNumber,
    filterFromDate,
    filterToDate,
  } = request.query;

  sql = `SELECT * FROM details`;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    response.send(rows);
  });
});

//sql = `CREATE TABLE details(id INTEGER PRIMARY KEY AUTOINCREMENT,InvoiceDate TEXT NOT NULL,InvoiceNumber INTEGER NOT NULL,InvoiceAmount REAL NOT NULL,FinancialYear TEXT NOT NULL,UNIQUE (FinancialYear, InvoiceNumber))`;
//db.run(sql);

//sql = `INSERT INTO details (InvoiceDate, InvoiceNumber, InvoiceAmount, FinancialYear) VALUES (?, ?, ?, ?)`;

//db.run(
//  sql,
//  ["03-08-2022", 2, 200.0, "2022"],
//  ["07-05-2023", 4, 150.0, "2023"],
//  ["01-10-2021", 1, 250.0, "2021"],
//  (err) => {
//    if (err) return console.error(err.message);
//  }
//);

sql = `SELECT * FROM details WHERE FinancialYear = "2022" AND InvoiceNumber = 2 AND InvoiceDate BETWEEN "01-08-2022" AND "10-08-2022"`;

db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach((row) => {
    console.log(row);
  });
});

//sql = `DELETE FROM details`;

//db.run(sql, (err) => {
//  if (err) return console.error(err.message);

//  console.log("deleted");
//});
