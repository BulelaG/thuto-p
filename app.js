// ===== MOCK USERS =====
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// ===== MOCK COURSES =====
const courses = [
  { id: 1, title: "Intro to Blockchain", description: "Learn blockchain basics.", lessons: ["What is Blockchain?", "How it works", "Use Cases"] },
  { id: 2, title: "Web3 Development", description: "Build dApps using Ethereum.", lessons: ["Solidity Basics", "Smart Contracts", "Deploying dApps"] },
  { id: 3, title: "Crypto Literacy", description: "Understand crypto and wallets.", lessons: ["Bitcoin Basics", "Wallets", "Trading Safely"] },
];

// ===== SIGNUP =====
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    users.push({ username, email, password, completed: [] });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created! Please login.");
    window.location.href = "login.html";
  });
}

// ===== LOGIN =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials");
    }
  });
}

// ===== RENDER COURSES =====
const container = document.getElementById("courses-container");
if (container) {
  courses.forEach(course => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${course.title}</h5>
            <p class="card-text">${course.description}</p>
            <a href="course-view.html?id=${course.id}" class="btn btn-primary">View Course</a>
          </div>
        </div>
      </div>
    `;
  });
}

// ===== COURSE VIEW =====
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("id");
const courseTitle = document.getElementById("course-title");
const courseDesc = document.getElementById("course-desc");
const lessonsList = document.getElementById("lessons-list");
const completeBtn = document.getElementById("completeCourseBtn");

if (courseId && courseTitle && courseDesc && lessonsList && completeBtn) {
  const course = courses.find(c => c.id == courseId);
  courseTitle.textContent = course.title;
  courseDesc.textContent = course.description;

  course.lessons.forEach(lesson => {
    lessonsList.innerHTML += `<li class="list-group-item">${lesson}</li>`;
  });

  completeBtn.addEventListener("click", () => {
    // mark as complete (mock)
    if (!currentUser.completed) currentUser.completed = [];
    if (!currentUser.completed.includes(course.id)) {
      currentUser.completed.push(course.id);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      alert("Course completed! Reward earned!");
      // show modal
      const rewardModal = new bootstrap.Modal(document.getElementById("rewardModal"));
      rewardModal.show();
    }
  });
}
