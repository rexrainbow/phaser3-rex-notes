import ResizeGameObject from '../utils/ResizeGameObject.js';
import GlobZone from '../../../plugins/utils/align/GlobZone.js';

const AlignIn = Phaser.Display.Align.In.QuickSet;

var LayoutBackgrounds = function (backgrounds) {
    if (backgrounds === undefined) {
        backgrounds = this.backgroundChildren;
    }

    var child, childConfig, padding;
    var startX = this.left,
        startY = this.top;
    var x, y, width, height; // Align zone

    for (var i = 0, cnt = backgrounds.length; i < cnt; i++) {
        child = backgrounds[i];
        // Skip invisible child
        if (!child.visible) {
            continue;
        }
        childConfig = child.rexSizer;
        padding = childConfig.padding;
        x = (startX + padding.left);
        y = (startY + padding.top);
        width = this.width - padding.left - padding.right;
        height = this.height - padding.top - padding.bottom;
        ResizeGameObject(child, width, height);
        GlobZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, GlobZone, childConfig.align);
        this.resetChildState(child);
    }
}

export default LayoutBackgrounds;