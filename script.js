document.addEventListener('DOMContentLoaded', () => {
    const model = document.getElementById('animated-model');
    model.setAttribute('visible', 'true');

    // Ajuste inicial para centralizar o modelo e voltá-lo para a frente
    model.setAttribute('position', '0 -0.5 -3');
    model.setAttribute('rotation', '0 0 0');

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

    // Adicionar evento de clique para posicionar o modelo na superfície detectada
    scene.addEventListener('click', (event) => {
        const touch = event.touches ? event.touches[0] : event;
        const touchX = touch.clientX / window.innerWidth * 2 - 1;
        const touchY = -(touch.clientY / window.innerHeight) * 2 + 1;

        const camera = document.querySelector('[camera]');
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(touchX, touchY);

        raycaster.setFromCamera(mouse, camera.getObject3D('camera'));

        const intersects = raycaster.intersectObjects(scene.object3D.children, true);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            model.setAttribute('position', intersect.point);
            model.object3D.position.copy(intersect.point);
        }
    });
});