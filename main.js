/* Maxwell Motorbikes — site config + interactions.
   TODO (launch checklist):
   1. STRIPE_LINKS — paste your Stripe Payment Links (one per color/size if you
      want separate SKUs, or a single link). Create them at dashboard.stripe.com
      > Payments > Payment Links. Until then the Buy buttons show a notice.
   2. FORMSPREE_ID — contact form posts to Formspree; replace "YOUR_ID" with
      your form ID from formspree.io (free tier works fine).
*/

const SITE = {
  productName: "Maxwell Stoic",
  price: 950,
  // Colors confirmed by Troy 2026-09-12
  colors: [
    { name: "Jet Black", swatch: "#141414" },
    { name: "Grey-Blu", swatch: "#6e7f8d" },
  ],
  sizes: [
    { name: "Small", detail: "Fits 5'3\" to 5'9\"" },
    { name: "Large", detail: "Fits 5'9\" to 6'2\"" },
  ],
  // TODO: paste Stripe Payment Links here (one per size, or a single default link)
  stripeLinks: {
    default: "",
    small: "",
    large: "",
  },
  formspreeId: "YOUR_ID",
};

// Mobile nav
document.addEventListener("DOMContentLoaded", () => {
  let selectedSizeIndex = 0; // 0 = Small, 1 = Large

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }

  // Product gallery
  const main = document.getElementById("gallery-main-img");
  const thumbs = document.querySelectorAll(".thumbs img");
  thumbs.forEach((t) => {
    t.addEventListener("click", () => {
      thumbs.forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      if (main) main.src = t.dataset.full || t.src;
    });
  });

  // Color swatches
  const swatchWrap = document.getElementById("swatches");
  const colorName = document.getElementById("color-name");
  if (swatchWrap) {
    SITE.colors.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "swatch" + (i === 0 ? " active" : "");
      b.innerHTML = `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${c.swatch};margin-right:8px;vertical-align:baseline;"></span>${c.name}`;
      b.addEventListener("click", () => {
        swatchWrap.querySelectorAll(".swatch").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        if (colorName) colorName.textContent = c.name;
      });
      swatchWrap.appendChild(b);
    });
    if (colorName) colorName.textContent = SITE.colors[0].name;
  }

  // Size selector
  const sizeWrap = document.getElementById("size-swatches");
  const sizeName = document.getElementById("size-name");
  if (sizeWrap) {
    SITE.sizes.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "swatch" + (i === 0 ? " active" : "");
      b.innerHTML = `<strong>${s.name}</strong><span style="display:block;font-weight:400;font-size:0.82rem;color:var(--ink-soft);">${s.detail}</span>`;
      b.addEventListener("click", () => {
        sizeWrap.querySelectorAll(".swatch").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        selectedSizeIndex = i;
        if (sizeName) sizeName.textContent = `${s.name} — ${s.detail}`;
      });
      sizeWrap.appendChild(b);
    });
    if (sizeName) sizeName.textContent = `${SITE.sizes[0].name} — ${SITE.sizes[0].detail}`;
  }

  // Buy buttons
  document.querySelectorAll("[data-buy]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const sizeKey = selectedSizeIndex === 1 ? "large" : "small";
      const link = SITE.stripeLinks[sizeKey] || SITE.stripeLinks.default;
      if (!link) {
        e.preventDefault();
        alert("Online checkout is coming soon — message us to order the Stoic today.");
      } else {
        btn.setAttribute("href", link);
      }
    });
  });

  // Contact form
  const form = document.getElementById("contact-form");
  if (form) {
    if (SITE.formspreeId === "YOUR_ID") {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        document.getElementById("form-note").textContent =
          "Thanks! The contact form isn't wired up yet — email us directly at hello@maxwellmotorbikes.com and we'll get right back to you.";
      });
    } else {
      form.setAttribute("action", `https://formspree.io/f/${SITE.formspreeId}`);
    }
  }

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
