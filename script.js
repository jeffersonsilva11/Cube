AFRAME.registerComponent('animation-handler', {
    init: function () {
        const el = this.el;
        let mixer;
        let activeAction;
        let animations;
        let model;

        el.addEventListener('model-loaded', function (e) {
            model = e.detail.model;
            animations = model.animations;
            mixer = new THREE.AnimationMixer(model);
            activeAction = mixer.clipAction(animations[0]);
            activeAction.play();

            document.getElementById('loading').style.display = 'none';
        });

        el.sceneEl.addEventListener('click', function (evt) {
            const intersectedEl = evt.target;

            if (intersectedEl === el) {
                const marker = el.parentNode;

                if (!marker || !marker.object3D.visible) return;

                if (animations.length > 0) {
                    const lastAction = activeAction;
                    activeAction = mixer.clipAction(animations[(animations.indexOf(activeAction._clip) + 1) % animations.length]);

                    lastAction.fadeOut(0.5);
                    activeAction.reset().fadeIn(0.5).play();
                }
            } else {
                // Place the model where the user clicked
                const camera = document.querySelector('[camera]');
                const worldPos = new THREE.Vector3();
                camera.object3D.getWorldPosition(worldPos);
                const clickPosition = new THREE.Vector3(evt.detail.intersection.point.x, 0, evt.detail.intersection.point.z);

                el.object3D.position.copy(clickPosition);
                el.setAttribute('visible', 'true');
            }
        });

        el.sceneEl.addEventListener('tick', function (e) {
            if (mixer) mixer.update(0.01);
        });
    }
});

document.querySelector('#animated-model').setAttribute('animation-handler', '');
