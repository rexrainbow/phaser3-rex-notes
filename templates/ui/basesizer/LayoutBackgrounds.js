import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';

const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var LayoutBackgrounds = function () {
    if (this.backgroundChildren === undefined) {
        return;
    }
    var backgrounds = this.backgroundChildren;

    var child;
    var x = this.left,
        y = this.top,
        width = this.width,
        height = this.height;

    for (var i = 0, cnt = backgrounds.length; i < cnt; i++) {
        child = backgrounds[i];
        if (child.rexSizer.hidden) {
            continue;
        }
        ResizeGameObject(child, width, height);
        GlobZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, GlobZone, ALIGN_CENTER);
        this.resetChildPositionState(child);
    }
}

export default LayoutBackgrounds;