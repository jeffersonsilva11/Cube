document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const marker = document.getElementById('marker');
    const spongebob = document.getElementById('spongebob');

    // Adicionar eventos de clique para posicionar o modelo
    scene.addEventListener('click', (event) => {
        const intersectedElement = event.target;
        if (intersectedElement && intersectedElement.classList.contains('clickable')) {
            const {x, y, z} = marker.getAttribute('position');
            spongebob.setAttribute('position', `${x} ${y} ${z}`);
        }
    });
});
