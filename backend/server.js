import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Bankens data
const users = [];
const accounts = [];
const sessions = [];

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Din kod här. Skriv dina arrayer

// Users
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(user);
  console.log("Users: ", users);
});

// Account
// app.get("/accounts", (req, res) => {
//   res.json(accounts);
// });
let id = 0;

app.post("/accounts", (req, res) => {
  const account = req.body;
  const newAccount = {id: id++, ...account};
  accounts.push(newAccount);
  res.json(newAccount);
  console.log("Account: ", accounts);
});

// accounts.push({id, userID: user.id, amount: 0});
// Din kod här. Skriv dina routes:

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}
    `);
});

// Använd denna när du vill randera ut alla användare

// app.delete("/todos", (req, res) => {
//   todos = []; // Reset the array
//   res.send("All todos have been deleted!");
// });
