const projects = [
  {
    title: "CourseTwin",
    description:
      "A responsive web application built with HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",
    imageUrl: "../images/coursetwin.png",
    liveUrl: "https://eduaithon.vercel.app/",
    codeUrl: "https://github.com/hemanthcs34/recycle.git",
  },
  {
    title: "EcoCycle",
    description:
      "A concept design and front-end implementation for an eco-friendly platform. Focused on a clean UI, responsive product grids, and a streamlined user experience using modern CSS techniques.",
    imageUrl: "../images/ecocycle.png",
    liveUrl: "#",
    codeUrl: "https://github.com/your-username/ecocycle-repo",
  },
  {
    title: "Banking App",
    description:
      "A mock banking interface demonstrating responsive UI and secure UX patterns. Built with HTML, CSS, and vanilla JS.",
    imageUrl: "../images/banking.png",
    liveUrl: "#",
    codeUrl: "https://github.com/hemanthcs34/bfsi-loan-agent-.git",
  },
];




const themeToggle = document.querySelector("#theme-toggle");
const htmlElement = document.documentElement;
const projectsContainer = document.querySelector(".project-container");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const renderProjects = () => {
  let allProjectsHTML = '';

  projects.forEach((project) => {
    const projectCardHTML = `
    <div class ="project-card">
     <div class = "project-image-container">
      <img src="${project.imageUrl}"
      alt="Screenshot of ${project.title} project"
      class = "project-image">
      </div>
      <div class = "project-info">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class = "project-links">
      <a 
      href = "${project.liveUrl}"
      class = "btn"
      target = "_blank"
      rel = "noopener noreferrer"
      >
       Live Demo 
       </a>
       <a
       href = "${project.codeUrl}"
       class = "btn btn-secondary"
       target = "_blank"
       rel = "noopener noreferrer"
       >
       View Code
       </a>
      </div>
     </div>
    </div>
    `;
    allProjectsHTML +=projectCardHTML;
     });
  if (projectsContainer) projectsContainer.innerHTML = allProjectsHTML;
    
};

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

(()=>{
   const savedTheme = localStorage.getItem('theme');

   if(savedTheme){

    htmlElement.setAttribute('data-theme', savedTheme);

   }

  if (savedTheme === "dark" && themeToggle) {
    themeToggle.checked = true;
  }
})();

document.addEventListener('DOMContentLoaded',()=> {
  renderProjects();

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formdata = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (formStatus) {
        formStatus.innerHTML = "Sending...";
        formStatus.className = "info";
        formStatus.style.display = "block";
      }
      if (submitButton) submitButton.disabled = true;

      fetch(contactForm.action, {
        method: "POST",
        body: formdata,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            if (formStatus) {
              formStatus.innerHTML = "Thank you! Your message has been sent.";
              formStatus.className = "success";
            }
            contactForm.reset();
          } else {
            return response.json().then((data) => {
              if (data && data.errors) {
                if (formStatus) formStatus.innerHTML = data.errors.map((e) => e.message).join(", ");
              } else {
                if (formStatus) formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
              }
              if (formStatus) formStatus.className = "error";
            });
          }
        })
        .catch((error) => {
          if (formStatus) {
            formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
            formStatus.className = "error";
          }
        })
        .finally(() => {
          if (submitButton) submitButton.disabled = false;
        });
    });
  }
});
