import ResizeGameObject from '../utils/ResizeGameObject.js';
import GlobZone from '../../../plugins/utils/align/GlobZone.js';

const AlignIn = Phaser.Display.Align.In.QuickSet;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var LayoutBackgrounds = function (backgrounds) {
    if (backgrounds === undefined) {
        backgrounds = this.backgroundChildren;
    }

    var child;
    var x = this.left,
        y = this.top,
        width = this.width,
        height = this.height;

    for (var i = 0, cnt = backgrounds.length; i < cnt; i++) {
        child = backgrounds[i];
        // Skip invisible child
        if (!child.visible) {
            continue;
        }
        ResizeGameObject(child, width, height);
        GlobZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, GlobZone, ALIGN_CENTER);
        this.resetChildState(child);
    }
}

export default LayoutBackgrounds;