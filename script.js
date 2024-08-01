document.addEventListener('DOMContentLoaded', () => {
    const model = document.getElementById('animated-model');
    model.setAttribute('visible', 'true');

    // Ajuste inicial para centralizar o modelo e voltá-lo para a frente
    model.setAttribute('position', '0 0 -3');
    model.setAttribute('rotation', '0 0 0');

    // Interação para rotacionar e mover o modelo
    let isUserInteracting = false,
        onPointerDownPointerX = 0, onPointerDownPointerY = 0,
        lon = 0, onPointerDownLon = 0,
        lat = 0, onPointerDownLat = 0,
        initialPosition = { x: 0, y: 0, z: -3 };

    function onDocumentMouseDown(event) {
        event.preventDefault();
        isUserInteracting = true;
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        onPointerDownPointerX = clientX;
        onPointerDownPointerY = clientY;
        onPointerDownLon = lon;
        onPointerDownLat = lat;
    }

    function onDocumentMouseMove(event) {
        if (isUserInteracting) {
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const clientY = event.touches ? event.touches[0].clientY : event.clientY;
            lon = (onPointerDownPointerX - clientX) * 0.1 + onPointerDownLon;
            lat = (clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
            model.object3D.rotation.y = THREE.Math.degToRad(lon);

            // Atualiza a posição do modelo com base no movimento do toque
            const deltaX = (clientX - onPointerDownPointerX) * 0.01;
            const deltaY = -(clientY - onPointerDownPointerY) * 0.01;
            model.object3D.position.set(initialPosition.x + deltaX, initialPosition.y + deltaY, initialPosition.z);
        }
    }

    function onDocumentMouseUp() {
        isUserInteracting = false;
    }

    const scene = document.querySelector('a-scene');
    scene.addEventListener('mousedown', onDocumentMouseDown);
    scene.addEventListener('mousemove', onDocumentMouseMove);
    scene.addEventListener('mouseup', onDocumentMouseUp);
    scene.addEventListener('touchstart', onDocumentMouseDown);
    scene.addEventListener('touchmove', onDocumentMouseMove);
    scene.addEventListener('touchend', onDocumentMouseUp);
});
