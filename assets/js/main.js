// ============================================================
// Nlacha-Aka Restaurant & Bar — Site Logic
// ============================================================

const WHATSAPP_NUMBER = "2349011558607";
const IMG = (name) => `assets/images/${name}`;

// ----- Menu Data -----
const MENU = [
  // Native Soups
  { id: "bitter-leaf-soup", name: "Bitter Leaf Soup", category: "Native Soups", price: 4500, desc: "Slow-simmered bitter leaf soup with assorted meat, stockfish and pounded yam.", img: IMG("bitter-leaf-soup.jpeg"), tag: "Chef's Special" },
  { id: "egusi-soup", name: "Egusi Soup", category: "Native Soups", price: 4500, desc: "Rich melon seed soup with spinach, assorted meat and smoked fish.", icon: "🍲" },
  { id: "ogbono-soup", name: "Ogbono Soup", category: "Native Soups", price: 4000, desc: "Draw soup made from ground ogbono seeds, palm oil and fresh fish.", icon: "🥣" },
  { id: "afang-soup", name: "Afang Soup", category: "Native Soups", price: 5000, desc: "Afang leaves and waterleaf simmered with periwinkle, beef and dry fish.", icon: "🌿" },

  // Delicacies & Small Chops
  { id: "nkwobi", name: "Nkwobi", category: "Delicacies & Small Chops", price: 6000, desc: "Spiced cow foot delicacy in a creamy palm-oil sauce, garnished with utazi.", img: IMG("nkwobi.jpeg"), tag: "Best Seller" },
  { id: "abacha", name: "Abacha (African Salad)", category: "Delicacies & Small Chops", price: 3500, desc: "Shredded cassava tossed in ugba, ponmo, garden egg and grilled fish.", img: IMG("abacha.jpeg") },
  { id: "isi-ewu", name: "Isi Ewu", category: "Delicacies & Small Chops", price: 8000, desc: "Traditional spiced goat head delicacy, slow-cooked and richly seasoned.", icon: "🐐" },
  { id: "small-chops", name: "Small Chops Platter", category: "Delicacies & Small Chops", price: 5500, desc: "Spring rolls, puff puff, samosa and peppered snails on one platter.", icon: "🍢" },

  // Grills & Barbecue
  { id: "fish-barbecue", name: "Fish Barbecue", category: "Grills & Barbecue", price: 7000, desc: "Whole grilled fish with chips, fried plantain, fresh salad and pepper sauce.", img: IMG("fish-barbecue.jpeg"), tag: "Popular" },
  { id: "suya", name: "Suya Platter", category: "Grills & Barbecue", price: 4000, desc: "Spicy grilled beef skewers coated in yaji spice, served with onions and cabbage.", icon: "🍢" },
  { id: "grilled-chicken", name: "Grilled Chicken", category: "Grills & Barbecue", price: 5500, desc: "Charcoal-grilled chicken marinated in native spice blend, served with plantain.", icon: "🍗" },
  { id: "peppered-goat", name: "Peppered Goat Meat", category: "Grills & Barbecue", price: 6500, desc: "Tender goat meat tossed in a fiery pepper sauce with onions and bell peppers.", icon: "🌶️" },

  // Rice & Porridge
  { id: "native-rice", name: "Native Rice", category: "Rice & Porridge", price: 3500, desc: "Nigerian native jollof rice cooked with scent leaf, dried fish and ponmo.", img: IMG("native-rice.jpeg"), tag: "Chef's Special" },
  { id: "yam-porridge", name: "Yam Porridge (Asaro)", category: "Rice & Porridge", price: 3000, desc: "Soft yam pottage cooked in palm oil sauce with fish and ugu leaves.", img: IMG("yam-porridge.jpeg") },
  { id: "ofada-rice", name: "Ofada Rice & Ayamase", category: "Rice & Porridge", price: 4500, desc: "Local ofada rice served with spicy green pepper ayamase sauce and assorted meat.", icon: "🍛" },
  { id: "jollof-rice", name: "Jollof Rice", category: "Rice & Porridge", price: 2500, desc: "Smoky party-style jollof rice, served with fried plantain.", icon: "🍚" },
];

const DRINKS = [
  { id: "chapman", name: "Chapman", price: 2500, icon: "🍹" },
  { id: "palm-wine", name: "Palm Wine (Calabash)", price: 3000, icon: "🥥" },
  { id: "chilled-malt", name: "Chilled Beer / Malt", price: 1500, icon: "🍺" },
  { id: "signature-cocktail", name: "Signature Cocktails", price: 4000, icon: "🍸" },
];

