import ResizeText from './ResizeText.js';
import ResetTextObjectPosition from './ResetTextObjectPosition.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';

const AlignIn = Phaser.Display.Align.In.QuickSet;

var Layout = function (parent, newWidth, newHeight) {
    // Skip invisible sizer
    if (this.rexSizer.hidden) {
        return this;
    }

    this.layoutInit(parent);

    // Set size
    if (newWidth === undefined) {
        newWidth = this.minWidth;
    }
    if (newHeight === undefined) {
        newHeight = this.minHeight;
    }
    this.resize(newWidth, newHeight);

    // Layout children
    var child, childConfig, padding;
    var startX = this.left,
        startY = this.top;
    var x, y, width, height; // Align zone

    // Layout text child
    // Skip invisible child
    child = this.textObject;
    if (!child.rexSizer.hidden) {
        childConfig = child.rexSizer;
        padding = childConfig.padding;
        x = (startX + padding.left);
        y = (startY + padding.top);
        width = this.width - padding.left - padding.right;
        height = this.height - padding.top - padding.bottom;
        ResizeText.call(this, child, width, height);
        GlobZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, GlobZone, childConfig.align);

        // Layout text mask before reset text position
        if (this.textMask) {
            this.textMask.setPosition().resize();
            this.resetChildPositionState(this.textMask);
        }

        childConfig.preOffsetY = 0; // Clear preOffsetY
        ResetTextObjectPosition.call(this);
    }

    // Layout background children
    this.layoutBackgrounds();

    return this;
}

export default Layout;