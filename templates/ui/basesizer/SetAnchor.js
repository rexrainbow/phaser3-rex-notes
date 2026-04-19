import Anchor from '../anchor/Anchor.js';

var SetAnchor = function (config) {
    if (config === undefined) {
        config = {};
    }

    // Assign default onResizeCallback if not given
    var hasMinWidth = config.width !== undefined;
    var hasMinHeight = config.height !== undefined;
    if ((hasMinWidth || hasMinHeight) && !config.onResizeCallback) {
        var hasAspectRatio = (config.aspectRatio === true) || (config.aspectRatio > 0);
        var resizeWidth = hasMinWidth || (hasMinHeight && hasAspectRatio);
        var resizeHeight = hasMinHeight || (hasMinWidth && hasAspectRatio);
        config.onResizeCallback = function (width, height, sizer) {
            if (resizeWidth) {
                sizer.setMinWidth(width);
            }

            if (resizeHeight) {
                sizer.setMinHeight(height);
            }

            sizer.layout();
        }

    }

    if (this._anchor === undefined) {
        this._anchor = new Anchor(this, config);
    } else {
        this._anchor.resetFromJSON(config)
    }
    return this;
}

export default SetAnchor;