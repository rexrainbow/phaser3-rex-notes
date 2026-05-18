import EventEmitterMethods from '../eventemitter/EventEmitterMethods';
import GetSceneObject from '../system/GetSceneObject';
import GetGame from '../system/GetGame';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class ComponentBase {
    destroyEventEmitter: any;
    game: any;
    isShutdown: any;
    parent: any;
    scene: any;
    setEventEmitter: any;

    constructor(parent?: any, config?: any) {
        this.setParent(parent);  // gameObject, scene, or game

        this.isShutdown = false;

        // Event emitter, default is private event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', true));

        // Register callback of parent destroy event, also see `shutdown` method
        if (this.parent) {
            if (this.parent === this.scene) { // parent is a scene
                this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);

            } else if (this.parent === this.game) { // parent is game
                this.game.events.once('shutdown', this.onEnvDestroy, this);

            } else if (this.parent.once) { // parent is game object or something else
                this.parent.once('destroy', this.onParentDestroy, this);
            }

            // bob object does not have event emitter
        }

    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // parent might not be shutdown yet
        if (this.parent) {
            if (this.parent === this.scene) { // parent is a scene
                this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);

            } else if (this.parent === this.game) { // parent is game
                this.game.events.off('shutdown', this.onEnvDestroy, this);

            } else if (this.parent.once) { // parent is game object or something else
                this.parent.off('destroy', this.onParentDestroy, this);
            }

            // bob object does not have event emitter
        }


        this.destroyEventEmitter();

        this.parent = undefined;
        this.scene = undefined;
        this.game = undefined;

        this.isShutdown = true;
    }

    destroy(fromScene?: any) {
        this.shutdown(fromScene);
    }

    onEnvDestroy() {
        this.destroy(true);
    }

    onParentDestroy(parent?: any, fromScene?: any) {
        this.destroy(fromScene);
    }

    setParent(parent?: any) {
        this.parent = parent;  // gameObject, scene, or game

        this.scene = GetSceneObject(parent);
        this.game = GetGame(parent);

        return this;
    }

};

Object.assign(
    ComponentBase.prototype,
    EventEmitterMethods
);

export default ComponentBase;