document.addEventListener("DOMContentLoaded", () => {
  const base_div = document.getElementsByClassName("hidden-div")[0];
  console.log(base_div);
  const form = document.getElementById("ticketForm");
  const ticketOutput = document.getElementById("ticketOutput");
  const outputName = document.getElementById("outputName");
  const outputEmail = document.getElementById("outputEmail");
  const ticketName = document.getElementById("ticketName");
  const ticketAvatar = document.getElementById("ticketAvatar");
  const ticketGithub = document.getElementById("ticketGithub");
  const uploadArea = document.querySelector(".upload-area");
  const fileInput = document.createElement("input");
  const githubName = document.getElementsByClassName("name-github")[0];
  const time = document.getElementsByClassName("time")[0];

  fileInput.type = "file";
  fileInput.accept = "image/jpeg, image/png";
  fileInput.style.display = "none";

  uploadArea.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 500 * 1024) {
      const reader = new FileReader();
      reader.onload = (event) => {
        ticketAvatar.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert("File too large. Please upload a photo under 500KB.");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const github = document.getElementById("github").value.trim();

    if (!fullName || !email || !github) {
      alert("Please fill out all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    console.log(new Date().now);
    time.innerText = new Date().toLocaleString();
    outputName.textContent = fullName;
    outputEmail.textContent = email;
    ticketName.textContent = fullName;
    ticketGithub.textContent = github;
    githubName.innerText = github;
    ticketOutput.classList.remove("hidden");
    base_div.classList.add("hidden");
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
