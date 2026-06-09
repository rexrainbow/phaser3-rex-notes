import Methods from './methods/Methods.js';
import GetBoundsConfig from '../../bounds/GetBoundsConfig.js';
import GetMaskFilterViewTransformByScaleFactor from '../GetMaskFilterViewTransformByScaleFactor.js';
import IsWebGLRenderMode from '../../system/IsWebGLRenderMode.js';

import { GameObjects as PhaserGameObjects } from 'phaser';
const Base = PhaserGameObjects.Rectangle;
const TransformMatrix = PhaserGameObjects.Components.TransformMatrix;

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
        this._maskFilterViewTransform = new TransformMatrix();
        this._maskFilterController = undefined;
        this._maskFilterType = undefined;
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
        this._updateMaskPosition();

        var width = this._maskWidth;
        var height = this._maskHeight;
        var padding = this.padding;
        var originX = this._maskOriginX;
        var originY = this._maskOriginY;
        var displayOriginX = (width * originX) + padding.left;
        var displayOriginY = (height * originY) + padding.top;

        this.setSize(
            width + padding.left + padding.right,
            height + padding.top + padding.bottom
        );

        this.originX = originX;
        this.originY = originY;
        this._displayOriginX = displayOriginX;
        this._displayOriginY = displayOriginY;

        return this;
    }

    _updateMaskPosition() {
        this.x = this._maskX;
        this.y = this._maskY;
        this.setScale(1);

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
        this._syncMaskFilterController(this._maskFilterController, this._maskFilterType);

        return this;
    }

    getMaskFilterScaleFactor() {
        return 1 / this.maskScaleFactor;
    }

    _syncMaskFilter(maskObject, maskType) {
        if (!maskObject || !maskObject.updateDynamicTexture) {
            return this;
        }

        maskObject._rexDefaultMaskGameObjectType = maskType;

        this._maskFilterController = maskObject;
        this._maskFilterType = maskType;
        this._installMaskFilterSync(maskObject);
        this._syncMaskFilterController(maskObject, maskType);

        return this;
    }

    _syncMaskFilterController(maskObject, maskType) {
        if (!maskObject || (maskObject.maskGameObject !== this)) {
            if (this._maskFilterController === maskObject) {
                this._maskFilterController = undefined;
                this._maskFilterType = undefined;
            }

            return this;
        }

        var scaleFactor = this.getMaskFilterScaleFactor();

        if (maskObject.scaleFactor !== scaleFactor) {
            maskObject.scaleFactor = scaleFactor;
        }

        var normalizeMaskType = ((maskType === 'local') || (maskType === 'world')) ? maskType : 'world';
        maskObject.viewTransform = GetMaskFilterViewTransformByScaleFactor(
            this,
            this.maskScaleFactor,
            normalizeMaskType,
            this._maskFilterViewTransform
        );
        maskObject.needsUpdate = true;

        return this;
    }

    _installMaskFilterSync(maskObject) {
        if (maskObject._rexDefaultMaskGameObjectUpdateDynamicTexture) {
            return this;
        }

        var updateDynamicTexture = maskObject.updateDynamicTexture;

        maskObject.updateDynamicTexture = function (width, height) {
            var maskGameObject = this.maskGameObject;

            if (maskGameObject && maskGameObject._syncMaskFilterController) {
                maskGameObject._syncMaskFilterController(this, this._rexDefaultMaskGameObjectType);
            }

            updateDynamicTexture.call(this, width, height);
        };

        maskObject._rexDefaultMaskGameObjectUpdateDynamicTexture = updateDynamicTexture;

        return this;
    }

    destroy(fromScene) {
        this.parent = undefined;
        this._maskFilterController = undefined;
        this._maskFilterType = undefined;
        this._maskFilterViewTransform.destroy();
        super.destroy(fromScene);
        return this;
    }

}

Object.assign(
    RectangleMask.prototype,
    Methods
)

export default RectangleMask;
