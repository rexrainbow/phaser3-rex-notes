import EventEmitterMethods from '../eventemitter/EventEmitterMethods.js';
import GetSceneObject from '../system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ComponentBase {
    constructor(parent, config) {
        this.parent = parent;  // gameObject or scene
        this.scene = GetSceneObject(parent);
        this.isShutdown = false;

        // Event emitter, default is private event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', true));

        // Register callback of parent destroy event, also see `shutdown` method
        if (this.parent && (this.parent === this.scene)) { // parent is a scene
            this.scene.events.once('shutdown', this.onSceneDestroy, this);
        } else if (this.parent && this.parent.once) { // bob object does not have event emitter
            this.parent.once('destroy', this.onParentDestroy, this);
        }
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // parent might not be shutdown yet
        if (this.parent && (this.parent === this.scene)) { // parent is a scene
            this.scene.events.off('shutdown', this.onSceneDestroy, this);
        } else if (this.parent && this.parent.once) { // bob object does not have event emitter
            this.parent.off('destroy', this.onParentDestroy, this);
        }

        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.isShutdown = true;
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
    ComponentBase.prototype,
    EventEmitterMethods
);

export default ComponentBase;