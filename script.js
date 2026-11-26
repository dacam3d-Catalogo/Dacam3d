const WHATSAPP_NUMBER = "5491151168759";

const products = [
  {
    name: "Llaveros personalizados",
    category: "Llaveros",
    price: "Consultar",
    description: "Diseños personalizados en 3D.",
    image: "",
    colors: ["A elección"]
  },
  {
    name: "Adornos decorativos",
    category: "Decoración",
    price: "Consultar",
    description: "Decoración impresa en 3D.",
    image: "",
    colors: ["A elección"]
  },
  {
    name: "❄️⛄ Muñeco de nieve tejido NAVIDAD ❄️",
    category: "Decoración",
    price: 3000,
    description: `☃️❄️ MUÑECO DE NIEVE TEJIDO ❄️

¡Un detalle lleno de ternura para esta temporada! ❤️

Muñeco de nieve con hermoso diseño de tejido, realizado mediante impresión 3D, con detalles que imitan la textura del crochet.

🧶 Diseño estilo tejido.
⛄ Terminaciones y detalles decorativos.
🎁 Ideal para decorar tu hogar o regalar.
❤️ Un toque navideño y original para cualquier rincón.

✨ ¡Llevate el tuyo y llená de magia tu Navidad!`,
    image: "",
    colors: ["A elección"]
  },
  {
    name: "Organizadores",
    category: "Organización",
    price: "Consultar",
    description: "Organizadores personalizados.",
    image: "",
    colors: ["A elección"]
  },
  {
    name: "Productos a pedido",
    category: "Personalizados",
    price: "Consultar",
    description: "Creamos tus ideas en 3D.",
    image: "",
    colors: ["A elección"]
  }
];

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const search = document.getElementById("search");
const detail = document.getElementById("product-detail");
const count = document.getElementById("count");
const empty = document.getElementById("empty");

let active = "Todos";
let selectedQuantity = 1;
let selectedColor = "";

function wa(name = "", quantity = 1, color = "") {
  const message =
    "Hola DaCam 3D! Quiero pedir:\n" +
    "Producto: " + name + "\n" +
    "Cantidad: " + quantity +
    (color ? "\nColor: " + color : "");

  return "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);
}

function money(value) {
  const number = Number(
    String(value).replace(/[^\d.,]/g, "").replace(",", ".")
  );

  return Number.isFinite(number) && number > 0
    ? number
    : null;
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

if (!grid || !filters || !search || !detail || !count || !empty) {
  document.body.innerHTML =
    "<h2>No se encontraron los elementos del catálogo. Revisá index.html.</h2>";
} else {
  document.getElementById("topWhatsapp").href = wa();
  document.getElementById("bottomWhatsapp").href = wa();
  document.getElementById("year").textContent =
    new Date().getFullYear();

  function drawFilters() {
    const categories = [
      "Todos",
      ...new Set(products.map(p => p.category))
    ];

    filters.innerHTML = categories.map(category => `
      <button
        class="filter ${category === active ? "active" : ""}"
        data-category="${escapeHTML(category)}">
        ${escapeHTML(category)}
      </button>
    `).join("");

    filters.querySelectorAll("button").forEach(button => {
      button.onclick = () => {
        active = button.dataset.category;
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
    count.hidden = false;

    const query = search.value.toLowerCase();

    const list = products
      .map((product, index) => ({ ...product, index }))
      .filter(p =>
        (active === "Todos" || p.category === active) &&
        (p.name + p.category + p.description)
          .toLowerCase().includes(query)
      );

    count.textContent = list.length + " productos";
    empty.hidden = list.length > 0;

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
            <span class="category">${escapeHTML(p.category)}</span>
            <h3>${escapeHTML(p.name)}</h3>
            <p class="description">${escapeHTML(p.description)}</p>
            <div class="bottom">
              <span class="price">
                ${money(p.price)
                  ? "$" + money(p.price).toLocaleString("es-AR")
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

  function openProduct(index, addHistory = true) {
    const product = products[index];
    if (!product) return;

    selectedQuantity = 1;
    selectedColor = product.colors?.[0] || "";

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
    count.hidden = true;
    empty.hidden = true;
    detail.hidden = false;

    showProduct(product);
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showProduct(product) {
    const colors = product.colors || [];
    const value = money(product.price);

    selectedColor = colors[0] || "";

    detail.innerHTML = `
      <div class="dc-product">

        <button class="dc-back" id="dc-back" type="button">
          ← Volver al catálogo
        </button>

        <div class="dc-photo">
          ${product.image
            ? `<img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">`
            : '<span class="dc-placeholder">DaCam 3D</span>'}
        </div>

        <span class="category">${escapeHTML(product.category)}</span>

        <h2>${escapeHTML(product.name)}</h2>

        <div class="dc-price">
          ${value
            ? "$" + value.toLocaleString("es-AR")
            : escapeHTML(product.price)}
        </div>

        <p class="dc-description">${escapeHTML(product.description)}</p>

        ${colors.length ? `
          <div class="dc-field">
            <label for="dc-color">Elegí el color:</label>
            <select id="dc-color">
              ${colors.map(color => `
                <option value="${escapeHTML(color)}">
                  ${escapeHTML(color)}
                </option>
              `).join("")}
            </select>
          </div>
        ` : ""}

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
          href="${wa(product.name, 1, selectedColor)}">
          PEDIR POR WHATSAPP
        </a>
      </div>
    `;

    const colorSelect = document.getElementById("dc-color");

    function updateOrder() {
      if (colorSelect) selectedColor = colorSelect.value;

      document.getElementById("dc-quantity").textContent =
        selectedQuantity;

      document.getElementById("dc-total").textContent =
        value
          ? "Total: $" +
            (value * selectedQuantity).toLocaleString("es-AR")
          : "Precio a consultar";

      document.getElementById("dc-order").href =
        wa(product.name, selectedQuantity, selectedColor);
    }

    if (colorSelect) colorSelect.onchange = updateOrder;

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
      history.replaceState(null, "", location.pathname + location.search);
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
    }
