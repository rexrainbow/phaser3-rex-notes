import GetSceneObject from '../../utils/system/GetSceneObject.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;

class DragSpeed extends EE {
    constructor(gameObject, config) {
        super();
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

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
        this.setEnable(GetValue(o, "enable", true));
        this.holdThreshold = GetValue(o, "holdThreshold", 50); // ms
        return this;
    }

    boot() {
        this.gameObject.on('pointerdown', this.onPointIn, this);
        this.gameObject.on('pointerover', this.onPointIn, this);
        this.gameObject.on('pointerup', this.onPointOut, this);
        this.gameObject.on('pointerout', this.onPointOut, this);
        this.gameObject.on('pointermove', this.onPointerMove, this);
        this.gameObject.on('destroy', this.destroy, this);
        this.scene.events.on('preupdate', this.preupdate, this);
    }

    shutdown() {
        super.shutdown();
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('preupdate', this.preupdate, this);
        }
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

    get justMoved() {
        return this.pointer && this.pointer.justMoved;
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
        if (!pointer.isDown ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.localX = localX;
        this.localY = localY;
    }

    onPointOut(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
    }

    onPointerMove(pointer, localX, localY) {
        if (!pointer.isDown ||
            (this.pointer !== pointer)) {
            return;
        }
        this.localX = localX;
        this.localY = localY;
    }

    preupdate(time, delta) {
        var pointer = this.pointer;
        if (pointer && (!this.isInTouched)) {
            // touch start
            this.x = pointer.x;
            this.y = pointer.y;
            this.preX = pointer.x;
            this.preY = pointer.y;
            this.isInTouched = true;
            this.holdStartTime = undefined;
            this.emit('touchstart', pointer, this.localX, this.localY);

        } else if (pointer && this.isInTouched) {
            // in touch
            if ((this.x === pointer.x) && (this.y === pointer.y)) {
                // hold
                if (this.holdStartTime === undefined) {
                    this.holdStartTime = time;
                } else if (time - this.holdStartTime > this.holdThreshold) {
                    this.preX = this.x;
                    this.preY = this.y;
                }
            } else {
                // move
                this.preX = this.x;
                this.preY = this.y;
                this.x = pointer.x;
                this.y = pointer.y;
                this.holdStartTime = undefined;
                this.emit('touchmove', pointer, this.localX, this.localY);
            }

        } else if ((!pointer) && this.isInTouched) {
            // touch end
            this.isInTouched = false;
            this.holdStartTime = undefined;
            this.emit('touchend', pointer);

        }
    }
}

export default DragSpeed;