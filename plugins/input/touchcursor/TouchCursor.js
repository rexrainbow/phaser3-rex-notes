import VectorToCursorKeys from '../../utils/input/VectorToCursorKeys.js';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const CircleClass = Phaser.Geom.Circle;
const CircleContains = Phaser.Geom.Circle.Contains;

class TouchCursor extends VectorToCursorKeys {
    constructor(gameObject, config) {
        super(config);
        //this.resetFromJSON(config); // this function had been called in super(config)

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.scene = gameObject.scene;
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

        this.gameObject.on('destroy', this.destroy, this);
    }

    shutdown() {
        if (this.scene) {
            this.scene.input.off('pointermove', this.onKeyDown, this);
            this.scene.input.off('pointerup', this.onKeyUp, this);
        }
        // gameObject events will be removed when this gameObject destroyed 

        this.destroyEventEmitter();

        this.pointer = undefined;
        this.scene = undefined;
        this.gameObject = undefined;
    }

    destroy() {
        this.shutdown();
    }

    onKeyDownStart(pointer) {
        if ((!pointer.isDown) ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.onKeyDown(pointer);
    }

    onKeyDown(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        if (!pointer.camera) {
            // Pointer is outside of any camera, no worldX/worldY available
            return;
        }

        // Vector of world position
        this.setVector(
            (this.gameObject.x + pointer.camera.scrollX),
            (this.gameObject.y + pointer.camera.scrollY),
            pointer.worldX,
            pointer.worldY
        );
        this.emit('update');
    }

    onKeyUp(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
        this.clearVector();
        this.emit('update');
    }

}

Object.assign(
    TouchCursor.prototype,
    EventEmitterMethods
);

export default TouchCursor;