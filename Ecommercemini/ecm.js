const productsContainer = document.getElementById('products');
const cartCount = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  cartCount.textContent = `🛒 Cart (${cart.length})`;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  cart.push(product);
  updateCartCount();
  alert(`${product.title} added to cart!`);
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product';

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" />
    <h3>${product.title}</h3>
    <p>$${product.price}</p>
    <button>Add to Cart</button>
  `;

  card.querySelector('button').addEventListener('click', () => {
    addToCart(product);
  });

  return card;
}

async function loadProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();

    products.forEach(product => {
      const card = createProductCard(product);
      productsContainer.appendChild(card);
    });
  } catch (error) {
    productsContainer.innerHTML = '<p>Failed to load products.</p>';
  }
}

updateCartCount();
loadProducts();
