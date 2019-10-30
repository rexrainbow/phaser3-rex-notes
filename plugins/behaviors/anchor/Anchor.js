import GetViewport from './GetViewport.js';

const Rectangle = Phaser.Geom.Rectangle;

class Anchor {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.viewport = new Rectangle();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        var alignX, configX;
        if (o.x !== undefined) {
            alignX = null;
            configX = o.x;
        } else if (o.left !== undefined) {
            alignX = 0;
            configX = o.left;
        } else if (o.right !== undefined) {
            alignX = 1;
            configX = o.right;
        } else if (o.centerX !== undefined) {
            alignX = 0.5;
            configX = o.centerX;
        }

        var alignY, configY;
        if (o.y !== undefined) {
            alignY = null;
            configY = o.y;
        } else if (o.top !== undefined) {
            alignY = 0;
            configY = o.top;
        } else if (o.bottom !== undefined) {
            alignY = 1;
            configY = o.bottom;
        } else if (o.centerY !== undefined) {
            alignY = 0.5;
            configY = o.centerY;
        }

        var percentageX, offsetX;
        if (configX !== undefined) {
            configX = configX.replace('left', '0%').replace('right', '100%').replace('center', '50%').split('%');
            percentageX = parseFloat(configX[0]) / 100;
            offsetX = (configX[1] === '') ? 0 : parseFloat(configX[1]);
        }
        var percentageY, offsetY;
        if (configY !== undefined) {
            configY = configY.replace('top', '0%').replace('bottom', '100%').replace('center', '50%').split('%');
            percentageY = parseFloat(configY[0]) / 100;
            offsetY = (configY[1] === '') ? 0 : parseFloat(configY[1]);
        }

        this.setAlign(alignX, alignY);
        this.setPercentage(percentageX, percentageY);
        this.setOffset(offsetX, offsetY);
        return this;
    }

    boot() {
        this.scaleManamger.on('resize', this.anchor, this);
        this.gameObject.once('destroy', this.destroy, this);

        this.anchor();
    }

    shutdown() {
        this.scaleManamger.off('resize', this.anchor, this);
        this.gameObject = undefined;
    }

    destroy() {
        this.shutdown();
    }

    setAlign(x, y) {
        this.alignX = x;
        this.alignY = y;
        return this;
    }

    setPercentage(x, y) {
        this.percentageX = x;
        this.percentageY = y;
        return this;
    }

    setOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
        return this;
    }

    anchor() {
        GetViewport(this.scaleManamger, this.viewport);
        this.updatePosition();
        return this;
    }

    updatePosition() {
        var gameObject = this.gameObject;

        if (this.alignX === null) {
            gameObject.x = this.anchorX;
        } else if (this.alignX !== undefined) {
            gameObject.x = this.anchorX + (gameObject.displayWidth * (gameObject.originX - this.alignX));
        }

        if (this.alignY === null) {
            this.gameObject.y = this.anchorY;
        } else if (this.alignY !== undefined) {
            gameObject.y = this.anchorY + (gameObject.displayHeight * (gameObject.originY - this.alignY));
        }
        return this;
    }

    get scaleManamger() {
        return this.gameObject.scene.scale;
    }

    get anchorX() {
        return this.viewport.x + (this.viewport.width * this.percentageX) + this.offsetX;
    }

    get anchorY() {
        return this.viewport.y + (this.viewport.height * this.percentageY) + this.offsetY;
    }
}

export default Anchor;