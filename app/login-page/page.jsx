"use client";
import useLogin from "@/context/LoginContext";
import {useState, useEffect} from "react";

export default function LoginPage() {
  const {isLogin, setIsLogin} = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  // Get users
  async function getUsers() {
    const response = await fetch("http://localhost:4000/users", {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
  }
  useEffect(() => {
    getUsers();
  }, []);

  // Add users
  async function addUsers(e) {
    e.preventDefault();

    const userExists = users.some((user) => user.email === email.toLowerCase());
    if (userExists) {
      alert("User already exists");
      return;
    }

    const newUser = {email, password, id: Date.now()};
    const newAccount = {userID: newUser.id, amount: 0};

    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    await fetch("http://localhost:4000/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    });

    setUsers([...users, newUser]);
    setEmail("");
    setPassword("");
    alert("User added successfully");
  }

  async function handleSignIn(e) {
    e.preventDefault();

    const user = users.find(
      (user) => user.email === email.toLowerCase() && user.password === password
    );

    if (user) {
      alert("Login sucessful!");
      setIsLogin(true);
    } else {
      alert("Invalid username or password. Please try again.");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <div className="md:w-[600px] mx-2 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>
          <p className="text-gray-500 mt-2">
            {isLogin
              ? "Welcome back! Please enter your details"
              : "Create an account to get started"}
          </p>
        </div>

        <form onSubmit={isLogin ? handleSignIn : addUsers}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md  "
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Register -->" : "Already have an account?"}
            <button
              className="font-medium text-blue-600 hover:text-blue-500"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
