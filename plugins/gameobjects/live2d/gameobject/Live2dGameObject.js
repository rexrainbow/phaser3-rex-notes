import Render from './render/Render.js';
import Methods from './methods/Methods.js';
import Model from './model/Model.js';
import * as Const from './model/Const.js';

class BaseGameObject extends Phaser.GameObjects.GameObject { }
const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(BaseGameObject,
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
    ]
);

class Live2dGameObject extends BaseGameObject {
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

    getExpressionNames() {
        return this.model.getExpressionNames();
    }

    get expressionName() {
        return this.model._currentExpressionName;
    }

    set expressionName(expressionName) {
        this.model.setExpression(expressionName);
    }

    setExpression(expressionName) {
        this.expressionName = expressionName;
        return this;
    }

    setRandomExpression() {
        this.model.setRandomExpression();
        return this;
    }

    getMotionNames(groupName) {
        return this.model.getMotionNames(groupName);
    }

    getMotionGroupNames() {
        return this.model.getMotionGroupNames();
    }

    startMotion(group, no, priority) {
        if (typeof (priority) === 'string') {
            priority = PriorityModes[priority];
        }
        this.model.startMotion(group, no, priority);
        return this;
    }

    stopAllMotions() {
        this.model.stopAllMotions();
        return this;
    }

    isAnyMotionPlaying() {
        return this.model.isAnyMotionPlaying();
    }

    getPlayinigMotionNames() {
        return this.model.getPlayinigMotionNames();
    }

    registerParameter(name) {
        this.model.registerParameter(name);
        return this;
    }

    addParameterValue(name, value) {
        this.model.addParameterValue(name, value);
        return this;
    }

    resetParameterValue(name) {
        this.model.resetParameterValue(name);
        return this;
    }

    get params() {
        return this.model._addParamValues;
    }

    getParameters() {
        return this.params;
    }

    get lipSyncValue() {
        return this.model._lipSyncValue;
    }

    set lipSyncValue(value) {
        this.model._lipSyncValue = value;
    }

    setLipSyncValue(value) {
        this.lipSyncValue = value;
        return this;
    }

    get hitTestResult() {
        return this.model._hitTestResult;
    }

    getHitTestResult() {
        return this.hitTestResult;
    }

}

Object.assign(
    Live2dGameObject.prototype,
    Render,
    Methods,
)

const PriorityModes = {
    none: Const.PriorityNone,
    idle: Const.PriorityIdle,
    normal: Const.PriorityNormal,
    force: Const.PriorityForce
}

export default Live2dGameObject;