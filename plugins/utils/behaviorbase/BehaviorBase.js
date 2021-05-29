import EventEmitterMethods from '../eventemitter/EventEmitterMethods.js';
import GetSceneObject from '../system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BehaviorBase {
    constructor(parent, config) {
        this.parent = parent;  // gameObject or scene
        this.scene = GetSceneObject(parent);
        this.isSceneParent = (this.parent === this.scene);

        // Event emitter, default is private event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', true));

        // Register callback of parent destroy event, also see `shutdown` method
        if (this.isSceneParent) { // parent is a scene
            this.scene.events.once('shutdown', this.onSceneDestroy, this);
        } else if (this.parent.once) { // bob object does not have event emitter
            this.parent.on('destroy', this.onParentDestroy, this);
        }
    }

    get gameObject() {
        return (this.isSceneParent) ? null : this.parent;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (!this.parent) {
            return;
        }

        if (this.isSceneParent) { // parent is a scene instance
            this.scene.events.off('shutdown', this.destroy, this);
        } else if (this.parent.once) { // bob object does not have event emitter
            this.parent.off('destroy', this.onParentDestroy, this);
        }

        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
    }

    destroy(fromScene) {
        this.shutdown(fromScene);
    }

    onSceneDestroy() {
        this.destroy(true);
    }

    onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
    }

};

Object.assign(
    BehaviorBase.prototype,
    EventEmitterMethods
);

export default BehaviorBase;