const GALLERY = [
  { img: IMG("nkwobi.jpeg"), label: "Signature Nkwobi" },
  { img: IMG("fish-barbecue.jpeg"), label: "Fish Barbecue Night" },
  { img: IMG("bitter-leaf-soup.jpeg"), label: "Native Soup Pot" },
  { icon: "🎉", label: "Private Celebrations" },
  { img: IMG("native-rice.jpeg"), label: "Native Rice Feast" },
  { icon: "🏢", label: "Corporate Catering" },
  { img: IMG("abacha.jpeg"), label: "Abacha Plating" },
  { icon: "🥂", label: "Restaurant Ambience" },
];

const TESTIMONIALS = [
  { name: "Chiamaka O.", role: "Abuja, FCT", quote: "The most authentic Nkwobi I've had outside my grandmother's kitchen. Nlacha-Aka is now our family's go-to for every celebration." },
  { name: "Yusuf B.", role: "Garki, Abuja", quote: "Their fish barbecue is unmatched — smoky, perfectly seasoned, and the pepper sauce is addictive. Service is warm and fast too." },
  { name: "Ifeoma A.", role: "Wuse II, Abuja", quote: "We hosted our office end-of-year dinner here. The catering team was professional and the native rice was the star of the night." },
  { name: "Emeka N.", role: "Garki, Abuja", quote: "Palm wine straight from the calabash, bitter leaf soup that tastes like home — this place gets Nigerian native food exactly right." },
];

// ----- Cart State -----
let cart = JSON.parse(localStorage.getItem("nlacha_cart") || "[]");
let orderType = "Pickup";

const naira = (n) => `₦${n.toLocaleString("en-NG")}`;

