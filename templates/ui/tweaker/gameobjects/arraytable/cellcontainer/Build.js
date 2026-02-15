import RemoveFromParent from '../../../../utils/RemoveFromParent.js';
import LayoutMode0 from './LayoutMode0.js';
import LayoutMode1 from './LayoutMode1.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const LayoutCallbacks = [LayoutMode0, LayoutMode1];

var Build = function (config) {
    if (config === undefined) {
        config = {};
    }

    var background = config.background;
    var indexLabel = config.indexLabel;
    var inputTweaker = config.inputTweaker;
    var deleteButton = config.deleteButton;

    // Remove from parent
    RemoveFromParent(background);
    RemoveFromParent(indexLabel);
    RemoveFromParent(inputTweaker);
    RemoveFromParent(deleteButton);

    this.clear(true);

    // Add Background
    if (background) {
        this.addBackground(background);
    }

    var layoutMode = GetValue(config, 'layoutMode', 0);
    var layoutCallback = LayoutCallbacks[layoutMode] || LayoutCallbacks[0];
    layoutCallback.call(this, config);

    this.addChildrenMap('background', background);
    this.addChildrenMap('index', indexLabel);
    this.addChildrenMap('inputTweaker', inputTweaker);
    this.addChildrenMap('delete', deleteButton);

    deleteButton
        .offClick(this.onClickDeleteButton, this)
        .onClick(this.onClickDeleteButton, this)

    return this;
}

export default Build;