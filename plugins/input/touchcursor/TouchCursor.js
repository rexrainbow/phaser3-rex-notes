import VectorToCursorKeys from '../../utils/input/VectorToCursorKeys.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const CircleClass = Phaser.Geom.Circle;
const CircleContains = Phaser.Geom.Circle.Contains;

class TouchCursor extends VectorToCursorKeys {
    constructor(gameObject, config) {
        super(config);
        //this.resetFromJSON(config); // this function had been called in super(config)

        this.events = new EE();
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

        this.gameObject.once('destroy', this.destroy, this);
    }

    shutdown() {
        if (this.scene) {
            this.scene.input.off('pointermove', this.onKeyDown, this);
            this.scene.input.off('pointerup', this.onKeyUp, this);
        }
        // gameObject events will be removed when this gameObject destroyed 

        this.events.destroy();

        this.pointer = undefined;
        this.scene = undefined;
        this.gameObject = undefined;
        this.events = undefined;
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

        var p0 = this.gameObject,
            p1 = pointer;
        this.setVector(p0.x, p0.y, p1.x, p1.y);
        this.events.emit('update');
    }

    onKeyUp(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
        this.clearVector();
        this.events.emit('update');
    }

    on() {
        var ee = this.events;
        ee.on.apply(ee, arguments);
        return this;
    }

    once() {
        var ee = this.events;
        ee.once.apply(ee, arguments);
        return this;
    }

}

export default TouchCursor;