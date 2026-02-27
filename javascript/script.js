// Auto-update footer year
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  // Mark active drawer link based on current page
  const drawerLinks = document.querySelectorAll(".nav-drawer__link");
  drawerLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});

// Theme toggle (light/dark with localStorage)
const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// Left-side drawer
const navToggle = document.querySelector(".nav-toggle");
const navDrawer = document.getElementById("navDrawer");
const navOverlay = document.getElementById("navOverlay");
const navDrawerClose = document.querySelector(".nav-drawer__close");

function openDrawer() {
  if (!navDrawer || !navOverlay) return;
  navDrawer.classList.add("is-open");
  navOverlay.classList.add("is-active");
  navToggle && navToggle.classList.add("is-active");
  navToggle && navToggle.setAttribute("aria-expanded", "true");
  navDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  if (!navDrawer || !navOverlay) return;
  navDrawer.classList.remove("is-open");
  navOverlay.classList.remove("is-active");
  navToggle && navToggle.classList.remove("is-active");
  navToggle && navToggle.setAttribute("aria-expanded", "false");
  navDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navDrawer && navDrawer.classList.contains("is-open");
    isOpen ? closeDrawer() : openDrawer();
  });
}
if (navOverlay) {
  navOverlay.addEventListener("click", closeDrawer);
}
if (navDrawerClose) {
  navDrawerClose.addEventListener("click", closeDrawer);
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navDrawer && navDrawer.classList.contains("is-open")) closeDrawer();
});

// Simple search handler
const searchForm = document.querySelector(".search");
if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = searchForm.querySelector(".search-input");
    const resultsSection = document.querySelector(".search-results");
    if (input && resultsSection) {
      const query = input.value.trim();
      if (query) {
        resultsSection.innerHTML = `<p>Search results for "<strong>${query}</strong>" will appear here.</p>`;
      } else {
        resultsSection.innerHTML = `<p>Please enter a search term.</p>`;
      }
    }
  });
}