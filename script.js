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
      <div class="service-modal__text"></div>
    </div>
  `;

  document.body.appendChild(modal);

  const titleEl = modal.querySelector(".service-modal__title");
  const textEl = modal.querySelector(".service-modal__text");

  const serviceContent = {
  carpentry: {
    title: "Carpentry & Framing",
    html: `
      <p>
        We provide precise, reliable carpentry and framing for both new construction and renovations.
        This includes interior framing renovation reinforcing the structure for strength, safety,
        and long-term stability.
      </p>

      <p>
        Our work includes structural framing, repairs, and custom builds, ensuring reinforced framing
        and durable construction built to last.
      </p>

      <ul>
        <li>Interior and structural framing renovation</li>
        <li>Reinforcing structure for strength and safety</li>
        <li>Structural framing, repairs, and custom builds</li>
        <li>Durable, long-term stability and clean detailing</li>
      </ul>

      <p>
        We make sure the foundation of your project is done right the first time, with reliable,
        long-lasting results.
      </p>    `
  },

  patios: {
    title: "Patios & Porches",
    html: `
      <p>
        We design and build patios and porches that turn outdoor spaces into comfortable living areas,
        including wooden patio and porch renovation with reinforced framing and new,
        weather-resistant boards.
      </p>

      <ul>
        <li>Wooden patio and porch renovation</li>
        <li>Deck renovation with reinforced structure</li>
        <li>New, weather-resistant boards</li>
        <li>Patio enclosure and outdoor living improvements</li>
      </ul>

      <p>
        Built for comfort, durability, and long-term performance in the Texas climate.
      </p>
    `
  },

  exterior: {
    title: "Exterior Renovations",
    html: `
      <p>
        We specialize in full house exterior renovation built for long-term performance and value,
        improving both the appearance and protection of your home.
      </p>

      <ul>
        <li>Full house exterior renovation</li>
        <li>Exterior repairs and structural upgrades</li>
        <li>Dock renovation delivering strength and safety and long term stability</li>
        <li>Upgrades that improve durability and curb appeal</li>
      </ul>

      <p>
        Built with quality materials, attention to detail, and a clean, modern finish designed to last.
      </p>
    `
  }
};


  let lastFocusedEl = null;

function openModal({ title, html }) {
  lastFocusedEl = document.activeElement;

  titleEl.textContent = title || "Service";
  textEl.innerHTML = html || "";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  // Prevent background scroll
  document.documentElement.style.overflow = "hidden";

  modal.querySelector(".service-modal__close").focus();
}

    // Focus close button for accessibility
    const closeBtn = modal.querySelector(".service-modal__close");
    closeBtn.focus();
  

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";


    // Restore focus
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  // 2) Wire up all service buttons
document.querySelectorAll(".service-open").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.service;
    const content = serviceContent[key];

    openModal({
      title: content?.title,
      html: content?.html
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

  requestAnimationFrame(() => {
  targets.forEach((el) => {
    const r = el.getBoundingClientRect();
    const inView = r.top < window.innerHeight * 0.9 && r.bottom > 0;
    if (inView) {
      el.classList.add("is-visible");
      el.classList.remove("is-exiting");
    }
  });
});
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

// Contact form submission handling
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  const response = await fetch("https://formspree.io/f/mvzzaogl", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json"
    }
  });

  if (response.ok) {
    alert("Message sent successfully!");
    form.reset();
  } else {
    alert("Something went wrong. Please try again.");
  }
});
