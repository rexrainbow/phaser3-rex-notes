import Methods from './methods/Methods.js';
import GetBoundsConfig from '../../bounds/GetBoundsConfig.js';
import IsWebGLRenderMode from '../../system/IsWebGLRenderMode.js';

import { GameObjects as PhaserGameObjects } from 'phaser';
const Base = PhaserGameObjects.Rectangle;

const MaxMaskSize = 256;

var GetAutoMaskScaleFactor = function (width, height) {
    var maxSize = Math.max(width, height);
    var scaleFactor = 1;

    while ((maxSize / scaleFactor) > MaxMaskSize) {
        scaleFactor *= 2;
    }

    return scaleFactor;
}

class RectangleMask extends Base {
    constructor(parent, padding) {
        super(parent.scene, 0, 0, 1, 1, 0xffffff, 1);
        this.parent = parent;
        this.padding = GetBoundsConfig(padding);
        this.useMaskScaleFactor = IsWebGLRenderMode(parent.scene);
        this.maskScaleFactor = 1;
        this.setPosition().resize().setVisible(false);

        // Add to display list or container, depend on parent
        if (parent.parentContainer) {
            parent.parentContainer.add(this);
        } else {
            parent.scene.add.existing(this);
        }
    }

    _updateMaskGeometry() {
        this._updateMaskScaleFactor();

        var width = this._maskWidth;
        var height = this._maskHeight;
        var padding = this.padding;
        var originX = this._maskOriginX;
        var originY = this._maskOriginY;
        var scale = 1 / this.maskScaleFactor;

        this.setSize(
            (width + padding.left + padding.right) * scale,
            (height + padding.top + padding.bottom) * scale
        );

        this.originX = originX;
        this.originY = originY;
        this._displayOriginX = ((width * originX) + padding.left) * scale;
        this._displayOriginY = ((height * originY) + padding.top) * scale;

        return this;
    }

    _updateMaskScaleFactor() {
        var padding = this.padding;
        if ((this._maskWidth === undefined) || (this._maskHeight === undefined)) {
            this.maskScaleFactor = 1;
            return this;
        }

        var width = this._maskWidth + padding.left + padding.right;
        var height = this._maskHeight + padding.top + padding.bottom;

        this.maskScaleFactor = (this.useMaskScaleFactor) ? GetAutoMaskScaleFactor(width, height) : 1;

        var maskObject = this._maskObject;
        if (maskObject) {
            maskObject.scaleFactor = this.getMaskFilterScaleFactor();
            maskObject.needsUpdate = true;
        }

        return this;
    }

    getMaskFilterScaleFactor() {
        return 1 / this.maskScaleFactor;
    }

    destroy(fromScene) {
        this.parent = undefined;
        super.destroy(fromScene);
        return this;
    }

}

Object.assign(
    RectangleMask.prototype,
    Methods
)

export default RectangleMask;
