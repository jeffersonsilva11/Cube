document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const model = document.getElementById('animated-model');
    const camera = document.querySelector('[camera]');
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Configuração inicial do modelo
    model.setAttribute('visible', 'true');
    model.setAttribute('position', '0 0 -3');
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

    function onTouch(event) {
        event.preventDefault();

        const touch = event.touches ? event.touches[0] : event;
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera.getObject3D('camera'));

        const intersects = raycaster.intersectObjects(scene.object3D.children, true);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const position = intersect.point;

            // Ajuste de posição para centralizar o modelo na tela
            model.object3D.position.set(position.x, position.y, position.z);

            // Ajuste da escala do modelo baseado na distância
            const distance = camera.object3D.position.distanceTo(position);
            const scale = Math.max(0.5, 2 / distance);
            model.object3D.scale.set(scale, scale, scale);
        }
    }

    // Adiciona evento de toque para posicionar o modelo
    scene.addEventListener('touchstart', onTouch);

    scene.addEventListener('mousedown', onDocumentMouseDown);
    scene.addEventListener('mousemove', onDocumentMouseMove);
    scene.addEventListener('mouseup', onDocumentMouseUp);
    scene.addEventListener('touchstart', onDocumentMouseDown);
    scene.addEventListener('touchmove', onDocumentMouseMove);
    scene.addEventListener('touchend', onDocumentMouseUp);
});
