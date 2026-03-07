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

// ── Search ────────────────────────────────────────────────────────────────────

// Resolve the path prefix needed to reach the site root from the current page.
// Uses the Digital Leaders home logo link as a reference point.
function getRootPath() {
  const brandLinks = document.querySelectorAll(".navbar__brand a.brand");
  const homeLink = brandLinks.length > 1 ? brandLinks[1] : brandLinks[0];
  if (!homeLink) return "";
  let href = homeLink.getAttribute("href") || "./";
  href = href.replace(/index\.html$/, "");
  return href === "./" ? "" : href;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Comprehensive search index covering all pages and events
const SEARCH_INDEX = [
  { title: "Home", url: "index.html", icon: "🏠", category: "Page",
    desc: "Student-led tech support, workshops, and leadership powering smarter learning at West Island School.",
    keywords: "home WIS Digital Leaders tech support workshops leadership west island school student" },
  { title: "About Us", url: "about/index.html", icon: "ℹ️", category: "Page",
    desc: "We empower students and staff with practical digital skills, reliable support, and responsible leadership.",
    keywords: "about us empower students staff digital skills support leadership" },
  { title: "Our Mission", url: "about/mission.html", icon: "🎯", category: "About",
    desc: "Enable smarter, safer, inclusive use of technology across WIS. Empowerment, Responsibility, Inclusion, Innovation.",
    keywords: "mission values empowerment responsibility inclusion innovation technology smarter safer vision" },
  { title: "What We Do", url: "about/what-we-do.html", icon: "💼", category: "About",
    desc: "Peer support for devices and apps, hands-on workshops, and school-wide digital initiatives.",
    keywords: "what we do peer support devices apps workshops digital initiatives staff collaboration automation" },
  { title: "How to Join", url: "about/how-to-join.html", icon: "📋", category: "About",
    desc: "Learn who can apply, what to expect, and how to submit your application to join Digital Leaders.",
    keywords: "how to join apply application who can criteria expectations requirements process" },
  { title: "The Team", url: "team/index.html", icon: "👥", category: "Team",
    desc: "Meet our four departments: Management, Design, Research, and Code.",
    keywords: "team departments management design research code structure organisation" },
  { title: "Design Team", url: "team/design/index.html", icon: "🎨", category: "Team",
    desc: "Our Design team handles UI/UX, branding, and web layout for Digital Leaders.",
    keywords: "design team UI UX branding web layout interface visual identity" },
  { title: "Code Team", url: "team/code/index.html", icon: "💻", category: "Team",
    desc: "Our Code team builds and maintains the Digital Leaders website and digital tools.",
    keywords: "code team programming development web build website software engineering" },
  { title: "Research Team", url: "team/research/index.html", icon: "🔬", category: "Team",
    desc: "Our Research team investigates digital trends to improve technology use at WIS.",
    keywords: "research team investigate digital trends technology improvement analysis study" },
  { title: "Management Team", url: "team/management/index.html", icon: "🏛️", category: "Team",
    desc: "Our Management team coordinates operations, planning, and communications.",
    keywords: "management team operations planning communications coordination administration" },
  { title: "Previous Events", url: "events/index.html", icon: "📅", category: "Events",
    desc: "Browse all our past and upcoming events: workshops, talks, hackathons, showcases, and more.",
    keywords: "events workshops talks hackathon showcase support sessions stall calendar" },
  { title: "Contact Us", url: "contact/index.html", icon: "📬", category: "Page",
    desc: "Find us at support sessions or reach out on Instagram @wis_digital_leaders.",
    keywords: "contact support sessions instagram social media get in touch help" },
  { title: "FAQ", url: "faq/index.html", icon: "❓", category: "Page",
    desc: "Answers to common questions about membership, roles, application, and more.",
    keywords: "FAQ frequently asked questions membership roles application apply recruitment schedule meet" },
  { title: "Join Digital Leaders", url: "recruitment/index.html", icon: "🚀", category: "Page",
    desc: "Applications are now open! Join the Digital Leaders and make a real impact at WIS.",
    keywords: "recruitment apply join application open form who can apply what we look for" },
  // Events
  { title: "Kick-Off Assembly", url: "events/index.html", icon: "📣", category: "Talk",
    desc: "Introduction to Digital Leaders for new members and interested students. (Sep 2024)",
    keywords: "kick off assembly introduction school community 2024" },
  { title: "Automation Basics", url: "events/index.html", icon: "⚙️", category: "Workshop",
    desc: "Intro workshop on scripts and workflow optimisation using Google Apps Script. (Sep 2024)",
    keywords: "automation basics scripts workflow optimisation google apps script 2024" },
  { title: "Digital Safety Day", url: "events/index.html", icon: "🔒", category: "Workshop",
    desc: "Session on cybersecurity, privacy, and responsible tech use for Year 9. (Oct 2024)",
    keywords: "digital safety cybersecurity privacy responsible tech use year 9 2024" },
  { title: "Coding Crash Course", url: "events/index.html", icon: "💻", category: "Workshop",
    desc: "Hands-on coding for beginners — building confidence with Python fundamentals. (Oct 2024)",
    keywords: "coding crash course beginners python fundamentals workshop 2024" },
  { title: "UI/UX Design Sprint", url: "events/index.html", icon: "🎨", category: "Initiative",
    desc: "Students designed and prototyped interfaces for a school app concept. (Nov 2024)",
    keywords: "UI UX design sprint prototype interface app concept 2024" },
  { title: "AI & Ethics Panel", url: "events/index.html", icon: "🤖", category: "Talk",
    desc: "Open discussion on artificial intelligence, bias, and responsible development. (Nov 2024)",
    keywords: "AI ethics panel artificial intelligence bias responsible development 2024" },
  { title: "Year-End Showcase", url: "events/index.html", icon: "🏆", category: "Showcase",
    desc: "Digital Leaders present projects and achievements from the first term. (Dec 2024)",
    keywords: "year end showcase projects achievements first term 2024" },
  { title: "Python Workshop II", url: "events/index.html", icon: "🐍", category: "Workshop",
    desc: "Intermediate Python: file handling, APIs, and data visualisation. (Jan 2025)",
    keywords: "python workshop intermediate file handling APIs data visualisation 2025" },
  { title: "Peer Support Drive", url: "events/index.html", icon: "🤝", category: "Support",
    desc: "Open drop-in sessions for students needing help with devices and apps. (Jan 2025)",
    keywords: "peer support drive drop-in students devices apps help 2025" },
  { title: "Web Development Intro", url: "events/index.html", icon: "🌐", category: "Workshop",
    desc: "Building responsive websites with HTML, CSS, and JavaScript from scratch. (Feb 2025)",
    keywords: "web development intro HTML CSS JavaScript responsive websites 2025" },
  { title: "Research Symposium", url: "events/index.html", icon: "🔬", category: "Showcase",
    desc: "Digital Leaders share findings on automation tools and digital literacy. (Feb 2025)",
    keywords: "research symposium automation tools digital literacy findings 2025" },
  { title: "Robotics Demo", url: "events/index.html", icon: "🤖", category: "Workshop",
    desc: "Hands-on demonstration of robotics kits and programming concepts. (Mar 2025)",
    keywords: "robotics demo kits programming concepts hands-on 2025" },
  { title: "Hackathon Prep", url: "events/index.html", icon: "🏃", category: "Initiative",
    desc: "Team-building and ideation session ahead of the school hackathon. (Mar 2025)",
    keywords: "hackathon prep team building ideation session 2025" },
  { title: "School Hackathon", url: "events/index.html", icon: "🏆", category: "Hackathon",
    desc: "24-hour challenge: teams build solutions to real WIS tech challenges. (Apr 2025)",
    keywords: "school hackathon 24 hour challenge teams solutions WIS tech 2025" },
  { title: "App Store Workshop", url: "events/index.html", icon: "📱", category: "Workshop",
    desc: "How to package, publish, and present an app to a real audience. (May 2025)",
    keywords: "app store workshop package publish present app audience 2025" },
  { title: "Digital Wellbeing Talk", url: "events/index.html", icon: "💚", category: "Talk",
    desc: "Balancing screen time, mental health, and healthy digital habits. (May 2025)",
    keywords: "digital wellbeing talk screen time mental health habits 2025" },
  { title: "End-of-Year Celebration", url: "events/index.html", icon: "🎉", category: "Showcase",
    desc: "Celebrating achievements and welcoming incoming Digital Leaders. (Jun 2025)",
    keywords: "end of year celebration achievements welcoming incoming 2025" },
  { title: "Open Day Tech Stall", url: "events/index.html", icon: "🎪", category: "Stall",
    desc: "Interactive tech stall at the WIS Open Day, showcasing student projects. (Oct 2024)",
    keywords: "open day tech stall WIS interactive student projects prospective families 2024" },
  { title: "STEM Fair Stall", url: "events/index.html", icon: "🔭", category: "Stall",
    desc: "Demos on coding, robotics, and app development at the school STEM Fair. (Nov 2024)",
    keywords: "STEM fair stall coding robotics app development demos 2024" },
  { title: "Community Expo Stall", url: "events/index.html", icon: "🌍", category: "Stall",
    desc: "Hands-on digital activities at the local community technology expo. (Mar 2025)",
    keywords: "community expo stall local technology digital activities 2025" },
  { title: "Inter-School Hackathon", url: "events/index.html", icon: "🤝", category: "Hackathon",
    desc: "Competed against other schools in a collaborative hackathon focused on sustainability. (Feb 2025)",
    keywords: "inter school hackathon collaborative sustainability problem solving 2025" },
  { title: "Spring Kick-Off Workshop", url: "events/index.html", icon: "🌸", category: "Workshop",
    desc: "Hands-on session introducing new tools and projects for the spring term. (Mar 2026)",
    keywords: "spring kick off workshop new tools projects spring term 2026" },
  { title: "Tech Trends Talk", url: "events/index.html", icon: "📡", category: "Talk",
    desc: "An overview of emerging technologies and their impact on schools and communities. (Mar 2026)",
    keywords: "tech trends talk emerging technologies impact schools communities 2026" },
  { title: "Digital Inclusion Initiative", url: "events/index.html", icon: "🤲", category: "Initiative",
    desc: "Planning session for improving access to digital resources for all students. (Mar 2026)",
    keywords: "digital inclusion initiative planning access digital resources students 2026" },
  { title: "Device Drop-In Support", url: "events/index.html", icon: "🛠️", category: "Support",
    desc: "Open drop-in for students and staff needing help with devices, apps, or accounts. (Mar 2026)",
    keywords: "device drop-in support students staff help devices apps accounts 2026" },
  { title: "Spring Project Showcase", url: "events/index.html", icon: "🌻", category: "Showcase",
    desc: "Digital Leaders present spring term projects to students, staff, and guests. (Mar 2026)",
    keywords: "spring project showcase digital leaders present staff guests 2026" },
];

// Badge colours per category
const BADGE_COLOURS = {
  Page: "#0077ff", About: "#27ae60", Team: "#9b59b6", Events: "#e67e22",
  Workshop: "#0077ff", Talk: "#9b59b6", Initiative: "#27ae60",
  Support: "#e67e22", Showcase: "#e74c3c", Hackathon: "#f39c12", Stall: "#1abc9c",
};

function doSearch(query) {
  if (!query || query.length < 2) return [];
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return SEARCH_INDEX
    .map((item) => {
      const hay = (item.title + " " + item.desc + " " + item.keywords).toLowerCase();
      const allMatch = words.every((w) => hay.includes(w));
      const anyMatch = words.some((w) => hay.includes(w));
      const titleMatch = words.some((w) => item.title.toLowerCase().includes(w));
      const score = (allMatch ? 10 : 0) + (anyMatch ? 3 : 0) + (titleMatch ? 4 : 0);
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.item);
}

let _searchDropdown = null;
let _searchDebounce = null;

function getOrCreateDropdown() {
  if (!_searchDropdown) {
    _searchDropdown = document.createElement("div");
    _searchDropdown.id = "search-dropdown";
    _searchDropdown.className = "search-dropdown";
    _searchDropdown.setAttribute("role", "listbox");
    _searchDropdown.setAttribute("aria-label", "Search suggestions");
    document.body.appendChild(_searchDropdown);
  }
  return _searchDropdown;
}

function positionDropdown() {
  const form = document.querySelector(".search");
  const dropdown = document.getElementById("search-dropdown");
  if (!form || !dropdown) return;
  const rect = form.getBoundingClientRect();
  dropdown.style.top = rect.bottom + 8 + "px";
  dropdown.style.right = window.innerWidth - rect.right + "px";
  dropdown.style.left = "auto";
}

function openDropdown(results, query) {
  const dropdown = getOrCreateDropdown();
  const root = getRootPath();
  dropdown.innerHTML = "";

  if (!results.length) {
    dropdown.innerHTML =
      '<div class="search-no-results">' +
      '<span class="search-no-results__icon">🔍</span>' +
      'No results for "<em>' + escapeHtml(query) + '</em>"' +
      "</div>";
  } else {
    const header = document.createElement("div");
    header.className = "search-dropdown__header";
    header.innerHTML =
      'Results for "<strong>' + escapeHtml(query) + '</strong>" ' +
      '<span class="search-dropdown__count">' + results.length + " found</span>";
    dropdown.appendChild(header);

    results.forEach((item) => {
      const colour = BADGE_COLOURS[item.category] || "#0077ff";
      const a = document.createElement("a");
      a.href = root + item.url;
      a.className = "search-result-card";
      a.setAttribute("role", "option");
      a.innerHTML =
        '<div class="search-result-card__meta">' +
        '<span class="search-result-card__icon" aria-hidden="true">' + item.icon + "</span>" +
        '<span class="search-result-card__badge" style="background:' + colour + '">' + escapeHtml(item.category) + "</span>" +
        '<span class="search-result-card__title">' + escapeHtml(item.title) + "</span>" +
        "</div>" +
        '<p class="search-result-card__desc">' + escapeHtml(item.desc) + "</p>";
      dropdown.appendChild(a);
    });
  }

  positionDropdown();
  dropdown.classList.add("is-open");
}

function closeDropdown() {
  const dropdown = document.getElementById("search-dropdown");
  if (dropdown) dropdown.classList.remove("is-open");
}

// Attach search behaviour
const searchForm = document.querySelector(".search");
const searchInput = searchForm && searchForm.querySelector(".search-input");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    clearTimeout(_searchDebounce);
    const q = searchInput.value.trim();
    if (q.length < 2) { closeDropdown(); return; }
    _searchDebounce = setTimeout(() => openDropdown(doSearch(q), q), 180);
  });

  searchInput.addEventListener("focus", () => {
    const q = searchInput.value.trim();
    if (q.length >= 2) openDropdown(doSearch(q), q);
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeDropdown(); searchInput.blur(); }
  });
}

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = (searchInput && searchInput.value.trim()) || "";
    if (q.length >= 2) openDropdown(doSearch(q), q);
    else closeDropdown();
  });
}

// Close dropdown on outside click
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search") && !e.target.closest("#search-dropdown")) {
    closeDropdown();
  }
});

// Keep dropdown aligned when window resizes
window.addEventListener("resize", positionDropdown);