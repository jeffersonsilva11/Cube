document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const model = document.getElementById('animated-model');
    const camera = document.querySelector('[camera]');
  
    scene.addEventListener('click', (event) => {
      const touch = event.touches ? event.touches[0] : event;
      const touchPoint = new THREE.Vector2(
        (touch.clientX / window.innerWidth) * 2 - 1,
        -(touch.clientY / window.innerHeight) * 2 + 1
      );
  
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(touchPoint, camera.getObject3D('camera'));
  
      const intersects = raycaster.intersectObject(scene.object3D, true);
  
      if (intersects.length > 0) {
        const intersect = intersects[0];
        const position = intersect.point;
        model.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
        model.setAttribute('visible', 'true');
      }
    });
  });  