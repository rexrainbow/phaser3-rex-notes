import Methods from './methods/Methods.js';
import GetBoundsConfig from '../../bounds/GetBoundsConfig.js';

import { GameObjects as PhaserGameObjects } from 'phaser';
const Base = PhaserGameObjects.Arc;

class CircleMask extends Base {
    constructor(parent, padding) {
        super(parent.scene, 0, 0, 1, 0, 360, false, 0xffffff, 1);
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
        var radius = (Math.min(width, height) / 2) + padding.left;
        var diameter = radius * 2;
        var displayOriginX = radius + (width * (originX - 0.5));
        var displayOriginY = radius + (height * (originY - 0.5));

        this.setRadius(radius);
        this.geom.setTo(radius, radius, radius);

        this.originX = (diameter === 0) ? 0.5 : displayOriginX / diameter;
        this.originY = (diameter === 0) ? 0.5 : displayOriginY / diameter;
        this._displayOriginX = displayOriginX;
        this._displayOriginY = displayOriginY;

        return this;
    }

    destroy(fromScene) {
        this.parent = undefined;
        super.destroy(fromScene);
        return this;
    }

}

Object.assign(
    CircleMask.prototype,
    Methods
)

export default CircleMask;
