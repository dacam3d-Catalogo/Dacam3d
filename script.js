const WHATSAPP_NUMBER = "5491151168759";

// PRODUCTOS
const products = [
  {
    name: "Llaveros personalizados",
    category: "Llaveros",
    price: "Consultar",
    description: "Diseños personalizados en 3D.",
    image: "",
    colors: ["Negro", "Blanco", "Rojo", "Azul", "Rosa"]
  },
  {
    name: "Organizadores",
    category: "Organización",
    price: "Consultar",
    description: "Organizadores personalizados.",
    image: "",
    colors: ["Negro", "Blanco", "Gris", "Rosa"]
  },
  {
    name: "Productos a pedido",
    category: "Personalizados",
    price: "Consultar",
    description: "Creamos tus ideas en 3D.",
    image: "",
    colors: ["A elección"]
  },
  {
    name: "Reno Navideño Tejido",
    category: "Decoración",
    price: 3000,
    description: "¡Ternura y magia para esta Navidad! Reno impreso en 3D con textura estilo tejido crochet. Ideal para decorar o regalar.",
    image: "VENADO-PNG.jpg",
    colors: ["A elección"]
  },
  {
    name: "Jengibre navideño tejido",
    category: "Decoración",
    price: 3000,
    description: "¡Ternura y magia para esta Navidad! Jengibre impreso en 3D con textura estilo tejido crochet. Ideal para decorar o regalar.",
    image: "jenbibre-png.png",
    colors: ["A elección"]
  },
  {
    name: "Oso polar navideño tejido",
    category: "Decoración",
    price: 3000,
    description: "¡Ternura y magia para esta Navidad! Oso polar impreso en 3D con textura estilo tejido crochet. Ideal para decorar o regalar.",
    image: "oso navideño.png",
    colors: ["A elección"]
  },
];

// ELEMENTOS DEL HTML
const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const search = document.getElementById("search");
const detail = document.getElementById("product-detail");

let active = "Todos";
let selectedQuantity = 1;
let selectedColor = "";

// WHATSAPP
function wa(name = "", quantity = 1, color = "") {
  const msg =
    "Hola DaCam 3D! Quiero pedir:\n" +
    "Producto: " + name + "\n" +
    "Cantidad: " + quantity + "\n" +
    "Color: " + color;

  return "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(msg);
}

// PRECIO
function money(value) {
  const number = Number(
    String(value).replace(/[^\d.,]/g, "").replace(",", ".")
  );

  if (!Number.isFinite(number) || number <= 0) return null;
  return number;
}

// PROTECCIÓN DE TEXTO HTML
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// ENLACES Y AÑO
document.getElementById("topWhatsapp").href = wa();
document.getElementById("bottomWhatsapp").href = wa();

document.getElementById("year").textContent =
  new Date().getFullYear();

// ESTILOS DE LAS FICHAS
const style = document.createElement("style");

