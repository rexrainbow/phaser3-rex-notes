import Render from './render/Render.js';
import GlobalData from './GlobalData.js';
import LAppModel from './lappmodel/LAppModel.js';

const Extern = Phaser.GameObjects.Extern;

class Live2dGameObject extends Extern {
    constructor(scene, x, y, key) {
        super(scene, 'rexLive2d');

        this.globalData = GlobalData.getInstance(this);
        this.model = new LAppModel();
        this.model._frameBuffer = this.globalData.frameBuffer;

        this.setKey(key);
    }

    setKey(key) {
        this.key = key;
        var data = this.scene.cache.custom.live2d.get(key);
        if (!data || !data.model) {
            console.error(`Live2d: can't load ${key}'s assets`);
            return;
        }

        data.gl = this.globalData.gl;  // Add 'gl' property

        this.model.setup(data);

        delete data.gl;  // Remove 'gl' property

        return this;
    }

    preUpdate(time, delta) {
        this.model.update(time, delta);
    }

    preDestroy() {
        this.globalData = undefined;

        this.model.release();
        this.model = undefined;
    }
}

Object.assign(
    Live2dGameObject.prototype,
    Render
)

export default Live2dGameObject;