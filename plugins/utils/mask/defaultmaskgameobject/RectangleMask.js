import Methods from './methods/Methods.js';
import GetBoundsConfig from '../../bounds/GetBoundsConfig.js';

import { GameObjects as PhaserGameObjects } from 'phaser';
const Base = PhaserGameObjects.Rectangle;

class RectangleMask extends Base {
    constructor(parent, padding) {
        super(parent.scene, 0, 0, 1, 1, 0xffffff, 1);
        this.parent = parent;
        this.padding = GetBoundsConfig(padding);
        this.setPosition().resize().setVisible(false);

        // Add to display list or container, depend on parent
        if (parent.parentContainer) {
            parent.parentContainer.add(this);
        } else {
            parent.scene.add.existing(this);
        }
    }

    _updateMaskGeometry() {
        var width = this._maskWidth;
        var height = this._maskHeight;
        var padding = this.padding;
        var originX = this._maskOriginX;
        var originY = this._maskOriginY;

        this.setSize(
            width + padding.left + padding.right,
            height + padding.top + padding.bottom
        );

        this.originX = originX;
        this.originY = originY;
        this._displayOriginX = (width * originX) + padding.left;
        this._displayOriginY = (height * originY) + padding.top;

        return this;
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
