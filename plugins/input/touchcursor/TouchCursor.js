import VectorToCursorKeys from '../../utils/input/VectorToCursorKeys.js';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetPointerWorldXY from '../../utils/input/GetPointerWorldXY.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const CircleClass = Phaser.Geom.Circle;
const CircleContains = Phaser.Geom.Circle.Contains;

class TouchCursor extends VectorToCursorKeys {
    constructor(gameObject, config) {
        var scene = gameObject.scene;
        super(scene, config);
        //this.resetFromJSON(config); // this function had been called in super(config)

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.scene = scene;
        this.mainCamera = scene.sys.cameras.main;
        this.pointer = undefined;
        this.gameObject = gameObject;
        this.radius = GetValue(config, 'radius', 100);

        gameObject.setInteractive(new CircleClass(gameObject.displayOriginX, gameObject.displayOriginY, this.radius), CircleContains);

        this.boot();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.pointer = undefined;

        return this;
    }

    toJSON() {
        var o = super.toJSON();
        o.radius = this.radius;

        return o;
    }

    boot() {
        this.gameObject.on('pointerdown', this.onKeyDownStart, this);
        this.gameObject.on('pointerover', this.onKeyDownStart, this);

        this.scene.input.on('pointermove', this.onKeyDown, this);
        this.scene.input.on('pointerup', this.onKeyUp, this);

        this.gameObject.once('destroy', this.onParentDestroy, this);
    }

    shutdown(fromScene) {
        if (!this.scene) {
            return;
        }

        // gameObject events will be removed when this gameObject destroyed 
        // this.gameObject.off('pointerdown', this.onKeyDownStart, this);
        // this.gameObject.off('pointerover', this.onKeyDownStart, this);

        this.scene.input.off('pointermove', this.onKeyDown, this);
        this.scene.input.off('pointerup', this.onKeyUp, this);

        this.destroyEventEmitter();

        this.scene = undefined;
        this.mainCamera = undefined;
        this.pointer = undefined;
        this.gameObject = undefined;

        super.shutdown();
    }

    get enable() {
        return this._enable;
    }

    // Override setter of enable
    set enable(e) {
        if (this._enable === e) {
            return;
        }
        if (!e) {
            this.pointer = undefined; // Release pointer
        }
        super.enable = e;
        return this;
    }

    destroy(fromScene) {
        this.shutdown(fromScene);
    }

    onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
    }

    onKeyDownStart(pointer) {
        if ((!pointer.isDown) ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.onKeyDown(pointer);
        this.emit('pointerdown', pointer);
    }

    onKeyDown(pointer) {
        if (this.pointer !== pointer) {
            return;
        }

        var worldXY = GetPointerWorldXY(pointer, this.mainCamera, true);
        if (!worldXY) {
            // Pointer is outside of any camera, no worldX/worldY available
            return;
        }

        // Vector of world position
        var camera = pointer.camera;
        var gameObject = this.gameObject;
        var startX = gameObject.x - (camera.scrollX * (gameObject.scrollFactorX - 1));
        var startY = gameObject.y - (camera.scrollY * (gameObject.scrollFactorY - 1));

        this.setVector(startX, startY, worldXY.x, worldXY.y);

        this.end.x = worldXY.x;
        this.end.y = worldXY.y;

        this.emit('update');
    }

    onKeyUp(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
        this.clearVector();
        this.emit('update');
        this.emit('pointerup', pointer);
    }

    forceUpdate() {
        var pointer = this.pointer;
        if (!pointer || !pointer.isDown) {
            return this;
        }

        this.onKeyDown(pointer);
        return this;
    }

}

Object.assign(
    TouchCursor.prototype,
    EventEmitterMethods
);

export default TouchCursor;