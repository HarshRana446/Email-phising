const API_URL = "http://localhost:5000/api"; // Change if deployed

// Register
async function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.msg || "Registered!";
}

// Login
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText = data.msg || "Login failed.";
  }
}

// Check Email
async function checkEmail() {
  const emailText = document.getElementById("emailText").value;
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ emailText }),
  });

  const data = await res.json();
  document.getElementById("result").innerText = data.result || data.msg || "Error";
}
