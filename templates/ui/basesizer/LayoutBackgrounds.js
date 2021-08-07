import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import AlignIn from '../../../plugins/utils/actions/AlignIn.js';
import CopyState from '../utils/CopyState.js';

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
    var prevChildState;
    var child, childConfig, padding,
        childTLX, childTLY, childWidth, childHeight;
    for (var i = 0, cnt = backgrounds.length; i < cnt; i++) {
        child = backgrounds[i];
        childConfig = child.rexSizer;
        if (childConfig.hidden) {
            continue;
        }

        padding = childConfig.padding;

        if (this.sizerEventsEnable) {
            prevChildState = CopyState(child, this.getChildPrevState(child));
            this.layoutedChildren.push(child);
        }

        childTLX = x + padding.left;
        childTLY = y + padding.top;
        childWidth = width - padding.left - padding.right;
        childHeight = height - padding.top - padding.bottom;

        ResizeGameObject(child, childWidth, childHeight);
        AlignIn(child, childTLX, childTLY, childWidth, childHeight, ALIGN_CENTER);
        child.emit('layout', prevChildState, child, this);

        this.resetChildPositionState(child);
        child.emit('postlayout', prevChildState, child, this);
    }
}

export default LayoutBackgrounds;