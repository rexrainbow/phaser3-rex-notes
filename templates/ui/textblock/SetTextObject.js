import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import IsTextGameObject from '../../../plugins/utils/text/IsTextGameObject.js';

const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

var SetTextObject = function (gameObject, maskEnable) {
    if (maskEnable === undefined) {
        maskEnable = true;
    }

    this.add(gameObject);

    var config = this.getSizerConfig(gameObject);
    config.align = ALIGN_LEFTTOP;
    config.padding = GetBoundsConfig(0);
    config.expand = true;
    this.textObject = gameObject;
    this.textObjectType = (IsTextGameObject(gameObject)) ? 0 : 1;
    // Add more variables
    config.preOffsetY = 0;
    config.offsetY = 0;

    // Create mask of text object
    if (maskEnable) {
        this.textMask = this.addChildMask(this.textObject, this);
    }
    return this;
}

export default SetTextObject;