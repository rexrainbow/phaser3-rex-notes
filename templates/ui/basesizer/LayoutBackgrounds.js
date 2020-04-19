import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';

const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var LayoutBackgrounds = function () {
    if (this.backgroundChildren === undefined) {
        return;
    }
    var backgrounds = this.backgroundChildren;

    var x = this.left,
        y = this.top,
        width = this.width,
        height = this.height;
    var child, childConfig, padding,
        childTLX, childTLY, childWidth, childHeight;
    for (var i = 0, cnt = backgrounds.length; i < cnt; i++) {
        child = backgrounds[i];
        childConfig = child.rexSizer;
        if (childConfig.hidden) {
            continue;
        }

        padding = childConfig.padding;
        childTLX = x + padding.left;
        childTLY = y + padding.top;
        childWidth = width - padding.left - padding.right;
        childHeight = height - padding.top - padding.bottom;
        ResizeGameObject(child, childWidth, childHeight);
        GlobZone.setPosition(childTLX, childTLY).setSize(childWidth, childHeight);
        AlignIn(child, GlobZone, ALIGN_CENTER);
        this.resetChildPositionState(child);
    }
}

export default LayoutBackgrounds;