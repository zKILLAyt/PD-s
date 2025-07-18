
const auth = firebase.auth();

document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => alert("Erro: " + err.message));
});

function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

auth.onAuthStateChanged(user => {
  const isDashboard = window.location.pathname.includes("dashboard.html");
  if (isDashboard && !user) window.location.href = "login.html";
});