style.textContent = `
[hidden] {
  display: none !important;
}

#product-detail {
  padding: 16px 0 35px;
  scroll-margin-top: 80px;
}

.dc-product {
  max-width: 650px;
  margin: 20px auto;
  padding: 24px;
  background: #fff;
  border: 1px solid #efede8;
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(0,0,0,.07);
}

.dc-back {
  border: 0;
  background: transparent;
  padding: 12px 0;
  font-size: 16px;
  cursor: pointer;
}

.dc-photo {
  width: 100%;
  aspect-ratio: 1/1;
  background: #f2f2f2;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.dc-photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.dc-placeholder {
  color: #777;
  font-size: 22px;
}

.dc-product h2 {
  margin: 18px 0 8px;
}

.dc-price {
  font-size: 25px;
  font-weight: 700;
  margin: 12px 0;
}

.dc-description {
  line-height: 1.6;
  white-space: pre-line;
}

.dc-field {
  margin: 20px 0;
}

.dc-field label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
}

.dc-field select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 9px;
  font-size: 16px;
  background: white;
}

.dc-quantity {
  display: flex;
  align-items: center;
  gap: 18px;
}

.dc-quantity button {
  width: 42px;
  height: 42px;
  border: 1px solid #ccc;
  border-radius: 9px;
  background: white;
  font-size: 22px;
  cursor: pointer;
}

.dc-order {
  display: block;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 15px;
  margin-top: 22px;
  background: #168b49;
  color: white !important;
  border-radius: 10px;
  text-decoration: none !important;
  font-weight: 700;
}

.dc-total {
  font-size: 20px;
  font-weight: 700;
  margin-top: 15px;
}

.dc-open {
  cursor: pointer;
}

.dc-open:focus-visible {
  outline: 3px solid #168b49;
}

/* Carrito DaCam 3D */
#dc-cart-fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9998;
  border: 0;
  border-radius: 999px;
  padding: 14px 19px;
  background: #168b49;
  color: #fff;
  font-weight: 800;
  font-size: 15px;
  box-shadow: 0 5px 22px rgba(0,0,0,.22);
  cursor: pointer;
}

#dc-cart-fab span {
  display: inline-flex;
  min-width: 22px;
  height: 22px;
  margin-left: 6px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  color: #168b49;
}

#dc-cart-panel {
  position: fixed;
  z-index: 9999;
  right: 20px;
  bottom: 82px;
  width: min(420px, calc(100vw - 28px));
  max-height: min(70vh, 620px);
  overflow: auto;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #e8e5df;
  border-radius: 16px;
  background: #fff;
  color: #222;
  box-shadow: 0 10px 38px rgba(0,0,0,.22);
}

#dc-cart-panel[hidden] {
  display: none !important;
}

.dc-cart-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.dc-cart-head h2 {
  margin: 0;
  font-size: 21px;
}

.dc-cart-close {
  border: 0;
  background: transparent;
  font-size: 26px;
  cursor: pointer;
}

.dc-cart-empty {
  color: #666;
  line-height: 1.5;
  padding: 12px 0;
}

.dc-cart-item {
  padding: 13px 0;
  border-bottom: 1px solid #eee;
}

.dc-cart-item strong {
  display: block;
  margin-bottom: 4px;
}

.dc-cart-meta {
  color: #666;
  font-size: 13px;
  margin-bottom: 9px;
}

.dc-cart-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dc-cart-actions button {
  min-width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 17px;
}

.dc-cart-actions .dc-cart-remove {
  margin-left: auto;
  padding: 0 9px;
  font-size: 13px;
}

.dc-cart-summary {
  padding-top: 15px;
  font-weight: 800;
  font-size: 18px;
}

.dc-cart-note {
  margin: 7px 0 12px;
  color: #666;
  font-size: 12px;
  line-height: 1.4;
}

.dc-cart-whatsapp {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
  padding: 14px;
  border-radius: 10px;
  background: #168b49;
  color: #fff !important;
  text-align: center;
  text-decoration: none !important;
  font-weight: 800;
}

.dc-add-cart {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 15px;
  border: 0;
  border-radius: 10px;
  background: #222;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}

@media(max-width:580px) {
  #dc-cart-fab {
    right: 12px;
    bottom: 12px;
    padding: 12px 15px;
  }

  #dc-cart-panel {
    right: 8px;
    bottom: 72px;
    width: calc(100vw - 16px);
  }

  .dc-product {
    padding: 17px;
    margin: 10px auto;
  }
}
`;

document.head.appendChild(style);

// CARRITO: se guarda en el navegador para no perderlo al recargar.
const CART_STORAGE_KEY = "dacam3d_cart_v1";
let cart = [];

try {
  const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
  if (Array.isArray(savedCart)) cart = savedCart;
} catch (error) {
  cart = [];
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("No se pudo guardar el carrito en este navegador.", error);
  }
}

function cartItemKey(productIndex, color) {
  return String(productIndex) + "::" + String(color);
}

