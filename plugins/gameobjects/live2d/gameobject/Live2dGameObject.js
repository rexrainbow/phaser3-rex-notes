import Render from './render/Render.js';
import Model from './model/Model.js';

const Base = Phaser.GameObjects.GameObject;

class Live2dGameObject extends Base {
    constructor(scene, x, y, key) {
        super(scene, 'rexLive2d');

        this.model = new Model(this);

        this.setKey(key);

        this.setPosition(x, y);
        this.setSize(this.model._modelWidth, this.model._modelHeight);
        this.setOrigin(0.5);
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

    preDestroy() {
        this.model.release();
        this.model = undefined;
    }
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Live2dGameObject,
    [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Origin,
        Components.ScrollFactor,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        Render,
    ]
);

export default Live2dGameObject;