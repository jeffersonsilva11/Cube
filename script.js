document.addEventListener('DOMContentLoaded', () => {
    const model = document.getElementById('animated-model');
    model.setAttribute('visible', 'true');

    // Ajuste inicial para centralizar o modelo
    model.setAttribute('position', '0 0 -3');

    // Interação para arrastar o modelo
    let isUserInteracting = false,
        onPointerDownPointerX = 0, onPointerDownPointerY = 0,
        modelPosX = 0, modelPosY = 0, modelPosZ = -3;

    function onDocumentMouseDown(event) {
        event.preventDefault();
        isUserInteracting = true;
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        onPointerDownPointerX = clientX;
        onPointerDownPointerY = clientY;
    }

    function onDocumentMouseMove(event) {
        if (isUserInteracting) {
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const clientY = event.touches ? event.touches[0].clientY : event.clientY;
            const deltaX = (clientX - onPointerDownPointerX) * 0.01;
            const deltaY = (clientY - onPointerDownPointerY) * -0.01;
            modelPosX += deltaX;
            modelPosY += deltaY;
            model.setAttribute('position', `${modelPosX} ${modelPosY} ${modelPosZ}`);
            onPointerDownPointerX = clientX;
            onPointerDownPointerY = clientY;
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
