/* ================================================================
   Skyline Realty — Multi-Page Scripts
   ================================================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
    });
    navLinks.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => navLinks.classList.remove("open"))
    );
  }

  /* ---- Reveal on scroll ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---- Stagger grid children ---- */
  const grids = [".listing-grid", ".why-grid", ".steps", ".tst-grid", ".stats-grid", ".values-grid", ".team-grid"];
  document.querySelectorAll(grids).forEach((g) =>
    [...g.children].forEach((el, i) => {
      if (el.classList.contains("reveal")) el.style.transitionDelay = i * 80 + "ms";
    })
  );

  /* ---- Scroll progress bar ---- */
  const sp = document.getElementById("sp");
  const onScroll = () => {
    const h = document.documentElement;
    if (sp)
      sp.style.width =
        (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Hero parallax ---- */
  const heroFx = document.querySelector(".hero-fx");
  let raf = false;
  const parallax = () => {
    if (heroFx)
      heroFx.style.transform = "translateY(" + window.scrollY * 0.22 + "px)";
    raf = false;
  };
  if (!reduceMotion) {
    window.addEventListener("scroll", () => {
      if (!raf) {
        raf = true;
        requestAnimationFrame(parallax);
      }
    }, { passive: true });
    parallax();
  }

  /* ---- Count-up stats ---- */
  const counted = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          counted.unobserve(el);
          const target = +el.dataset.count,
            suf = el.dataset.suffix || "",
            dur = 1300,
            t0 = performance.now();
          (function tick(t) {
            const p = Math.min((t - t0) / dur, 1),
              ease = 1 - Math.pow(1 - p, 3);
            el.textContent =
              Math.round(ease * target).toLocaleString("en-US") + suf;
            if (p < 1) requestAnimationFrame(tick);
          })(t0);
        }
      });
    },
    { threshold: 0.4 }
  );
  document
    .querySelectorAll(".stat strong[data-count]")
    .forEach((el) => counted.observe(el));

  /* ---- Cursor spotlight on cards ---- */
  document
    .querySelectorAll(".prop, .why, .step, .tst, .value-card, .team-card, .info-card")
    .forEach((el) => el.classList.add("spot"));
  if (!reduceMotion) {
    document.querySelectorAll(".spot").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
      el.addEventListener("mouseleave", () => {
        el.style.setProperty("--mx", "50%");
        el.style.setProperty("--my", "50%");
      });
    });
  }

  /* ---- Hero search tabs ---- */
  document.querySelectorAll(".search .tabs button").forEach((b) =>
    b.addEventListener("click", () => {
      document
        .querySelectorAll(".search .tabs button")
        .forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
    })
  );

  /* ---- Listings page: Buy/Rent filter tabs ---- */
  const listTabs = document.querySelectorAll(".listings-tabs button");
  listTabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      listTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      filterListings();
    })
  );

  /* ---- Listings page: dropdown filters ---- */
  const filterCity = document.getElementById("filter-city");
  const filterType = document.getElementById("filter-type");
  const filterBudget = document.getElementById("filter-budget");
  [filterCity, filterType, filterBudget].forEach((sel) => {
    if (sel) sel.addEventListener("change", filterListings);
  });

  function filterListings() {
    const activeTab = document.querySelector(".listings-tabs button.active");
    const mode = activeTab ? activeTab.dataset.mode : "all";
    const city = filterCity ? filterCity.value : "all";
    const type = filterType ? filterType.value : "all";
    const budget = filterBudget ? filterBudget.value : "all";

    const cards = document.querySelectorAll(".listing-grid .prop");
    let visible = 0;

    cards.forEach((card) => {
      const cardMode = card.dataset.mode || "sale";
      const cardCity = card.dataset.city || "";
      const cardType = card.dataset.type || "";
      const cardBudget = card.dataset.budget || "";

      const matchMode = mode === "all" || cardMode === mode;
      const matchCity = city === "all" || cardCity === city;
      const matchType = type === "all" || cardType === type;
      const matchBudget = budget === "all" || cardBudget === budget;

      if (matchMode && matchCity && matchType && matchBudget) {
        card.style.display = "";
        visible++;
      } else {
        card.style.display = "none";
      }
    });

    const countEl = document.querySelector(".listing-count");
    if (countEl) {
      countEl.textContent = visible + " propert" + (visible === 1 ? "y" : "ies") + " found";
    }
  }

  /* ---- Contact form → WhatsApp ---- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      contactForm.querySelectorAll(".form-group").forEach((g) => {
        const input = g.querySelector("input, select, textarea");
        if (input && input.required && !input.value.trim()) {
          g.classList.add("has-error");
          valid = false;
        } else {
          g.classList.remove("has-error");
        }
      });

      if (!valid) return;

      const name = document.getElementById("cf-name").value.trim();
      const phone = document.getElementById("cf-phone").value.trim();
      const interest = document.getElementById("cf-interest").value;
      const message = document.getElementById("cf-message").value.trim();

      const text =
        "Hello Skyline Realty!%0A" +
        "Name: " + encodeURIComponent(name) + "%0A" +
        "Phone: " + encodeURIComponent(phone) + "%0A" +
        "Interested in: " + encodeURIComponent(interest) + "%0A" +
        "Message: " + encodeURIComponent(message);

      window.open("mailto:hello@skyline-realty.pk?subject=Enquiry &body=" + encodeURIComponent(text), "_blank");
    });
  }
})();
