import TouchCursor from '../../touchcursor.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class VirtualJoyStick {
    constructor(scene, config) {
        this.scene = scene;
        this.base = undefined;
        this.thumb = undefined;
        this.touchCursor = undefined;
        this.radius = GetValue(config, 'radius', 100);

        this.addBase(GetValue(config, 'base', undefined), config);
        this.addThumb(GetValue(config, 'thumb', undefined));

        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        this.base.setPosition(x, y);
        this.thumb.setPosition(x, y);

        if (GetValue(config, 'fixed', true)) {
            this.setScrollFactor(0);
        }

        this.boot();
    }

    createCursorKeys() {
        return this.touchCursor.createCursorKeys();
    }

    get forceX() {
        return this.touchCursor.forceX;
    }

    get forceY() {
        return this.touchCursor.forceY;
    }

    get force() {
        return this.touchCursor.force;
    }

    get rotation() {
        return this.touchCursor.rotation;
    }

    get angle() {
        return this.touchCursor.angle; // -180 ~ 180
    }

    get up() {
        return this.touchCursor.upKeyDown;
    }

    get down() {
        return this.touchCursor.downKeyDown;
    }

    get left() {
        return this.touchCursor.leftKeyDown;
    }

    get right() {
        return this.touchCursor.rightKeyDown;
    }

    get noKey() {
        return this.touchCursor.noKeyDown;
    }

    get pointerX() {
        return this.touchCursor.end.x;
    }

    get pointerY() {
        return this.touchCursor.end.y;
    }

    get pointer() {
        return this.touchCursor.pointer;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    set x(x) {
        this.base.x = x;
    }

    set y(y) {
        this.base.y = y;
    }

    get x() {
        return this.base.x;
    }

    get y() {
        return this.base.y;
    }

    setVisible(visible) {
        this.visible = visible;
    }

    toggleVisible() {
        this.visible = !this.visible;
    }

    get visible() {
        return this.base.visible;
    }

    set visible(visible) {
        this.base.visible = visible;
        this.thumb.visible = visible;
    }

    setEnable(value) {
        this.enable = value;
        return this;
    }

    toggleEnabl() {
        this.enable = !this.enable;
    }

    get enable() {
        return this.touchCursor.enable;
    }

    set enable(value) {
        this.touchCursor.setEnable(value);
    }

    on() {
        var ee = this.touchCursor.events;
        ee.on.apply(ee, arguments);
        return this;
    }

    once() {
        var ee = this.touchCursor.events;
        ee.once.apply(ee, arguments);
        return this;
    }

    setVisible(visible) {
        this.visible = visible;
        return this;
    }

    addBase(gameObject, config) {
        if (this.base) {
            this.base.destroy();
            // Also destroy touchCursor behavior
        }

        if (gameObject === undefined) {
            gameObject = this.scene.add.circle(0, 0, this.radius)
                .setStrokeStyle(3, 0x0000ff);
        }
        this.touchCursor = new TouchCursor(gameObject, config)
        this.base = gameObject;
        return this;
    }

    addThumb(gameObject) {
        if (this.thumb) {
            this.thumb.destroy();
        }

        if (gameObject === undefined) {
            gameObject = this.scene.add.circle(0, 0, 40)
                .setStrokeStyle(3, 0x00ff00);
        }
        this.thumb = gameObject;
        return this;
    }

    setScrollFactor(scrollFactor) {
        this.base.setScrollFactor(scrollFactor);
        this.thumb.setScrollFactor(scrollFactor);
    }

    boot() {
        this.touchCursor.on('update', this.update, this);
    }

    destroy() {
        this.base.destroy(); // Also destroy touchCursor behavior
        this.thumb.destroy();

        this.base = undefined;
        this.thumb = undefined;
        this.touchCursor = undefined;
    }

    update() {
        var touchCursor = this.touchCursor;
        if (touchCursor.anyKeyDown) {
            if (touchCursor.force > this.radius) {
                var rad = touchCursor.rotation;
                this.thumb.x = touchCursor.start.x + (Math.cos(rad) * this.radius);
                this.thumb.y = touchCursor.start.y + (Math.sin(rad) * this.radius);
            } else {
                this.thumb.x = touchCursor.end.x;
                this.thumb.y = touchCursor.end.y;
            }
        } else {
            this.thumb.x = this.base.x;
            this.thumb.y = this.base.y;
        }
        return this;
    }


}

export default VirtualJoyStick;