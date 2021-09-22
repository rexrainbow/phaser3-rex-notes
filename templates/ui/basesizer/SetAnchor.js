import Anchor from '../anchor/Anchor.js';

var SetAnchor = function (config) {
    if (config === undefined) {
        config = {};
    }

    // Assign default onResizeCallback if not given
    if (!config.hasOwnProperty('onResizeCallback')) {
        config.onResizeCallback = OnResizeCallback;
    }

    if (this._anchor === undefined) {
        this._anchor = new Anchor(this, config);
    } else {
        this._anchor.resetFromJSON(config)
    }
    return this;
}

var OnResizeCallback = function (sizer, width, height) {
    sizer.setMinSize(width, height).layout();
}

export default SetAnchor;