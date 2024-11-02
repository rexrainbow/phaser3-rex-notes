import Methods from './methods/Methods.js';
import GetBoundsConfig from '../../bounds/GetBoundsConfig.js';

const Graphics = Phaser.GameObjects.Graphics;

class DefaultMaskGraphics extends Graphics {
    constructor(parent, shapeType, padding) {
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
        // Don't add it to display list
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