function addToCart(product, color, quantity) {
  const productIndex = products.indexOf(product);
  if (productIndex < 0) return;

  const key = cartItemKey(productIndex, color);
  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      key,
      productIndex,
      color,
      quantity
    });
  }

  saveCart();
  renderCart();
  openCart();
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartTotal() {
  return cart.reduce((sum, item) => {
    const product = products[item.productIndex];
    const price = product ? money(product.price) : null;
    return sum + (price ? price * item.quantity : 0);
  }, 0);
}

function createCartInterface() {
  if (document.getElementById("dc-cart-fab")) return;

  const fab = document.createElement("button");
  fab.id = "dc-cart-fab";
  fab.type = "button";
  fab.innerHTML = '🛒 Carrito <span id="dc-cart-count">0</span>';
  fab.setAttribute("aria-label", "Abrir carrito de compras");

  fab.onclick = () => {
    const panel = document.getElementById("dc-cart-panel");
    panel.hidden = !panel.hidden;

    if (!panel.hidden) renderCart();
  };

  const panel = document.createElement("section");
  panel.id = "dc-cart-panel";
  panel.hidden = true;
  panel.setAttribute("aria-label", "Carrito de compras");

  document.body.append(fab, panel);

  renderCart();
}

function openCart() {
  const panel = document.getElementById("dc-cart-panel");

  if (panel) {
    panel.hidden = false;
  }
}

function changeCartQuantity(key, change) {
  const item = cart.find(entry => entry.key === key);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.key !== key);
  }

  saveCart();
  renderCart();
}

function removeCartItem(key) {
  cart = cart.filter(item => item.key !== key);

  saveCart();
  renderCart();
}

function cartWhatsAppUrl() {
  const lines = cart.map(item => {
    const product = products[item.productIndex];

    if (!product) return "";

    const price = money(product.price);

    const subtotal = price
      ? "\nSubtotal: $" + (price * item.quantity).toLocaleString("es-AR")
      : "\nPrecio: A consultar";

    return (
      "\n• " + product.name +
      "\n  Cantidad: " + item.quantity +
      "\n  Color: " + item.color +
      subtotal
    );
  }).filter(Boolean);

  const total = cartTotal();

  const hasConsultPrice = cart.some(item => {
    const product = products[item.productIndex];

    return !product || !money(product.price);
  });

  const message =
    "Hola DaCam 3D! Quiero hacer este pedido:\n" +
    lines.join("\n") +
    "\n\nTotal de productos con precio: $" +
    total.toLocaleString("es-AR") +
    (hasConsultPrice ? "\nHay productos con precio a consultar." : "") +
    "\n\n¿Me confirman el pedido?";

  return "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);
}

