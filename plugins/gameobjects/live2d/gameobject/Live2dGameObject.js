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
        this.model.setup(this.scene, key);
        return this;
    }
}

export default Live2dGameObject;