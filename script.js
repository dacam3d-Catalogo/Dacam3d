
const WHATSAPP_NUMBER = "5491151168759";

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
    name: "Adornos decorativos",
    category: "Decoración",
    price: "Consultar",
    description: "Decoración impresa en 3D.",
    image: "",
    colors: ["Blanco", "Rojo", "Verde", "Dorado"]
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
    colors: ["A elección"],
    
  {name: "Reno Navideño Tejido",
  category: "Decoración",
  price: 3000,
  description: "¡Ternura y magia para esta Navidad! Reno impreso en 3D con textura estilo tejido crochet. Ideal para decorar o regalar.",
  image: "",
  colors: ["A elección"]
},
];

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const search = document.getElementById("search");
const detail = document.getElementById("product-detail");

let active = "Todos";
let selectedQuantity = 1;
let selectedColor = "";

function wa(name = "", quantity = 1, color = "") {
  const msg =
    "Hola DaCam 3D! Quiero pedir:\n" +
    "Producto: " + name + "\n" +
    "Cantidad: " + quantity + "\n" +
    "Color: " + color;

  return "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(msg);
}

function money(value) {
  const number = Number(
    String(value).replace(/[^\d.,]/g, "").replace(",", ".")
  );

  if (!Number.isFinite(number) || number <= 0) return null;
  return number;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

document.getElementById("topWhatsapp").href = wa();
document.getElementById("bottomWhatsapp").href = wa();

document.getElementById("year").textContent =
  new Date().getFullYear();

const style = document.createElement("style");

style.textContent = `
#product-detail {
  padding: 16px 0 35px;
  scroll-margin-top: 80px;
}

.dc-back {
  border: 0;
  background: transparent;
  padding: 12px 0;
  font-size: 16px;
  cursor: pointer;
}

.dc-product {
  max-width: 650px;
  margin: auto;
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
  text-align: center;
  padding: 15px;
  margin-top: 22px;
  background: #168b49;
  color: white;
  border-radius: 10px;
  text-decoration: none;
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
`;

document.head.appendChild(style);

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
              ${escapeHTML(p.price)}
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
        ${escapeHTML(p.price)}
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

      <a
        class="dc-order"
        id="dc-order"
        target="_blank"
        rel="noopener"
        href="${wa(p.name, 1, selectedColor)}">

        PEDIR POR WHATSAPP
      </a>

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

    document.getElementById("dc-order").href =
      wa(p.name, selectedQuantity, selectedColor);
  }

  colorSelect.onchange = updateOrder;

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

function showFromAddress() {
  const match = location.hash.match(/^#producto=(\d+)$/);

  if (match) {
    openProduct(Number(match[1]), false);
  } else {
    draw();
  }
}

search.addEventListener("input", draw);

window.addEventListener("popstate", showFromAddress);
window.addEventListener("hashchange", showFromAddress);

drawFilters();
showFromAddress();
