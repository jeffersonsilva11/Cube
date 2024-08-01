document.addEventListener('DOMContentLoaded', () => {
    const model = document.getElementById('animated-model');
    model.setAttribute('visible', 'false');

    const scene = document.querySelector('a-scene');
    let isModelPlaced = false;

    scene.addEventListener('click', (event) => {
        if (isModelPlaced) return;

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
            model.setAttribute('position', `${intersect.point.x} ${intersect.point.y} ${intersect.point.z}`);
            model.object3D.position.copy(intersect.point);
            model.setAttribute('visible', 'true');
            isModelPlaced = true;
        }
    });
});
