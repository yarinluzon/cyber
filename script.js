// רשימת משתמשים מורשים (ניתן להוסיף כמה שתרצה)
const users = [
    { email: "yarin.luzon2009@gmail.com", password: "1234" },
    { email: "user2@example.com", password: "abcd" },
    { email: "test@mail.com", password: "secret" }
  ];
  
  function login(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      // התחברות הצליחה
      window.location.href = "main.html";
    } else {
      alert("אימייל או סיסמה שגויים. נסה שוב.");
    }
  }
  