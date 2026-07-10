const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") return;
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// 体験申込ボタンのクリック計測（GA4）
const FORM_TYPES = {
  "txECyhPidZpDASPv8": "教室",
  "PtLPhcia77xdy3EHA": "オンライン",
};

document.querySelectorAll('a[href*="forms.gle"]').forEach((link) => {
  link.addEventListener("click", () => {
    if (typeof gtag !== "function") return;
    const id = Object.keys(FORM_TYPES).find((key) => link.href.includes(key));
    gtag("event", "trial_form_click", {
      form_type: id ? FORM_TYPES[id] : "不明",
      link_text: link.textContent.trim(),
    });
  });
});
