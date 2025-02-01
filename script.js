document.addEventListener("DOMContentLoaded", () => {
  const base_div = document.getElementsByClassName("hidden-div")[0];
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
  const githubError = document.getElementById("github-error");
  const emailError = document.getElementById("email-error");
  const nameError = document.getElementById("name-error");
  const imageError = document.getElementById("image-error");

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
      imageError.classList.add("error");
    } else {
      imageError.innerText =
        "File too large. Please upload a photo under 500KB.";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const github = document.getElementById("github").value.trim();
    const imageFile = fileInput.files[0]; // Get the selected image file

    nameError.innerText = "";
    emailError.innerText = "";
    githubError.innerText = "";
    // imageError.innerText = ""; // Reset image error

    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const githubRegex = /@[A-Za-z0-9_-]+\/?$/;

    if (!fullName) {
      nameError.innerText = "Full name is required";
    } else if (!nameRegex.test(fullName)) {
      nameError.innerText =
        "Full name must be at least 2 characters and contain only letters and spaces";
    }

    if (!email) {
      emailError.innerText = "Email is required";
    } else if (!emailRegex.test(email)) {
      emailError.innerText = "Please enter a valid email address";
    }

    if (!github) {
      githubError.innerText = "GitHub URL is required";
    } else if (!githubRegex.test(github)) {
      githubError.innerText = "Please enter a valid GitHub URL";
    }

    if (!imageFile) {
      imageError.classList.add("error");
    }

    if (
      nameError.innerText === "" &&
      emailError.innerText === "" &&
      githubError.innerText === "" &&
      
    ) {
      time.innerText = new Date().toLocaleString();
      outputName.textContent = fullName;
      outputEmail.textContent = email;
      ticketName.textContent = fullName;
      ticketGithub.textContent = github;
      githubName.innerText = github;
      ticketOutput.classList.remove("hidden");
      base_div.classList.add("hidden");
    }
  });
});
