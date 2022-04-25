import Render from './render/Render.js';
import LAppModel from './lappmodel/LAppModel.js';

const Extern = Phaser.GameObjects.Extern;

class Live2dGameObject extends Extern {
    constructor(scene, x, y, key) {
        super(scene, 'rexLive2d');
       
        this.model = new LAppModel();
        // TODO: Better way to create frameBuffer and assign it to model
        this.model.frameBuffer = this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING);

        this.setKey(key);
    }

    get gl() {
        return this.scene.sys.renderer.gl;
    }

    setKey(key) {
        this.key = key;
        var data = this.scene.cache.custom.live2d.get(key);
        if (!data || !data.model) {
            console.error(`Live2d: can't load ${key}'s assets`);
            return;
        }

        data.gl = this.gl;  // Add 'gl' property

        this.model.setup(data);

        delete data.gl;  // Remove 'gl' property

        return this;
    }

    preUpdate(time, delta) {
        this.model.update(time, delta);
    }
}

Object.assign(
    Live2dGameObject.prototype,
    Render
)

export default Live2dGameObject;