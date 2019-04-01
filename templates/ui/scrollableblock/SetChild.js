import DefaultMask from '../../../plugins/utils/mask/DefaultMask.js';

const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

var SetChild = function (gameObject, maskEnable) {
    if (maskEnable === undefined) {
        maskEnable = true;
    }

    if (gameObject.setOrigin) {
        gameObject.setOrigin(0);
    }

    this.add(gameObject);

    var config = this.getSizerConfig(gameObject);
    config.parent = this;
    config.align = ALIGN_LEFTTOP;
    this.child = gameObject;

    // Create mask of child object
    if (maskEnable) {
        this.childMask = new DefaultMask(this);
        this.child.setMask(this.childMask.createGeometryMask());
        this.add(this.childMask);
    }

    return this;
}

export default SetChild;