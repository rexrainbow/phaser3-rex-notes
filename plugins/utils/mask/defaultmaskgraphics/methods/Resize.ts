import DrawShape from './DrawShape';
import IsKeyValueEqual from '../../../object/IsKeyValueEqual';
import Clone from '../../../object/Clone';

var Resize = function(width?: any, height?: any, padding?: any) {
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

    if (isPaddingChanged?: any) {
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