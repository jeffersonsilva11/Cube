AFRAME.registerComponent('animation-handler', {
    init: function () {
        const el = this.el;
        let mixer;
        let activeAction;
        let animations;

        el.addEventListener('model-loaded', function (e) {
            const model = e.detail.model;
            animations = model.animations;
            mixer = new THREE.AnimationMixer(model);
            activeAction = mixer.clipAction(animations[0]);
            activeAction.play();

            document.getElementById('loading').style.display = 'none';

            el.sceneEl.addEventListener('click', function () {
                if (animations.length > 0) {
                    const lastAction = activeAction;
                    activeAction = mixer.clipAction(animations[(animations.indexOf(activeAction._clip) + 1) % animations.length]);

                    lastAction.fadeOut(0.5);
                    activeAction.reset().fadeIn(0.5).play();
                }
            });
        });

        el.sceneEl.addEventListener('tick', function (e) {
            if (mixer) mixer.update(0.01);
        });
    }
});

document.querySelector('#animated-model').setAttribute('animation-handler', '');
