document.addEventListener('DOMContentLoaded', () => {
    const model = document.getElementById('animated-model');

    // Ajuste inicial para centralizar o modelo
    model.setAttribute('position', '0 1 -5');
    model.setAttribute('visible', 'true');

    // Interação para rotacionar o modelo
    let isUserInteracting = false,
        onPointerDownPointerX = 0, onPointerDownPointerY = 0,
        lon = 0, onPointerDownLon = 0,
        lat = 0, onPointerDownLat = 0;

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
            model.object3D.rotation.x = THREE.Math.degToRad(lat);
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