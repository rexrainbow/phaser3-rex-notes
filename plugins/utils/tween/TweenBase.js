import EventEmitterMethods from '../eventemitter/EventEmitterMethods.js';
import GetSceneObject from '../system/GetSceneObject.js';
import IsSceneObject from '../system/IsSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TweenBase {
    constructor(parent, config) {
        this.parent = parent;
        this.scene = GetSceneObject(parent);

        /*
        eventEmitter:
        - false(default value): Use tween's event emitter.
        - true: Create a private event emitter.
        */
        var eventEmitter = GetValue(config, 'eventEmitter', false);
        if (eventEmitter === true) {
            eventEmitter = undefined;
        }
        this.setEventEmitter(eventEmitter);
        this.boot();
    }

    boot() {
        var eventEmitter;
        if (this.parent.once) {  // Game object
            eventEmitter = this.parent;
        } else if (this.parent.events && this.parent.events.once) { // Scene
            eventEmitter = this.parent.events;
        }

        if (eventEmitter) {
            eventEmitter.once('destroy', this.onParentDestroy, this);
        }
    }

    shutdown(fromScene) {
        // Already shutdown
        if (!this.parent) {
            return this;
        }

        this.stop();
        if (IsSceneObject(this.parent)) {  // Parent is Scene Object
            this.parent.events.off('shutdown', this.onParentDestroy, this);
        }
        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        return this;
    }

    destroy(fromScene) {
        this.shutdown(fromScene);
        return this;
    }

    onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
    }

    start(tweenConfig) {
        if (this.isRunning) {
            return this;
        }

        this.tween = this.scene.tweens.add(tweenConfig)
            .on('complete', this.complete, this);
        if (this.getEventEmitter() === false) {
            this.setEventEmitter(this.tween);
        }
        return this;
    }

    restart() {
        this.stop().start();
        return this;
    }

    stop() {
        if (!this.tween) {
            return this;
        }

        if (this.getEventEmitter() === this.tween) {
            this.setEventEmitter(false);
        }
        this.tween.remove();
        this.tween = undefined;
        return this;
    }

    pause() {
        if (!this.tween) {
            return this;
        }
        this.tween.pause();
        return this;
    }

    resume() {
        if (!this.tween) {
            return this;
        }
        this.tween.resume();
        return this;
    }

    complete() {
        this.stop();
        if (this.getEventEmitter()) {
            this.emit('complete');
        }
        return this;
    }

    get isRunning() {
        return (!!this.tween);
    }
}

Object.assign(
    TweenBase.prototype,
    EventEmitterMethods
);

export default TweenBase;