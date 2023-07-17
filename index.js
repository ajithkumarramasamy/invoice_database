const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();

let sql;

app.get("/", (request, response) => {
  response.send("Hollo");
});

app.listen(3000);
const db = new sqlite3.Database(
  "./invoices.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);

//sql = `CREATE TABLE details(id INTEGER PRIMARY KEY AUTOINCREMENT,InvoiceDate TEXT NOT NULL,InvoiceNumber INTEGER NOT NULL,InvoiceAmount REAL NOT NULL,FinancialYear TEXT NOT NULL,UNIQUE (FinancialYear, InvoiceNumber))`;
//db.run(sql);

//sql = `INSERT INTO details (InvoiceDate, InvoiceNumber, InvoiceAmount, FinancialYear) VALUES (?, ?, ?, ?)`;

//db.run(sql, [08 / 04 / 2016, 1, 100, 2016], (err) => {
//  if (err) return console.error(err.message);
//});

sql = `SELECT * FROM details`;

db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach((row) => {
    console.log(row);
  });
});
