import Methods from './methods/Methods';
import GetBoundsConfig from '../../bounds/GetBoundsConfig';

import { GameObjects as PhaserGameObjects } from 'phaser';
const Graphics = PhaserGameObjects.Graphics;

class DefaultMaskGraphics extends Graphics {
    shapeType: any;

    padding: any;
    parent: any;
    setPosition: any;

    constructor(parent?: any, shapeType?: any, padding?: any) {
        if (shapeType === undefined) {
            shapeType = 0;
        }
        if (typeof (shapeType) === 'string') {
            shapeType = SHAPEMODE[shapeType];
        }

        super(parent.scene);
        this.parent = parent;
        this.shapeType = shapeType;
        this.padding = GetBoundsConfig(padding);
        this.setPosition().resize().setVisible(false);

        // Add to display list or container, depend on parent
        if (parent.parentContainer) {
            parent.parentContainer.add(this);
        } else {
            parent.scene.add.existing(this);
        }
    }

    destroy() {
        this.parent = undefined;
        super.destroy();
        return this;
    }
}

const SHAPEMODE = {
    rectangle: 0,
    circle: 1,
}

Object.assign(
    DefaultMaskGraphics.prototype,
    Methods
)

export default DefaultMaskGraphics;