function renderCart() {
  const count = document.getElementById("dc-cart-count");
  const panel = document.getElementById("dc-cart-panel");

  if (count) {
    count.textContent = cartCount();
  }

  if (!panel) return;

  if (!cart.length) {
    panel.innerHTML = `
      <div class="dc-cart-head">
        <h2>Tu carrito</h2>
        <button class="dc-cart-close" type="button" aria-label="Cerrar">×</button>
      </div>

      <p class="dc-cart-empty">
        Todavía no agregaste productos.<br>
        Elegí algo del catálogo para empezar.
      </p>
    `;
  } else {
    const rows = cart.map(item => {
      const product = products[item.productIndex];

      if (!product) return "";

      const price = money(product.price);

      const linePrice = price
        ? "$" + (price * item.quantity).toLocaleString("es-AR")
        : "A consultar";

      return `
        <article class="dc-cart-item">
          <strong>${escapeHTML(product.name)}</strong>

          <div class="dc-cart-meta">
            Color: ${escapeHTML(item.color)} · ${linePrice}
          </div>

          <div class="dc-cart-actions">
            <button
              type="button"
              data-cart-minus="${escapeHTML(item.key)}"
              aria-label="Restar">−</button>

            <b>${item.quantity}</b>

            <button
              type="button"
              data-cart-plus="${escapeHTML(item.key)}"
              aria-label="Sumar">+</button>

            <button
              type="button"
              class="dc-cart-remove"
              data-cart-remove="${escapeHTML(item.key)}">
              Quitar
            </button>
          </div>
        </article>
      `;
    }).join("");

    const hasConsultPrice = cart.some(item => {
      const product = products[item.productIndex];

      return !product || !money(product.price);
    });

    panel.innerHTML = `
      <div class="dc-cart-head">
        <h2>Tu carrito (${cartCount()})</h2>

        <button
          class="dc-cart-close"
          type="button"
          aria-label="Cerrar">×</button>
      </div>

      ${rows}

      <div class="dc-cart-summary">
        Total con precio: $${cartTotal().toLocaleString("es-AR")}
      </div>

      ${hasConsultPrice
        ? '<p class="dc-cart-note">Algunos productos tienen precio a consultar. DaCam 3D te confirmará el valor por WhatsApp.</p>'
        : ""}

      <a
        class="dc-cart-whatsapp"
        href="${cartWhatsAppUrl()}"
        target="_blank"
        rel="noopener">
        ENVIAR PEDIDO POR WHATSAPP
      </a>
    `;
  }

  const close = panel.querySelector(".dc-cart-close");

  if (close) {
    close.onclick = () => {
      panel.hidden = true;
    };
  }

  panel.querySelectorAll("[data-cart-minus]").forEach(button => {
    button.onclick = () => {
      changeCartQuantity(button.dataset.cartMinus, -1);
    };
  });

  panel.querySelectorAll("[data-cart-plus]").forEach(button => {
    button.onclick = () => {
      changeCartQuantity(button.dataset.cartPlus, 1);
    };
  });

  panel.querySelectorAll("[data-cart-remove]").forEach(button => {
    button.onclick = () => {
      removeCartItem(button.dataset.cartRemove);
    };
  });
}

// FILTROS
function drawFilters() {
  const cats = [
    "Todos",
    ...new Set(products.map(p => p.category))
  ];

  filters.innerHTML = cats.map(c => `
    <button
      class="filter ${c === active ? "active" : ""}"
      data-c="${escapeHTML(c)}">
      ${escapeHTML(c)}
    </button>
  `).join("");

  filters.querySelectorAll("button").forEach(button => {
    button.onclick = () => {
      active = button.dataset.c;
      drawFilters();
      draw();
    };
  });
}

