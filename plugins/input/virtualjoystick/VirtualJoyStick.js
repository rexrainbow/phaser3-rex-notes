import TouchCursor from 'rexPlugins/touchcursor.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class VirtualJoyStick {
    constructor(scene, config) {
        this.scene = scene;
        this.x = GetValue(config, 'x', 0);
        this.y = GetValue(config, 'y', 0);
        this.radius = GetValue(config, 'radius', 100);

        this.base = this.createBase(config);
        this.thumb = this.createThumb(config);
        this.touchCursor = this.createTouchCursor(this.base, config);

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

    createBase(config) {
        var base = GetValue(config, 'base', undefined);
        if (base === undefined) {
            base = this.scene.add.graphics()
                .lineStyle(3, 0x0000ff)
                .strokeCircle(0, 0, this.radius);
        }
        base.setPosition(this.x, this.y);
        return base;
    }

    createThumb(config) {
        var thumb = GetValue(config, 'thumb', undefined);
        if (thumb === undefined) {
            thumb = this.scene.add.graphics()
                .lineStyle(3, 0x00ff00)
                .strokeCircle(0, 0, 40);
        }
        thumb.setPosition(this.x, this.y);
        return thumb;
    }

    createTouchCursor(gameObject, config) {
        var touchCursor = new TouchCursor(gameObject, config)
        return touchCursor;
    }

    boot() {
        var ee = this.scene.sys.events;
        ee.on('preupdate', this.update, this);
    }

    destroy() {
        this.base.destroy();
        this.thumb.destroy();
        this.touchCursor.destroy();
        this.forceLine.destroy();
    }

    update() {
        this.updateThumb();
    }

    updateThumb() {
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