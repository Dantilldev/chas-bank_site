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

// Användare

// Din kod här. Skriv dina arrayer

// 🟢 Lägg till användare (POST /users)

app.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(user);
  console.log(users);
});
// Din kod här. Skriv dina routes:

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`);
});

// Använd denna när du vill randera ut alla användare

// app.delete("/todos", (req, res) => {
//   todos = []; // Reset the array
//   res.send("All todos have been deleted!");
// });