// MOSTRAR PRODUCTOS
function draw() {
  detail.hidden = true;
  grid.hidden = false;
  filters.hidden = false;
  search.hidden = false;

  document.getElementById("count").hidden = false;

  const q = search.value.toLowerCase();

  const list = products
    .map((product, index) => ({ ...product, index }))
    .filter(p =>
      (active === "Todos" || p.category === active) &&
      (p.name + p.category + p.description)
        .toLowerCase().includes(q)
    );

  document.getElementById("count").textContent =
    list.length + " productos";

  document.getElementById("empty").hidden =
    list.length > 0;

  grid.innerHTML = list.map(p => `
    <article class="card">
      <button
        type="button"
        class="dc-open"
        data-product="${p.index}"
        style="border:0;background:transparent;text-align:left;width:100%;padding:0;color:inherit">

        <div class="photo">
          ${p.image
            ? `<img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">`
            : '<span class="placeholder">DaCam 3D</span>'}
        </div>

        <div class="info">
          <span class="category">
            ${escapeHTML(p.category)}
          </span>

          <h3>${escapeHTML(p.name)}</h3>

          <p class="description">
            ${escapeHTML(p.description)}
          </p>

          <div class="bottom">
            <span class="price">
              ${typeof p.price === "number"
                ? "$" + p.price.toLocaleString("es-AR")
                : escapeHTML(p.price)}
            </span>

            <span class="ask">VER PRODUCTO →</span>
          </div>
        </div>
      </button>
    </article>
  `).join("");

  grid.querySelectorAll("[data-product]").forEach(button => {
    button.onclick = () =>
      openProduct(Number(button.dataset.product));
  });
}

// DESPLAZAMIENTO A LA FICHA
function scrollToDetail() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const position =
        detail.getBoundingClientRect().top +
        window.scrollY - 80;

      window.scrollTo({
        top: Math.max(0, position),
        behavior: "smooth"
      });
    });
  });
}

// ABRIR PRODUCTO
function openProduct(index, addHistory = true) {
  const p = products[index];

  if (!p) return;

  selectedQuantity = 1;
  selectedColor = (p.colors || ["A elección"])[0];

  if (addHistory) {
    history.pushState(
      { product: index },
      "",
      "#producto=" + index
    );
  }

  grid.hidden = true;
  filters.hidden = true;
  search.hidden = true;

  document.getElementById("count").hidden = true;
  document.getElementById("empty").hidden = true;

  detail.hidden = false;

  showProduct(p);
  scrollToDetail();
}

// FICHA INDIVIDUAL
function showProduct(p) {
  const colors = p.colors || ["A elección"];
  const value = money(p.price);

  detail.innerHTML = `
    <div class="dc-product">

      <button class="dc-back" id="dc-back" type="button">
        ← Volver al catálogo
      </button>

      <div class="dc-photo">
        ${p.image
          ? `<img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">`
          : '<span class="dc-placeholder">DaCam 3D</span>'}
      </div>

      <span class="category">
        ${escapeHTML(p.category)}
      </span>

      <h2>${escapeHTML(p.name)}</h2>

      <div class="dc-price">
        ${value
          ? "$" + value.toLocaleString("es-AR")
          : escapeHTML(p.price)}
      </div>

      <p class="dc-description">
        ${escapeHTML(p.description)}
      </p>

      <div class="dc-field">
        <label for="dc-color">Elegí el color:</label>

        <select id="dc-color">
          ${colors.map(c => `
            <option value="${escapeHTML(c)}">
              ${escapeHTML(c)}
            </option>
          `).join("")}
        </select>
      </div>

      <div class="dc-field">
        <label>Cantidad:</label>

        <div class="dc-quantity">
          <button id="dc-minus" type="button">−</button>
          <strong id="dc-quantity">1</strong>
          <button id="dc-plus" type="button">+</button>
        </div>
      </div>

      <div class="dc-total" id="dc-total">
        ${value
          ? "Total: $" + value.toLocaleString("es-AR")
          : "Precio a consultar"}
      </div>

      <button class="dc-add-cart" id="dc-add-cart" type="button">
        AGREGAR AL CARRITO
      </button>

    </div>
  `;

  const colorSelect = document.getElementById("dc-color");

  function updateOrder() {
    selectedColor = colorSelect.value;

    document.getElementById("dc-quantity").textContent =
      selectedQuantity;

    document.getElementById("dc-total").textContent =
      value
        ? "Total: $" +
          (value * selectedQuantity).toLocaleString("es-AR")
        : "Precio a consultar";
  }

  colorSelect.onchange = updateOrder;

  document.getElementById("dc-add-cart").onclick = () => {
    addToCart(p, selectedColor, selectedQuantity);
  };

  document.getElementById("dc-minus").onclick = () => {
    if (selectedQuantity > 1) {
      selectedQuantity--;
      updateOrder();
    }
  };

  document.getElementById("dc-plus").onclick = () => {
    selectedQuantity++;
    updateOrder();
  };

  document.getElementById("dc-back").onclick = () => {
    history.replaceState(
      null,
      "",
      location.pathname + location.search
    );

    draw();

    document.getElementById("productos").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
}

// ABRIR PRODUCTO DESDE EL ENLACE
function showFromAddress() {
  const match = location.hash.match(/^#producto=(\d+)$/);

  if (match) {
    openProduct(Number(match[1]), false);
  } else {
    draw();
  }
}

// EVENTOS
search.addEventListener("input", draw);

window.addEventListener("popstate", showFromAddress);
window.addEventListener("hashchange", showFromAddress);

// INICIAR CATÁLOGO
createCartInterface();
drawFilters();
showFromAddress();
