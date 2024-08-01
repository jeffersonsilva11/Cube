document.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector("a-scene");
    
    // GLTF Loader
    const loader = new THREE.GLTFLoader();
  
    // Load the GLB model
    loader.load('spongebob.glb', function (gltf) {
      const model = gltf.scene;
      
      // Function to place the model on tap
      const placeModel = (position) => {
        const modelEl = document.createElement('a-entity');
        modelEl.setObject3D('mesh', model.clone());
        modelEl.setAttribute('position', position); // Use the provided position
        modelEl.setAttribute('scale', { x: 0.5, y: 0.5, z: 0.5 }); // Adjust scale as needed
        sceneEl.appendChild(modelEl);
      };
  
      // Listen for screen taps
      sceneEl.addEventListener('click', (event) => {
        const touch = event.touches ? event.touches[0] : event;
        const rect = sceneEl.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
  
        // Calculate position for model placement
        const position = {
          x: x * 10, // Adjust multiplier as needed for positioning
          y: y * 10,
          z: -2
        };
  
        placeModel(position);
      });
    });
  });
  