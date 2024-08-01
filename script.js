document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const model = document.getElementById('animated-model');
    const camera = document.querySelector('[camera]');
  
    // Inicializa o Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
  
    // Função para lidar com cliques na tela
    function onClick(event) {
      event.preventDefault();
  
      // Calcula as coordenadas do clique
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      // Define o raycaster a partir da câmera e da posição do clique
      raycaster.setFromCamera(mouse, camera.getObject3D('camera'));
  
      // Verifica as interseções
      const intersects = raycaster.intersectObjects(scene.object3D.children, true);
  
      if (intersects.length > 0) {
        const intersect = intersects[0];
        const position = intersect.point;
  
        // Define a posição e torna o modelo visível
        model.setAttribute('position', position);
        model.setAttribute('visible', 'true');
      }
    }
  
    // Adiciona o evento de clique
    window.addEventListener('click', onClick);
  });  