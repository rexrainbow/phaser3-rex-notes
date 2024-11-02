import DrawShape from './DrawShape.js';
import IsKeyValueEqual from '../../../object/IsKeyValueEqual.js';
import Clone from '../../../object/Clone.js';

var Resize = function (width, height, padding) {
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

export default Resize;