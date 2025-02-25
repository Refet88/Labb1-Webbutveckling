let products = [
    { id: 1, name: "Volymgivande Schampo", price: 120, category: "Schampo", imageUrl: "Bilder/volymshampo.WebP", description: "Detta schampo ger volym och fyllighet till ditt hår." },
    { id: 2, name: "Fuktgivande Balsam", price: 130, category: "Balsam", imageUrl: "Bilder/Balsam.WebP", description: "Vårdar och återfuktar ditt hår." },
    { id: 3, name: "Stark Hårgel", price: 150, category: "Stylingprodukter", imageUrl: "Bilder/Hairgel.WebP", description: "Ger stark hållbarhet och form till ditt hår." },
    { id: 4, name: "Hårspray Extra Stadga", price: 130, category: "Stylingprodukter", imageUrl: "Bilder/hårspray.WebP", description: "Fixerar din frisyr med extra stadga." },
    { id: 5, name: "Närande Hårinpackning", price: 160, category: "Inpackningar", imageUrl: "Bilder/närande hårinpackning.WebP", description: "Närande hårinpackning som återfuktar och stärker håret." },
    { id: 6, name: "Anti-Friss Serum", price: 180, category: "Serum", imageUrl: "Bilder/Anti-friss serum.WebP", description: "Motverkar frissighet och ger håret glans." },
    { id: 7, name: "Värmeskyddande Spray", price: 170, category: "Stylingprodukter", imageUrl: "Bilder/Värmeskyddande Spray.WebP", description: "Skyddar håret vid värmestyling." },
    { id: 8, name: "Hårolja Med Argan", price: 190, category: "Håroljor", imageUrl: "Bilder/Hårolja.WebP", description: "Närande hårolja med arganolja som ger glans och mjukhet." }
];

let productList = document.getElementById("product-list");

products.forEach(product => {
    let productElement = document.createElement('div');
    productElement.classList.add("product");

    let productImage = document.createElement('img');
    productImage.src = product.imageUrl;
    productImage.alt = product.name;
    productImage.classList.add("product-image");
    productImage.style.cursor = "pointer";
    productImage.width = 250;
    productImage.height = 250;
    

    productImage.addEventListener('click', function() {
        document.querySelector('#productModalLabel').textContent = product.name;
        document.querySelector('.modal-body').innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid mb-3" style="max-width: 100%;">
            <p>${product.description}</p>
            <p><strong>Pris:</strong> ${product.price}kr</p>
        `;

        let modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    });

    let productText = document.createElement('p');
    productText.textContent = `${product.name} - ${product.price}kr`;

    let addButton = document.createElement('button');
    addButton.textContent = 'Lägg till i kundvagn';
    addButton.classList.add("btn", "btn-primary", "product-button", "add-button");
    addButton.addEventListener('click', function() {
        addToCart(product);
    });

    productElement.appendChild(productImage);
    productElement.appendChild(productText);
    productElement.appendChild(addButton);
    productList.appendChild(productElement);
});

let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartIcon();
    showMessage(`${product.name} har lagts till i kundvagnen!`);
    updateCartTotal();
}

function updateCartIcon() {
    let cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.textContent = `Kundvagn (${cart.length})`;
    }
}

function showCart() {
    let cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';

    cart.forEach(function(product) {
        let cartItem = document.createElement('div');
        cartItem.textContent = `${product.name} - ${product.price}kr`;
        cartList.appendChild(cartItem);
    });
}

function showMessage(message) {
    let messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';

    setTimeout(function() {
        messageDiv.style.display = 'none';
    }, 2000);
}

function updateCartTotal() {
    let total = cart.reduce((sum, product) => sum + product.price, 0);
    let cartTotal = document.getElementById('cart-total');
    if (cartTotal) {
        cartTotal.textContent = `(${total} kr)`;
    }
}

const url = 'https://v2.jokeapi.dev/joke/Any';

fetch(url)
    .then(response => response.json())
    .then(data => {
        const jokeElement = document.getElementById('joke');
        jokeElement.innerHTML = `
            <p>${data.setup ? data.setup : data.joke}</p>
            ${data.delivery ? `<p>${data.delivery}</p>` : ''}
        `;
    })
    .catch(error => console.error('Fel vid hämtning av skämt:', error));
