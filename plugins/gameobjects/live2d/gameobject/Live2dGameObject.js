import Render from './render/Render.js';
import Model from './model/Model.js';
import * as Const from './model/Const.js';

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

}

const PriorityModes = {
    none: Const.PriorityNone,
    idle: Const.PriorityIdle,
    normal: Const.PriorityNormal,
    force: Const.PriorityForce
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