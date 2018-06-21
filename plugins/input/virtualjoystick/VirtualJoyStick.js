import TouchCursor from 'rexPlugins/touchcursor.js';

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

    get visible() {
        return this.base.visible;
    }

    set visible(visible) {
        this.base.visible = visible;
        this.thumb.visible = visible;
    }

    setVisible(visible) {
        this.visible = visible;
        return this;
    }

    addBase(gameObject, config) {
        if (this.base) {
            this.base.destroy();
            // also destroy touchCursor behavior
        }

        if (gameObject === undefined) {
            gameObject = this.scene.add.graphics()
                .lineStyle(3, 0x0000ff)
                .strokeCircle(0, 0, this.radius);
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
            gameObject = this.scene.add.graphics()
                .lineStyle(3, 0x00ff00)
                .strokeCircle(0, 0, 40);
        }
        this.thumb = gameObject;
        return this;
    }

    boot() {
        var ee = this.scene.sys.events;
        ee.on('preupdate', this.update, this);
    }

    destroy() {
        this.base.destroy(); // also destroy touchCursor behavior
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
    }


}

export default VirtualJoyStick;