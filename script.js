document.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector("a-scene");
    
    // GLTF Loader
    const loader = new THREE.GLTFLoader();
  
    // Load the GLB model
    loader.load('spongebob.glb', function (gltf) {
      const model = gltf.scene;
      
      // Function to place the model on tap
      const placeModel = (x, y) => {
        const modelEl = document.createElement('a-entity');
        modelEl.setObject3D('mesh', model.clone());
        modelEl.setAttribute('position', { x: x, y: y, z: -2 }); // Adjust the position based on your need
        sceneEl.appendChild(modelEl);
      };
  
      // Listen for screen taps
      sceneEl.addEventListener('click', (event) => {
        const touch = event.touches ? event.touches[0] : event;
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        placeModel(x, y);
      });
    });
  });  