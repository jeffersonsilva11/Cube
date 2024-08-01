document.addEventListener('DOMContentLoaded', () => {
    const model = document.getElementById('animated-model');

    // Ajustar o modelo para que tenha as proporções originais
    model.object3D.scale.set(1, 1, 1);

    const scene = document.querySelector('a-scene');
    scene.addEventListener('click', (event) => {
        const touch = event.touches ? event.touches[0] : event;
        const touchX = (touch.clientX / window.innerWidth) * 2 - 1;
        const touchY = -(touch.clientY / window.innerHeight) * 2 + 1;

        const camera = document.querySelector('[camera]');
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(touchX, touchY);

        raycaster.setFromCamera(mouse, camera.getObject3D('camera'));

        const intersects = raycaster.intersectObjects(scene.object3D.children, true);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            model.object3D.position.copy(intersect.point);
            model.setAttribute('position', intersect.point);
            model.setAttribute('visible', 'true');
        }
    });
});
