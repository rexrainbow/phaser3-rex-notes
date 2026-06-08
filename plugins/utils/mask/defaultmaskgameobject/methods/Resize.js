import GetBoundsConfig from '../../../bounds/GetBoundsConfig.js';
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

    var isSizeChanged = (this._maskWidth !== width) || (this._maskHeight !== height);
    var isPaddingChanged = (this.padding !== padding) && !IsKeyValueEqual(this.padding, padding);
    if (!isSizeChanged && !isPaddingChanged) {
        return this;
    }

    this._maskWidth = width;
    this._maskHeight = height;

    if (isPaddingChanged) {
        Clone(padding, this.padding);
    }

    this._maskOriginX = parent.originX;
    this._maskOriginY = parent.originY;

    this._updateMaskGeometry();
    return this;
}

export default Resize;
