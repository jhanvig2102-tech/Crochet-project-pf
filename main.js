const initialProducts = [
    { name: "Cozy Hats", price: 599, range: "₹599 - ₹999", img: "/Images/cozyhats.jpg" },
    { name: "Warm Blankets", price: 4000, range: "₹4,000 - ₹9,000+", img: "/Images/blankets.jpg" }
];

let cart = [];

function renderProducts(data) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = data.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p style="margin: 10px 0; font-weight:600;">Price Range: ${p.range}</p>
            <button class="btn-add" onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    toggleCart(); // Opens cart automatically when item added
}

function updateCart() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-total').innerText = `₹${total.toLocaleString('en-IN')}`;
    const body = document.getElementById('cart-items');
    body.innerHTML = cart.length === 0 ? "<p>Bag is empty</p>" : 
        cart.map((item, i) => `<div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${item.name}</span><span>₹${item.price} <button onclick="removeItem(${i})" style="color:red; border:none; background:none; cursor:pointer;">✕</button></span>
        </div>`).join('');
}

function removeItem(index) { cart.splice(index, 1); updateCart(); }

function loadMoreProducts() {
    const more = [
        { name: "Accessories", price: 500, range: "₹500 - ₹880", img: "/Images/accessories.jpg" },
        { name: "Cardigans", price: 3500, range: "₹3,500 - ₹8,000", img: "/Images/tops.jpg" }
    ];
    renderProducts([...initialProducts, ...more]);
    document.getElementById('loadMore').style.display = 'none';
}

function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }
function toggleCart() { document.getElementById('cart-drawer').classList.toggle('open'); }

window.onload = () => renderProducts(initialProducts);
