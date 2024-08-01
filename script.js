document.addEventListener('DOMContentLoaded', () => {
    const marker = document.getElementById('hero-marker');
    const model = document.getElementById('animated-model');

    marker.addEventListener('markerFound', () => {
        model.setAttribute('visible', 'true');
    });

    marker.addEventListener('markerLost', () => {
        model.setAttribute('visible', 'false');
    });
});
