import DefaultMask from '../../../plugins/utils/mask/DefaultMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

var SetChild = function (gameObject, expand, maskConfig) {
    if (gameObject.setOrigin) {
        gameObject.setOrigin(0);
    }

    this.add(gameObject);

    var config = this.getSizerConfig(gameObject);
    config.parent = this;
    config.align = ALIGN_LEFTTOP;
    config.expand = expand;
    this.child = gameObject;

    // Create mask of child object
    var maskEnable, maskPadding;
    if (maskConfig === true) {
        maskEnable = true;
        maskPadding = 0;
    } else if (maskConfig === false) {
        maskEnable = false;
    } else {
        maskEnable = GetValue(maskConfig, 'mask', true);
        maskPadding = GetValue(maskConfig, 'padding', 0);
    }

    if (maskEnable) {
        var maskGameObject = new DefaultMask(this, 0, maskPadding);
        this.childMask = maskGameObject.createGeometryMask();
        this.add(maskGameObject);
    }

    return this;
}

export default SetChild;