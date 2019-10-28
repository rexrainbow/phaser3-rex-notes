import Anchor from '../../../plugins/behaviors/anchor/Anchor.js';

var SetAnchor = function (config) {
    if (this._anchor === undefined) {
        this._anchor = new Anchor(this, config);
    } else {
        this._anchor.resetFromJSON(config)
    }
    return this;
}

export default SetAnchor;