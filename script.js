document.addEventListener("DOMContentLoaded", () => {
  const tips = document.querySelectorAll(".tip");

  tips.forEach((tip) => {
    const title = tip.querySelector(".tip-title");
    const content = tip.querySelector(".tip-content");

    title.addEventListener("click", () => {
      const isOpen = tip.classList.contains("open");

      // Close all open tips
      document.querySelectorAll(".tip.open").forEach((openTip) => {
        openTip.classList.remove("open");
        openTip.querySelector(".tip-content").style.maxHeight = null;
        const toggleSymbol = openTip.querySelector(".toggle");
        if (toggleSymbol) toggleSymbol.textContent = "＋";
      });

      // Open clicked tip if it wasn't already open
      if (!isOpen) {
        tip.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";

        const toggleSymbol = title.querySelector(".toggle");
        if (toggleSymbol) toggleSymbol.textContent = "－";
      }
    });
  });
});
// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme);

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(currentTheme);
  localStorage.setItem('theme', currentTheme);
  themeToggle.textContent = currentTheme === 'light' ? '🌙 Toggle Theme' : '☀️ Toggle Theme';
});
// Search Bar Functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
  const filter = searchInput.value.toLowerCase();
  const tips = document.querySelectorAll('.tip');

  tips.forEach(tip => {
    const title = tip.querySelector('.tip-title').textContent.toLowerCase();
    const content = tip.querySelector('.tip-content').textContent.toLowerCase();
    if (title.includes(filter) || content.includes(filter)) {
      tip.style.display = '';
    } else {
      tip.style.display = 'none';
    }
  });
});
// Filter Functionality
const sectionFilters = document.querySelectorAll('.sectionFilter');
sectionFilters.forEach(filter => {
  filter.addEventListener('change', () => {
    const section = document.getElementById(filter.value);
    section.style.display = filter.checked ? '' : 'none';
  });
});
// Toggle Tip Content (expand/collapse)
const tipTitles = document.querySelectorAll('.tip-title');
tipTitles.forEach(title => {
  title.addEventListener('click', () => {
    const content = title.nextElementSibling;
    const isOpen = content.style.maxHeight;

    // Close all tips
    document.querySelectorAll('.tip-content').forEach(content => {
      content.style.maxHeight = null;
    });

    // Open or close current tip
    content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
  });
});
// Search filter functionality
document.getElementById('searchInput').addEventListener('input', function() {
  let searchQuery = this.value.toLowerCase();
  let tips = document.querySelectorAll('.tip');

  tips.forEach(tip => {
    let title = tip.querySelector('.tip-title').textContent.toLowerCase();
    if (title.includes(searchQuery)) {
      tip.style.display = 'block';
    } else {
      tip.style.display = 'none';
    }
  });
});

// Section filter functionality
let filters = document.querySelectorAll('.sectionFilter');
filters.forEach(filter => {
  filter.addEventListener('change', function() {
    let section = document.getElementById(this.value);
    if (this.checked) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
});

// Theme toggle functionality
document.getElementById('themeToggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');
});

// Initial setup based on filters
document.addEventListener('DOMContentLoaded', function() {
  let sections = document.querySelectorAll('.tips-section');
  sections.forEach(section => {
    let checkbox = document.querySelector(`.sectionFilter[value="${section.id}"]`);
    if (!checkbox.checked) {
      section.style.display = 'none';
    }
  });
});
// Smooth Expand/Collapse for Tips
document.querySelectorAll('.tip-title').forEach(title => {
  title.addEventListener('click', () => {
    const content = title.nextElementSibling;
    const icon = title.querySelector('span');
    content.classList.toggle('expanded');
    icon.textContent = content.classList.contains('expanded') ? '−' : '+';
  });

  // Keyboard accessibility
  title.setAttribute('tabindex', '0');
  title.addEventListener('keypress', e => {
    if (e.key === 'Enter') title.click();
  });
});

// Live Search + Highlight
document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const tips = document.querySelectorAll('.tip');
  let visibleCount = 0;

  tips.forEach(tip => {
    const titleEl = tip.querySelector('.tip-title');
    const titleText = titleEl.textContent.toLowerCase();

    if (titleText.includes(query)) {
      tip.style.display = 'block';
      visibleCount++;

      // Highlight match
      const originalText = titleEl.textContent;
      const regex = new RegExp(`(${query})`, 'gi');
      const highlighted = originalText.replace(regex, `<mark>$1</mark>`);
      titleEl.innerHTML = highlighted + `<span>${tip.querySelector('.tip-content').classList.contains('expanded') ? '−' : '+'}</span>`;
    } else {
      tip.style.display = 'none';
      titleEl.innerHTML = titleEl.textContent; // Reset highlight
    }
  });

  updateTipCount(visibleCount);
});

// Section Filter Logic
document.querySelectorAll('.sectionFilter').forEach(filter => {
  filter.addEventListener('change', () => {
    const section = document.getElementById(filter.value);
    section.style.display = filter.checked ? 'block' : 'none';
    updateVisibleTips();
  });
});

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// Tip Counter Display
function updateTipCount(count) {
  let counter = document.getElementById('tipCounter');
  if (!counter) {
    counter = document.createElement('div');
    counter.id = 'tipCounter';
    counter.style.textAlign = 'center';
    counter.style.marginTop = '1rem';
    document.querySelector('main').prepend(counter);
  }
  counter.textContent = `${count} tip${count !== 1 ? 's' : ''} shown`;
}

// Update Tip Count When Filters Change
function updateVisibleTips() {
  const visibleTips = [...document.querySelectorAll('.tip')].filter(t => t.offsetParent !== null);
  updateTipCount(visibleTips.length);
}

// Sticky Header Shadow
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// On Load Setup
document.addEventListener('DOMContentLoaded', () => {
  updateVisibleTips();
});
document.querySelectorAll('.tip-title').forEach(title => {
  title.addEventListener('click', () => {
    const tip = title.parentElement;
    tip.classList.toggle('active');
  });
});
