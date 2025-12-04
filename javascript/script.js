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

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

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