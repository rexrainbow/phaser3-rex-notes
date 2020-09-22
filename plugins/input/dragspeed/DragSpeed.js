import GetSceneObject from '../../utils/system/GetSceneObject.js';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;

class DragSpeed {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this._enable = undefined;
        gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.pointer = undefined;
        this.isInTouched = false;
        this.holdStartTime = undefined;
        this.x = undefined;
        this.y = undefined;
        this.preX = undefined;
        this.preY = undefined;
        this.localX = undefined;
        this.localY = undefined;
        this.justMoved = false;
        this.setEnable(GetValue(o, "enable", true));
        this.holdThreshold = GetValue(o, "holdThreshold", 50); // ms
        return this;
    }

    boot() {
        // Drag start only when pointer down
        this.gameObject.on('pointerdown', this.onPointIn, this); 
        // this.gameObject.on('pointerover', this.onPointIn, this);

        this.gameObject.on('pointerup', this.onPointOut, this);
        this.gameObject.on('pointerout', this.onPointOut, this);
        this.gameObject.on('pointermove', this.onPointerMove, this);
        this.gameObject.on('destroy', this.destroy, this);
        this.scene.events.on('preupdate', this.preupdate, this);
    }

    shutdown() {
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('preupdate', this.preupdate, this);
        }
        this.pointer = undefined;
        this.gameObject = undefined;
        this.scene = undefined;
        // GameObject events will be removed when this gameObject destroyed 
        this.destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }

        if (!e) {
            this.isInTouched = false;
            this.pointer = undefined;
        }
        this._enable = e;
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    get isDown() {
        return this.pointer && this.pointer.isDown;
    }

    get isUp() {
        return !this.isDown;
    }

    get dx() {
        return this.x - this.preX;
    }

    get dy() {
        return this.y - this.preY;
    }

    get dt() {
        var game = this.scene.sys.game;
        var delta = game.loop.delta;
        return delta;
    }

    get speed() {
        if ((this.x === this.preX) && (this.y === this.preY)) {
            return 0;
        }
        var d = DistanceBetween(this.preX, this.preY, this.x, this.y);
        var speed = d / (this.dt * 0.001);
        return speed;
    }

    get speedX() {
        return this.dx / (this.dt * 0.001);
    }

    get speedY() {
        return this.dy / (this.dt * 0.001);
    }

    // internal
    onPointIn(pointer, localX, localY) {
        if ((!this.enable) ||
            (!pointer.isDown) ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.localX = localX;
        this.localY = localY;
    }

    onPointOut(pointer) {
        if ((!this.enable) ||
            (this.pointer !== pointer)) {
            return;
        }
        this.pointer = undefined;
    }

    onPointerMove(pointer, localX, localY) {
        if ((!this.enable) ||
            (!pointer.isDown) ||
            (this.pointer !== pointer)) {
            return;
        }
        this.localX = localX;
        this.localY = localY;
    }

    preupdate(time, delta) {
        if (!this.enable) {
            return;
        }

        var pointer = this.pointer;
        this.justMoved = false;
        if (pointer && (!this.isInTouched)) {
            // Touch start
            this.x = pointer.x;
            this.y = pointer.y;
            this.preX = pointer.x;
            this.preY = pointer.y;
            this.isInTouched = true;
            this.holdStartTime = undefined;
            this.emit('touchstart', pointer, this.localX, this.localY);

        } else if (pointer && this.isInTouched) {
            // In touch
            if ((this.x === pointer.x) && (this.y === pointer.y)) {
                // Hold
                if (this.holdStartTime === undefined) {
                    this.holdStartTime = time;
                } else if (time - this.holdStartTime > this.holdThreshold) {
                    this.preX = this.x;
                    this.preY = this.y;
                }
            } else {
                // Move
                this.preX = this.x;
                this.preY = this.y;
                this.x = pointer.x;
                this.y = pointer.y;
                this.holdStartTime = undefined;
                this.justMoved = true;
                this.emit('touchmove', pointer, this.localX, this.localY);
            }

        } else if ((!pointer) && this.isInTouched) {
            // Touch end
            this.isInTouched = false;
            this.holdStartTime = undefined;
            this.emit('touchend', pointer);

        }
    }
}

Object.assign(
    DragSpeed.prototype,
    EventEmitterMethods
);

export default DragSpeed;