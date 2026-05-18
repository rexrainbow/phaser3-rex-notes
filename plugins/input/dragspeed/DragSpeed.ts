import ComponentBase from '../../utils/componentbase/ComponentBase';
import GetTickDelta from '../../utils/system/GetTickDelta';
import IsPointerInBounds from '../../utils/input/IsPointerInBounds';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const DistanceBetween = PhaserMath.Distance.Between;

class DragSpeed extends ComponentBase {
    _enable: any;
    emit: any;
    holdStartTime: any;
    holdThreshold: any;
    isInTouched: any;
    isShutdown: any;
    justMoved: any;
    localX: any;
    localY: any;
    parent: any;
    pointer: any;
    pointerOutReleaseEnable: any;
    preX: any;
    preY: any;
    rectBoundsInteractive: any;
    scene: any;
    x: any;
    y: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._enable = undefined;

        this.rectBoundsInteractive = GetValue(config, 'rectBoundsInteractive', false);

        if (!this.rectBoundsInteractive) {
            gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
        }

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o?: any) {
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
        this.setEnable(GetValue(o, 'enable', true));
        this.holdThreshold = GetValue(o, 'holdThreshold', 50); // ms
        this.pointerOutReleaseEnable = GetValue(o, 'pointerOutRelease', true);
        return this;
    }

    boot() {
        var scene = this.scene;
        var gameObject = this.parent;

        if (!this.rectBoundsInteractive) {
            // Drag start only when pointer down
            gameObject.on('pointerdown', this.onPointIn, this);

            gameObject.on('pointerup', this.onPointOut, this);

            if (this.pointerOutReleaseEnable) {
                gameObject.on('pointerout', this.onPointOut, this);
            }

            gameObject.on('pointermove', this.onPointerMove, this);

        } else {
            scene.input.on('pointerdown', this.onPointIn, this);

            scene.input.on('pointerup', this.onPointOut, this);

            scene.input.on('pointermove', this.onPointerMove, this);
        }

        scene.sys.events.on('preupdate', this.preupdate, this);
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        var scene = this.scene;
        var gameObject = this.parent;

        if (!this.rectBoundsInteractive) {
            // GameObject events will be removed when this gameObject destroyed 
            // gameObject.off('pointerdown', this.onPointIn, this);
            // gameObject.off('pointerup', this.onPointOut, this);
            // gameObject.off('pointerout', this.onPointOut, this);
            // gameObject.off('pointermove', this.onPointerMove, this);

        } else {
            scene.input.off('pointerdown', this.onPointIn, this);

            scene.input.off('pointerup', this.onPointOut, this);

            scene.input.off('pointermove', this.onPointerMove, this);
        }

        scene.sys.events.off('preupdate', this.preupdate, this);

        this.pointer = undefined;

        super.shutdown(fromScene);
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

    setEnable(e?: any) {
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

    setPointerOutReleaseEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.pointerOutReleaseEnable = enable;
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
        var delta = GetTickDelta(this.scene);
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
    onPointIn(pointer?: any, localX?: any, localY?: any) {
        if ((!this.enable) ||
            (!pointer.isDown) ||
            (this.pointer !== undefined)) {
            return;
        }

        if (
            this.rectBoundsInteractive &&
            !IsPointerInBounds(this.parent, pointer)
        ) {
            return;
        }

        this.pointer = pointer;
        this.localX = localX;
        this.localY = localY;
    }

    onPointOut(pointer?: any) {
        if ((!this.enable) ||
            (this.pointer !== pointer)) {
            return;
        }
        this.pointer = undefined;
    }

    onPointerMove(pointer?: any, localX?: any, localY?: any) {
        if ((!this.enable) ||
            (!pointer.isDown) ||
            (this.pointer !== pointer)) {
            return;
        }

        if (
            this.rectBoundsInteractive &&
            this.pointerOutReleaseEnable &&
            !IsPointerInBounds(this.parent, pointer)
        ) {
            this.onPointOut(pointer);
            return;
        }

        this.localX = localX;
        this.localY = localY;
    }

    preupdate(time?: any, delta?: any) {
        if (!this.enable) {
            return;
        }

        var pointer = this.pointer;
        this.justMoved = false;
        if (pointer && (!this.isInTouched)) {
            // Touch start
            this.x = pointer.worldX;
            this.y = pointer.worldY;
            this.preX = pointer.worldX;
            this.preY = pointer.worldY;
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
                this.x = pointer.worldX;
                this.y = pointer.worldY;
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

export default DragSpeed;