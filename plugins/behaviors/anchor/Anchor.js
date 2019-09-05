import GetViewport from './GetViewport.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Rectangle = Phaser.Geom.Rectangle;

class Anchor {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.viewport = new Rectangle();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        var configX, configY;
        if (typeof (o) === 'string') {
            var configXY = o.split(',');
            configX = configXY[0];
            configY = configXY[1];
        } else {
            configX = GetValue(o, 'x', '0%+0');
            configY = GetValue(o, 'y', '0%+0');
        }

        configX = configX.replace('left', '0%').replace('right', '100%').replace('center', '50%').split('%');
        var percentageX = parseFloat(configX[0]) / 100;
        var offsetX = (configX[1] === '') ? 0 : parseFloat(configX[1]);

        configY = configY.replace('top', '0%').replace('bottom', '100%').replace('center', '50%').split('%');
        var percentageY = parseFloat(configY[0]) / 100;
        var offsetY = (configY[1] === '') ? 0 : parseFloat(configY[1]);

        this.setPercentage(percentageX, percentageY);
        this.setOffset(offsetX, offsetY);
        return this;
    }

    boot() {
        this.scaleManamger.on('resize', this.onResize, this);
        this.gameObject.once('destroy', this.destroy, this);

        this.onResize();
    }

    shutdown() {
        this.scaleManamger.off('resize', this.onResize, this);
        this.gameObject = undefined;
    }

    destroy() {
        this.shutdown();
    }

    setOffset(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = x;
        }
        this.offsetX = x;
        this.offsetY = y;
        return this;
    }

    setPercentage(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = x;
        }
        this.percentageX = x;
        this.percentageY = y;
        return this;
    }

    onResize() {
        GetViewport(this.scaleManamger, this.viewport);
        this.updatePosition();
    }

    updatePosition() {
        this.gameObject.setPosition(this.x, this.y);
        return this;
    }

    get scaleManamger() {
        return this.gameObject.scene.scale;
    }

    get x() {
        return this.viewport.x + (this.viewport.width * this.percentageX) + this.offsetX;
    }

    get y() {
        return this.viewport.y + (this.viewport.height * this.percentageY) + this.offsetY;
    }
}

export default Anchor;