import LAppModel from './lappmodel/LAppModel.js';

const GameObject = Phaser.GameObjects.GameObject;

class Live2dGameObject extends GameObject {
    constructor(scene, x, y, key) {
        super(scene, 'rexLive2d');

        this.model = new LAppModel();

        this.setKey(key);
    }

    setKey(key) {
        this.key = key;
        var data = this.scene.cache.custom.live2d.get(key);
        if (!data || !data.model) {
            console.error(`Live2d: can't load ${key}'s assets`);
            return;
        }
        this.model.setup(data);
        return this;
    }

    preUpdate(time, delta) {
        this.model.update(time, delta);
    }
}

export default Live2dGameObject;