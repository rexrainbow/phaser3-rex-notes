import Render from './render/Render.js';
import Methods from './methods/Methods.js';
import Model from './model/Model.js';

class BaseGameObject extends Phaser.GameObjects.GameObject { }
const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(BaseGameObject,
    [
        Components.AlphaSingle,
        Components.ComputedSize,
        Components.Depth,
        Components.GetBounds,
        Components.Origin,
        Components.ScrollFactor,
        Components.Transform,
        Components.Visible,
    ]
);

class Live2dGameObject extends BaseGameObject {
    constructor(scene, x, y, key, config) {
        super(scene, 'rexLive2d');

        this.model = new Model(this);

        this.setModel(key, config);

        this.setPosition(x, y);
        this.setOrigin(0.5);
    }

    preUpdate(time, delta) {
        this.model.update(time, delta);
    }

    preDestroy() {
        this.model.release();
        this.model = undefined;
    }

    get alpha() {
        return super.alpha;
    }

    set alpha(value) {
        if (super.alpha === value) {
            return;
        }
        super.alpha = value;

        this.model.setOpacity(value);
        // But it won't change render result
        // Only work for hitTest
    }

    get expressionName() {
        return this.model._currentExpressionName;
    }

    set expressionName(expressionName) {
        this.setExpression(expressionName);
    }

    get params() {
        return this.getParameters();
    }

    get lipSyncValue() {
        return this.model._lipSyncValue;
    }

    set lipSyncValue(value) {
        this.setLipSyncValue(value);
    }

    get hitTestResult() {
        return this.getHitTestResult();
    }

}

Object.assign(
    Live2dGameObject.prototype,
    Render,
    Methods,
)

export default Live2dGameObject;