import DrawShape from './DrawShape.js';
import GetBoundsConfig from '../../bounds/GetBoundsConfig.js';
import IsKeyValueEqual from '../../object/IsKeyValueEqual.js';
import Clone from '../../object/Clone.js';

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

    setPosition(x, y) {
        var parent = this.parent;
        if (x === undefined) {
            x = parent.x;
        }
        if (y === undefined) {
            y = parent.y;
        }
        super.setPosition(x, y);
        return this;
    }

    resize(width, height, padding) {
        var parent = this.parent;
        if (width === undefined) {
            width = parent.width;
        }
        if (height === undefined) {
            height = parent.height;
        }

        if (padding === undefined) {
            padding = this.padding;
        } else if (typeof (padding) === 'number') {
            padding = GetBoundsConfig(padding);
        }

        var isSizeChanged = (this.width !== width) || (this.height !== height);
        var isPaddingChanged = (this.padding !== padding) && !IsKeyValueEqual(this.padding, padding);
        if (!isSizeChanged && !isPaddingChanged) {
            return this;
        }

        this.width = width;
        this.height = height;

        if (isPaddingChanged) {
            Clone(padding, this.padding);
        }

        // Graphics does not have originX, originY properties
        this.originX = parent.originX;
        this.originY = parent.originY;

        DrawShape.call(this,
            width, height, padding,
            parent.originX, parent.originY
        );

        return this;
    }

    setOrigin(originX, originY) {
        if (originY === undefined) {
            originY = originX;
        }

        var parent = this.parent;
        if (originX === undefined) {
            originX = parent.originX;
        }
        if (originY === undefined) {
            originY = parent.originY;
        }
        if ((this.originX === originX) && (this.originY === originY)) {
            return this;
        }

        this.originX = originX;
        this.originY = originY;

        DrawShape.call(this,
            this.width, this.height, this.padding,
            originX, originY,
        );
        return this;
    }
}

const SHAPEMODE = {
    rectangle: 0,
    circle: 1,
}
export default DefaultMaskGraphics;
