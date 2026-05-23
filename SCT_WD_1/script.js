const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");
const revealButtons = document.querySelectorAll("[data-show]");
const scrollButtons = document.querySelectorAll("[data-scroll]");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const faqQuestions = document.querySelectorAll(".faq-question");
const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

/* Navbar Color Change on Scroll */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

/* Mobile Menu Toggle */
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* Active Link Highlight */
links.forEach(link => {
  link.addEventListener("click", () => {

    links.forEach(nav => nav.classList.remove("active"));

    link.classList.add("active");

    navLinks.classList.remove("active");
  });
});

/* Show Content When Buttons Are Clicked */
revealButtons.forEach(button => {
  button.addEventListener("click", () => {
    const contentId = button.dataset.show;
    const content = document.getElementById(contentId);

    if (!content) return;

    content.classList.toggle("hidden");
    button.textContent = content.classList.contains("hidden") ? "Read More" : "Show Less";

    if (contentId === "intro-content") {
      button.textContent = content.classList.contains("hidden") ? "Explore More" : "Show Less";
    }

    if (contentId === "contact-content") {
      button.textContent = content.classList.contains("hidden") ? "Show Contact Details" : "Hide Contact Details";
    }
  });
});

/* Smooth Scroll Buttons */
scrollButtons.forEach(button => {
  button.addEventListener("click", () => {
    const section = document.querySelector(button.dataset.scroll);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* Project Filters */
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach(card => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

/* FAQ Toggle */
faqQuestions.forEach(question => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;

    if (answer) {
      answer.classList.toggle("hidden");
    }
  });
});

/* Animated About Counters */
const animateCounters = () => {
  counters.forEach(counter => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 40));

    const updateCounter = () => {
      current += increment;

      if (current >= target) {
        counter.textContent = `${target}+`;
        return;
      }

      counter.textContent = current;
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  });
};

const counterObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    animateCounters();
  }
}, { threshold: 0.4 });

const aboutSection = document.getElementById("about");

if (aboutSection) {
  counterObserver.observe(aboutSection);
}
