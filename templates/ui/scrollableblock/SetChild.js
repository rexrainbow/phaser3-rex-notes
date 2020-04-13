const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

var SetChild = function (gameObject, expand, maskConfig) {
    if (gameObject.setOrigin) {
        gameObject.setOrigin(0);
    }

    this.add(gameObject);

    var config = this.getSizerConfig(gameObject);
    config.align = ALIGN_LEFTTOP;
    config.expand = expand;
    this.child = gameObject;

    // Create mask of child object
    var maskEnable, maskPadding, maskUpdateMode;
    if (maskConfig === true) {
        maskEnable = true;
        maskPadding = 0;
        maskUpdateMode = 0;
    } else if (maskConfig === false) {
        maskEnable = false;
    } else {
        maskEnable = GetValue(maskConfig, 'mask', true);
        maskPadding = GetValue(maskConfig, 'padding', 0);
        maskUpdateMode = GetValue(config, 'updateMode', 0);
    }

    this.maskUpdateMode = maskUpdateMode; // 0,1,undefined
    if (maskEnable) {
        if (typeof (maskUpdateMode) === 'string') {
            maskUpdateMode = MASKUPDATEMODE[maskUpdateMode];
        }
        if (maskUpdateMode === 1) {
            this.scene.game.events.on('poststep', this.maskChildren, this);
        }
        this.enableChildrenMask(maskPadding);
    }

    return this;
}

const MASKUPDATEMODE = {
    update: 0,
    everyTick: 1
};

export default SetChild;