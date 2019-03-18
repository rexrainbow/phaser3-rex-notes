import ParsePaddingConfig from '../utils/ParsePaddingConfig.js';
import DefaultMask from '../../../plugins/utils/mask/DefaultMask.js';

const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

var SetTextObject = function (gameObject, paddingConfig) {
    this.add(gameObject);
    if (paddingConfig === undefined) {
        paddingConfig = 0;
    }

    var config = this.getSizerConfig(gameObject);
    config.parent = this;
    config.align = ALIGN_LEFTTOP;
    config.padding = ParsePaddingConfig(paddingConfig);
    config.expand = true;
    this.textChild = gameObject;

    // Create mask of text object
    this.textMask = new DefaultMask(this.textChild);
    this.textChild.setMask(this.textMask.createGeometryMask());
    this.add(this.textMask);
    return this;
}

export default SetTextObject;