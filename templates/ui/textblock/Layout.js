import ResizeText from './ResizeText.js';
import GlobZone from '../../../plugins/utils/align/GlobZone.js';

const AlignIn = Phaser.Display.Align.In.QuickSet;

var Layout = function (parent, newWidth, newHeight) {
    // Skip invisible sizer
    if (!this.visible) {
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
    child = this.textChild;
    if (child && child.visible) {
        childConfig = child.rexSizer;
        padding = childConfig.padding;
        x = (startX + padding.left);
        y = (startY + padding.top);
        width = this.width - padding.left - padding.right;
        height = this.height - padding.top - padding.bottom;
        ResizeText(child, width, height);
        GlobZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, GlobZone, childConfig.align);
        this.resetChildState(child);
    }

    // Layout background children
    this.layoutBackgrounds();

    return this;
}

export default Layout;