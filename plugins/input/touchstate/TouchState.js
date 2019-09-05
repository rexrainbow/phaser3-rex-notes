import GetSceneObject from '../../utils/system/GetSceneObject.js';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;

class TouchState {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this.gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.pointer = undefined;
        this.isInTouched = false;
        this.x = undefined;
        this.y = undefined;
        this.preX = undefined;
        this.preY = undefined;
        this.localX = undefined;
        this.localY = undefined;
        this.justMoved = false;
        this.setEnable(GetValue(o, "enable", true));
        return this;
    }

    boot() {
        this.gameObject.on('pointerdown', this.onPointIn, this);
        this.gameObject.on('pointerover', this.onPointIn, this);
        this.gameObject.on('pointerup', this.onPointOut, this);
        this.gameObject.on('pointerout', this.onPointOut, this);
        this.gameObject.on('pointermove', this.onPointerMove, this);
        this.scene.events.on('postupdate', this.postupdate, this);

        this.gameObject.once('destroy', this.destroy, this);
    }

    shutdown() {
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('postupdate', this.postupdate, this);
        }
        this.destroyEventEmitter();
        this.pointer = undefined;
        this.gameObject = undefined;
        this.scene = undefined;
        // gameObject events will be removed when this gameObject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        if (this.enable === e) {
            return this;
        }

        if (!e) {
            this.isInTouched = false;
            this.pointer = undefined;
        }
        this.enable = e;
        this.gameObject.input.enabled = e;
        return this;
    }

    get isDown() {
        return this.pointer && this.pointer.isDown;
    }

    get isUp() {
        return this.pointer === undefined;
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
        var d = DistanceBetween(this.x, this.preX, this.y, this.preY);
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
        if (!pointer.isDown ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.isInTouched = true;
        this.preX = pointer.x;
        this.preY = pointer.y;
        this.x = pointer.x;
        this.y = pointer.y;
        this.localX = localX;
        this.localY = localY;
        this.emit('touchstart', pointer, localX, localY);
    }

    onPointOut(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
        this.isInTouched = false;
        this.emit('touchend', pointer);
    }

    onPointerMove(pointer, localX, localY) {
        if (!pointer.isDown ||
            (this.pointer !== pointer)) {
            return;
        }
        this.preX = this.x;
        this.preY = this.y;
        this.x = pointer.x;
        this.y = pointer.y;
        this.localX = localX;
        this.localY = localY;
        this.justMoved = true;
        this.emit('touchmove', pointer, localX, localY);
    }

    postupdate(time, delta) {
        this.justMoved = false;
    }

}

Object.assign(
    TouchState.prototype,
    EventEmitterMethods
);

export default TouchState;