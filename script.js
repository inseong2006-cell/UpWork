// Service card popup (modal) using data-title and data-text
document.addEventListener("DOMContentLoaded", () => {
  // 1) Create modal HTML once and inject into the page
  const modal = document.createElement("div");
  modal.className = "service-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="service-modal__backdrop" data-close="true"></div>

    <div class="service-modal__panel" role="dialog" aria-modal="true" aria-labelledby="serviceModalTitle">
      <button class="service-modal__close" type="button" aria-label="Close" data-close="true">✕</button>
      <h3 id="serviceModalTitle" class="service-modal__title"></h3>
      <p class="service-modal__text"></p>
    </div>
  `;

  document.body.appendChild(modal);

  const titleEl = modal.querySelector(".service-modal__title");
  const textEl = modal.querySelector(".service-modal__text");

  let lastFocusedEl = null;

  function openModal({ title, text }) {
    lastFocusedEl = document.activeElement;

    titleEl.textContent = title || "Service";
    textEl.textContent = text || "";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    // Prevent background scroll
    document.body.style.overflow = "hidden";

    // Focus close button for accessibility
    const closeBtn = modal.querySelector(".service-modal__close");
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Restore focus
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  // 2) Wire up all service buttons
  document.querySelectorAll(".service-open").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal({
        title: btn.dataset.title,
        text: btn.dataset.text,
      });
    });
  });

  // 3) Close when clicking backdrop or close button
  modal.addEventListener("click", (e) => {
    const closeTarget = e.target.closest("[data-close='true']");
    if (closeTarget) closeModal();
  });

  // 4) Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 1) If you already placed the <script> in <head>, this is redundant but safe
  document.documentElement.classList.add("js");

  // 2) OPTIONAL: auto-add reveal to the elements you want animated
  // (You can tweak this list anytime)
document.querySelectorAll(
  "#home," +                          
  "#about," +                        
  "#services," +
  "#gallery," +
  "#contact," +
  "#home .title, #home .button, #home img," +
  "#about .text, #about .profile," +
  "#services h2, #services .service-card," +
  "#gallery .gallery-text, #gallery .image-placeholder," +
  "#contact h2, #contact > p, #contact .contact-grid," +
  "footer .footer-row"
).forEach(el => el.classList.add("reveal"));

  // 3) IMPORTANT: observe all .reveal elements (including your existing services container)
  const targets = document.querySelectorAll(".reveal");

  let lastY = window.scrollY;

  const io = new IntersectionObserver(
    (entries) => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY;
      lastY = currentY;

      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          el.classList.remove("is-exiting");
        } else {
          if (scrollingDown && el.classList.contains("is-visible")) {
            el.classList.remove("is-visible");
            el.classList.add("is-exiting");
          } else {
            el.classList.remove("is-exiting");
          }
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -15% 0px",
    }
  );

  targets.forEach((el) => io.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navigation a");

  function setActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${id}`
      );
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      // This makes it switch when section top crosses ~middle of viewport
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0
    }
  );

  sections.forEach(section => observer.observe(section));
});

document.querySelectorAll(".navigation a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".navigation a").forEach(l => l.classList.remove("is-active"));
    link.classList.add("is-active");
  });
});