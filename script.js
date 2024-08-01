AFRAME.registerComponent('animation-handler', {
    init: function () {
        const el = this.el;
        let mixer;
        let activeAction;
        let lastAction;
        let animations;

        el.addEventListener('model-loaded', function (e) {
            const model = e.detail.model;
            animations = model.animations;
            mixer = new THREE.AnimationMixer(model);
            activeAction = mixer.clipAction(animations[0]);
            activeAction.play();
            
            el.sceneEl.addEventListener('click', function () {
                if (animations.length > 0) {
                    lastAction = activeAction;
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

AFRAME.registerComponent('set-animation', {
    schema: { type: 'int', default: 0 },

    init: function () {
        this.el.addEventListener('model-loaded', () => {
            const model = this.el.getObject3D('mesh');
            const mixer = new THREE.AnimationMixer(model);
            const animations = model.animations;

            const playAnimation = (index) => {
                if (index < animations.length) {
                    const action = mixer.clipAction(animations[index]);
                    action.reset();
                    action.play();
                }
            };

            playAnimation(this.data);
        });
    }
});

document.querySelector('#animated-model').setAttribute('animation-handler', '');