function saveCart() {
  localStorage.setItem("nlacha_cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  const item = [...MENU, ...DRINKS].find((m) => m.id === id);
  if (!item) return;
  const existing = cart.find((c) => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  saveCart();
  showToast(`${item.name} added to cart`);
  pulseCartIcon();
}

function updateQty(id, delta) {
  const line = cart.find((c) => c.id === id);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) cart = cart.filter((c) => c.id !== id);
  saveCart();
}

function cartCount() {
  return cart.reduce((sum, c) => sum + c.qty, 0);
}
function cartTotal() {
  return cart.reduce((sum, c) => sum + c.qty * c.price, 0);
}

function pulseCartIcon() {
  const badge = document.getElementById("cart-count");
  badge.classList.add("scale-125");
  setTimeout(() => badge.classList.remove("scale-125"), 200);
}

function showToast(msg) {
  const el = document.createElement("div");
  el.className = "toast fixed bottom-24 left-1/2 -translate-x-1/2 bg-charcoal text-cream text-sm font-semibold px-5 py-3 rounded-full shadow-warm z-[95]";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

// ----- Render: Menu -----
const CATEGORIES = ["All", "Native Soups", "Delicacies & Small Chops", "Grills & Barbecue", "Rice & Porridge"];
let activeCategory = "All";

function dishCardHTML(item) {
  const media = item.img
    ? `<img src="${item.img}" alt="${item.name}" loading="lazy" />`
    : `<div class="placeholder-art"><span class="p-icon">${item.icon || "🍽️"}</span><span class="p-label">${item.name}</span></div>`;
  return `
  <div class="dish-card">
    <div class="dish-img-wrap">
      ${item.tag ? `<span class="tag-badge">${item.tag}</span>` : ""}
      ${media}
    </div>
    <div class="p-5">
      <div class="flex items-start justify-between gap-3 mb-2">
        <h3 class="font-display font-bold text-lg leading-snug">${item.name}</h3>
        <span class="font-display font-bold text-terracotta-light whitespace-nowrap">${naira(item.price)}</span>
      </div>
      <p class="text-sm text-cream/60 leading-relaxed mb-4">${item.desc}</p>
      <button data-add="${item.id}" class="add-btn w-full flex items-center justify-center gap-2 bg-terracotta/15 hover:bg-terracotta text-terracotta-light hover:text-cream font-bold text-sm py-2.5 rounded-full transition">
        <span>+</span> Add to Order
      </button>
    </div>
  </div>`;
}

function renderFilters() {
  const wrap = document.getElementById("menu-filters");
  wrap.innerHTML = CATEGORIES.map(
    (c) => `<button class="filter-btn ${c === activeCategory ? "active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
  wrap.querySelectorAll("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      renderFilters();
      renderMenuGrid();
    });
  });
}

function renderMenuGrid() {
  const grid = document.getElementById("menu-grid");
  const items = activeCategory === "All" ? MENU : MENU.filter((m) => m.category === activeCategory);
  grid.innerHTML = items.map(dishCardHTML).join("");
  bindAddButtons(grid);
}

function barCardHTML(item) {
  return `
  <div class="bar-card p-6 text-center">
    <div class="placeholder-art rounded-xl aspect-square mb-4 !bg-none !bg-white/10">
      <span class="p-icon">${item.icon}</span>
    </div>
    <h3 class="font-display font-bold text-lg mb-1">${item.name}</h3>
    <p class="font-bold text-cream/90 mb-4">${naira(item.price)}</p>
    <button data-add="${item.id}" class="add-btn w-full bg-white/15 hover:bg-white text-cream hover:text-crimson font-bold text-sm py-2.5 rounded-full transition">+ Add to Order</button>
  </div>`;
}

function renderBarGrid() {
  const grid = document.getElementById("bar-grid");
  grid.innerHTML = DRINKS.map(barCardHTML).join("");
  bindAddButtons(grid);
}

function bindAddButtons(scope) {
  scope.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.add));
  });
}

// ----- Render: Gallery -----
function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  grid.innerHTML = GALLERY.map((g) => {
    const media = g.img
      ? `<img src="${g.img}" alt="${g.label}" loading="lazy" />`
      : `<div class="placeholder-art"><span class="p-icon">${g.icon}</span></div>`;
    return `
    <div class="gallery-item" ${g.img ? `data-img="${g.img}" data-label="${g.label}"` : ""}>
      ${media}
      <div class="overlay"><span>${g.label}</span></div>
    </div>`;
  }).join("");

  grid.querySelectorAll(".gallery-item[data-img]").forEach((el) => {
    el.addEventListener("click", () => openLightbox(el.dataset.img, el.dataset.label));
  });
}

function openLightbox(src, label) {
  const lb = document.getElementById("lightbox");
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox-img").alt = label;
  lb.classList.add("open");
}
document.getElementById("lightbox-close").addEventListener("click", () => {
  document.getElementById("lightbox").classList.remove("open");
});
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") document.getElementById("lightbox").classList.remove("open");
});

// ----- Render: Testimonials -----
let testimonialIndex = 0;
let testimonialTimer;

function renderTestimonials() {
  const track = document.getElementById("testimonial-track");
  const dots = document.getElementById("testimonial-dots");
  track.innerHTML = TESTIMONIALS.map(
    (t, i) => `
    <div class="testimonial-slide ${i === 0 ? "active" : ""}" data-i="${i}">
      <p class="text-gold text-xl mb-4">★★★★★</p>
      <p class="font-display text-xl md:text-2xl leading-relaxed mb-6">"${t.quote}"</p>
      <p class="font-bold">${t.name}</p>
      <p class="text-sm text-cream/50">${t.role}</p>
    </div>`
  ).join("");
  dots.innerHTML = TESTIMONIALS.map(
    (_, i) => `<button class="testimonial-dot ${i === 0 ? "active" : ""}" data-i="${i}" aria-label="Testimonial ${i + 1}"></button>`
  ).join("");
  dots.querySelectorAll("[data-i]").forEach((dot) => {
    dot.addEventListener("click", () => goToTestimonial(parseInt(dot.dataset.i)));
  });
  startTestimonialAutoplay();
}

function goToTestimonial(i) {
  testimonialIndex = i;
  document.querySelectorAll(".testimonial-slide").forEach((el) => el.classList.toggle("active", parseInt(el.dataset.i) === i));
  document.querySelectorAll(".testimonial-dot").forEach((el) => el.classList.toggle("active", parseInt(el.dataset.i) === i));
}

function startTestimonialAutoplay() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => {
    goToTestimonial((testimonialIndex + 1) % TESTIMONIALS.length);
  }, 5500);
}

// ----- Cart Drawer -----
function renderCart() {
  const itemsWrap = document.getElementById("cart-items");
  const emptyWrap = document.getElementById("cart-empty");
  const footer = document.getElementById("cart-footer");
  const badge = document.getElementById("cart-count");

  badge.textContent = cartCount();
  badge.style.transform = cartCount() > 0 ? "scale(1)" : "scale(0)";

  if (cart.length === 0) {
    itemsWrap.classList.add("hidden");
    footer.classList.add("hidden");
    emptyWrap.classList.remove("hidden");
    return;
  }
  itemsWrap.classList.remove("hidden");
  footer.classList.remove("hidden");
  emptyWrap.classList.add("hidden");

  itemsWrap.innerHTML = cart
    .map((c) => {
      const menuItem = [...MENU, ...DRINKS].find((m) => m.id === c.id);
      const media = menuItem && menuItem.img
        ? `<img src="${menuItem.img}" alt="${c.name}" />`
        : `<div class="placeholder-art !aspect-auto"><span class="p-icon text-xl">${(menuItem && menuItem.icon) || "🍽️"}</span></div>`;
      return `
      <div class="cart-item">
        <div class="thumb">${media}</div>
        <div class="flex-1">
          <p class="font-semibold text-sm leading-snug">${c.name}</p>
          <p class="text-terracotta font-bold text-sm">${naira(c.price)}</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="qty-btn" data-qty-minus="${c.id}">−</button>
          <span class="w-5 text-center text-sm font-bold">${c.qty}</span>
          <button class="qty-btn" data-qty-plus="${c.id}">+</button>
        </div>
      </div>`;
    })
    .join("");

  itemsWrap.querySelectorAll("[data-qty-minus]").forEach((b) => b.addEventListener("click", () => updateQty(b.dataset.qtyMinus, -1)));
  itemsWrap.querySelectorAll("[data-qty-plus]").forEach((b) => b.addEventListener("click", () => updateQty(b.dataset.qtyPlus, 1)));

  document.getElementById("cart-subtotal").textContent = naira(cartTotal());
  updateCheckoutLink();
}

function updateCheckoutLink() {
  const lines = cart.map((c) => `• ${c.name} x${c.qty} — ${naira(c.price * c.qty)}`).join("%0A");
  const msg =
    `Hello Nlacha-Aka! I'd like to place a *${orderType}* order:%0A%0A${lines}%0A%0A` +
    `*Total: ${naira(cartTotal())}*%0A%0APlease confirm availability. Thank you!`;
  document.getElementById("cart-checkout").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("cart-toggle").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
document.getElementById("cart-overlay").addEventListener("click", closeCart);

document.querySelectorAll(".order-type-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".order-type-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    orderType = btn.dataset.orderType;
    updateCheckoutLink();
  });
});

// ----- Reservation Form -----
const reservationForm = document.getElementById("reservation-form");
const dateInput = reservationForm.querySelector('[name="date"]');
dateInput.min = new Date().toISOString().split("T")[0];

reservationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(reservationForm).entries());
  const msg =
    `Hello Nlacha-Aka! I'd like to reserve a table:%0A%0A` +
    `*Name:* ${data.name}%0A*Phone:* ${data.phone}%0A*Guests:* ${data.guests}%0A` +
    `*Date:* ${data.date}%0A*Time:* ${data.time}%0A` +
    (data.notes ? `*Special Request:* ${data.notes}%0A` : "") +
    `%0APlease confirm my booking. Thank you!`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  showToast("Opening WhatsApp to confirm your reservation…");
});

// ----- Mobile Nav -----
const mobileNav = document.getElementById("mobile-nav");
document.getElementById("nav-toggle").addEventListener("click", () => {
  mobileNav.classList.add("open");
  document.body.style.overflow = "hidden";
});
document.getElementById("mobile-nav-close").addEventListener("click", closeMobileNav);
mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMobileNav));
function closeMobileNav() {
  mobileNav.classList.remove("open");
  document.body.style.overflow = "";
}

// ----- Header scroll state -----
const header = document.getElementById("site-header");
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 60;
  header.classList.toggle("scrolled", scrolled);
  backToTop.classList.toggle("show", window.scrollY > 500);
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ----- Scroll reveal -----
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}

// ----- Preloader -----
window.addEventListener("load", () => {
  const pre = document.getElementById("preloader");
  setTimeout(() => {
    pre.style.opacity = "0";
    setTimeout(() => pre.remove(), 700);
  }, 300);
});

// ----- Footer year -----
document.getElementById("year").textContent = new Date().getFullYear();

// ----- Init -----
renderFilters();
renderMenuGrid();
renderBarGrid();
renderGallery();
renderTestimonials();
renderCart();
initReveal();
