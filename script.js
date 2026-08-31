const STORAGE_KEY = "cyber_users";
const LOGGED_USER_KEY = "loggedInUser";

const defaultUsers = [
  { name: "Yarin", email: "yarin.luzon2009@gmail.com", password: "1234" },
  { name: "User Two", email: "user2@example.com", password: "abcd" },
  { name: "Test User", email: "test@mail.com", password: "secret" }
];

function getUsers() {
  const savedUsers = localStorage.getItem(STORAGE_KEY);

  if (!savedUsers) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return [...defaultUsers];
  }

  try {
    const parsedUsers = JSON.parse(savedUsers);
    if (Array.isArray(parsedUsers) && parsedUsers.length) {
      return parsedUsers;
    }
  } catch (error) {
    console.error("שגיאה בקריאת משתמשים מה-localStorage", error);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
  return [...defaultUsers];
}

function switchTab(tabName) {
  const panels = document.querySelectorAll(".tab-panel");
  const buttons = document.querySelectorAll(".tab-btn");

  panels.forEach(panel => {
    panel.classList.toggle("active", panel.id === `${tabName}-panel`);
  });

  buttons.forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });
}

function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

  if (user) {
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify({
      name: user.name || user.email,
      email: user.email
    }));

    window.location.href = "main.html";
    return true;
  }

  alert("אימייל או סיסמה שגויים. נסה שוב.");
  return false;
}

function signup(event) {
  event.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name || !email || !password) {
    alert("אנא מלא את כל השדות.");
    return false;
  }

  if (password.length < 4) {
    alert("הסיסמה חייבת להכיל לפחות 4 תווים.");
    return false;
  }

  const users = getUsers();
  const exists = users.some(user => user.email.toLowerCase() === email);

  if (exists) {
    alert("משתמש עם אימייל זה כבר קיים.");
    return false;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  localStorage.setItem(LOGGED_USER_KEY, JSON.stringify({ name, email }));

  alert("ההרשמה בוצעה בהצלחה!");
  document.getElementById("signupForm").reset();
  document.getElementById("email").value = email;
  switchTab("login");
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });
});
  
