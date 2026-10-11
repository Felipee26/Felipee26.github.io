const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const card = document.querySelector('.card');
const container = document.getElementById('buttons-container');

function huirBoton() {
    // Le decimos al contenedor que el botón empezó a moverse
    container.classList.add('moving');

    // Obtenemos las medidas de la ventana actual
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Obtenemos las medidas del botón
    const buttonWidth = btnNo.offsetWidth;
    const buttonHeight = btnNo.offsetHeight;

    // Calculamos una posición aleatoria asegurando que no se salga de la pantalla
    const randomX = Math.random() * (windowWidth - buttonWidth - 40) + 20;
    const randomY = Math.random() * (windowHeight - buttonHeight - 40) + 20;

    // Cambiamos la posición del botón a 'fixed' para que flote por toda la pantalla
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
    btnNo.style.transform = 'none'; // Reseteamos la posición inicial
}

// Escuchamos los eventos: cuando pasa el mouse o cuando intenta tocarlo en celular
btnNo.addEventListener('mouseover', huirBoton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evita que un toque rápido logre presionarlo
    huirBoton();
});

// Qué pasa cuando finalmente logra presionar ¡SÍ!
btnYes.addEventListener('click', () => {
    // Ocultamos los botones
    btnNo.style.display = 'none';
    btnYes.style.display = 'none';

    // Cambiamos el GIF y el texto
    card.innerHTML = `
        <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Ositos besándose" class="gif-osito">
        <h1 class="success-text">¡Sabía que dirías que sí! ❤️</h1>
    `;

    // Disparamos la lluvia de confeti
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        // Confeti desde la izquierda
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#ff69b4', '#ff1493'] // Colores de corazones
        });
        // Confeti desde la derecha
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#ff69b4', '#ff1493']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});
