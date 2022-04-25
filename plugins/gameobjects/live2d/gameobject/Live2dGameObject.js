import Render from './render/Render.js';
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

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Live2dGameObject,
    [
        // Components.Alpha,
        Components.BlendMode,
        Components.Depth,
        // Components.Flip,
        // Components.GetBounds,
        // Components.Mask,
        // Components.Origin,
        // Components.Pipeline,
        Components.ScrollFactor,
        // Components.Tint,
        Components.Transform,
        Components.Visible,
        Render,
    ]
);

export default Live2dGameObject;