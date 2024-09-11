// Espera a que el contenido del DOM se haya cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa el carrito como un array vacío
    const cart = [];

    // Elementos del DOM utilizados en el carrito y el pago
    const cartItems = document.getElementById('cart-items'); // Contenedor para los artículos del carrito
    const checkoutBtn = document.getElementById('checkout-btn'); // Botón para proceder al pago
    const paymentModal = document.getElementById('payment-modal'); // Modal para el formulario de pago
    const closeModal = document.querySelector('.close'); // Botón para cerrar el modal
    const paymentForm = document.getElementById('payment-form'); // Formulario de pago
    const cardSelect = document.getElementById('card-select'); // Selector de tipo de tarjeta
    const cardDetails = document.getElementById('card-details'); // Contenedor de detalles de la tarjeta

    // Manejo de botones "Agregar al Carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            // Obtiene los datos del producto desde el atributo del botón
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = parseFloat(button.getAttribute('data-product-price'));

            // Agrega el producto al carrito
            cart.push({ id: productId, name: productName, price: productPrice });
            // Actualiza la vista del carrito
            updateCart();
        });
    });

    // Actualiza la vista del carrito
    function updateCart() {
        if (cart.length === 0) {
            // Muestra un mensaje si el carrito está vacío
            cartItems.innerHTML = '<p>Tu carrito está vacío.</p>';
        } else {
            // Muestra los artículos del carrito
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <p>${item.name} - $${item.price.toFixed(2)}</p>
                </div>
            `).join('');
        }
    }

    // Mostrar el modal de pago al hacer clic en el botón de pago
    checkoutBtn.addEventListener('click', () => {
        paymentModal.style.display = 'block';
    });

    // Cerrar el modal de pago al hacer clic en el botón de cierre
    closeModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    // Cerrar el modal de pago si se hace clic fuera del modal
    window.onclick = function (event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    };

    // Mostrar/ocultar detalles de tarjeta según la selección del tipo de tarjeta
    cardSelect.addEventListener('change', () => {
        if (cardSelect.value) {
            // Muestra los detalles de la tarjeta si se selecciona un tipo de tarjeta
            cardDetails.classList.remove('hidden');
        } else {
            // Oculta los detalles de la tarjeta si no se selecciona un tipo de tarjeta
            cardDetails.classList.add('hidden');
        }
    });

    // Manejo del formulario de pago
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Obtiene los valores del formulario
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (cardSelect.value && cardNumber && expiryDate && cvv) {
            // Muestra un mensaje de éxito si todos los campos están completos
            alert(`Pago realizado exitosamente con tarjeta ${cardSelect.value}.`);
            // Cierra el modal de pago
            paymentModal.style.display = 'none';

            // Reinicia el carrito
            cart.length = 0; // Vacía el carrito
            updateCart(); // Actualiza la vista del carrito

            // Opcional: Muestra mensaje de éxito o redirige al usuario
            document.getElementById('cart-items').innerHTML = '<p>Tu carrito está vacío.</p>';
        } else {
            // Muestra un mensaje de error si algún campo está incompleto
            alert('Por favor, complete todos los campos.');
        }
    });
});

// Segunda sección, gestionando el carrito con el valor total
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa el carrito como un array vacío
    const cart = [];
    // Variable para almacenar el valor total de los productos en el carrito
    let totalPrice = 0;

    // Elementos del DOM utilizados en el carrito y el pago
    const cartItems = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentModal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.close');
    const paymentForm = document.getElementById('payment-form');
    const cardSelect = document.getElementById('card-select');
    const cardDetails = document.getElementById('card-details');
    // Elemento para mostrar el valor total
    const totalPriceElement = document.getElementById('total-price');

    // Manejo de botones "Agregar al Carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            // Obtiene los datos del producto desde el atributo del botón
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = parseFloat(button.getAttribute('data-product-price'));

            // Agrega el producto al carrito
            cart.push({ id: productId, name: productName, price: productPrice });
            // Suma el precio del producto al valor total
            totalPrice += productPrice;
            // Actualiza la vista del carrito
            updateCart();
        });
    });

    // Actualiza la vista del carrito
    function updateCart() {
        if (cart.length === 0) {
            // Muestra un mensaje si el carrito está vacío
            cartItems.innerHTML = '<p>Tu carrito está vacío.</p>';
            // Resetea el valor total a $0.00
            totalPriceElement.innerText = '$0.00';
        } else {
            // Muestra los artículos del carrito
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <p>${item.name} - S/:${item.price.toFixed(2)}</p>
                </div>
            `).join('');
            // Muestra el valor total en formato moneda
            totalPriceElement.innerText = `S/.${totalPrice.toFixed(2)}`;
        }
    }

    // ...
});

// Tercera sección, manejando la reproducción de audio
document.addEventListener('DOMContentLoaded', () => {
    const playPauseButton = document.getElementById('play-pause-button'); // Botón para reproducir/pausar audio
    const backgroundAudio = document.getElementById('background-audio'); // Elemento de audio en el DOM

    // Manejo del botón de reproducción/pausa
    playPauseButton.addEventListener('click', () => {
        if (backgroundAudio.paused) {
            // Reproduce el audio y cambia el texto del botón a 'Pausar'
            backgroundAudio.play();
            playPauseButton.textContent = 'Pausar';
        } else {
            // Pausa el audio y cambia el texto del botón a 'Reproducir'
            backgroundAudio.pause();
            playPauseButton.textContent = 'Reproducir';
        }
    });
});

// Obtener el modal
var modal = document.getElementById("product-modal");

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Obtener los botones "Más Información"
var infoButtons = document.querySelectorAll(".more-info");

// Agregar un evento click a cada botón "Más Información"
infoButtons.forEach(button => {
    button.addEventListener("click", function () {
        var productName = this.getAttribute("data-product-name");
        var productDescription = this.getAttribute("data-product-description");
        var productPrice = this.getAttribute("data-product-price");

        // Mostrar la información en el modal
        document.getElementById("modal-product-name").textContent = productName;
        document.getElementById("modal-product-description").textContent = productDescription;
        document.getElementById("modal-product-price").textContent = "$" + productPrice;

        // Mostrar el modal
        modal.style.display = "block";
    });
});

// Cuando el usuario hace clic en <span> (x), cerrar el modal
span.onclick = function () {
    modal.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, cerrar el modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
