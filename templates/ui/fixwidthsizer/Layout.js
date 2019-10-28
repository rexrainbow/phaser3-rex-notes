import RunChildrenWrap from './RunChildrenWrap.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';

var Layout = function (parent, newWidth, newHeight) {
    if (this.rexSizer.hidden) {
        return this;
    }

    this.preLayout(parent);

    // Set size
    if (newWidth === undefined) {
        var padding = this.padding;
        newWidth = Math.max(this.maxChildWidth + padding.left + padding.right, this.minWidth);
    }
    if (newHeight === undefined) {
        var padding = this.padding;
        newHeight = Math.max(this.maxChildHeight + padding.top + padding.bottom, this.minHeight);
    }

    var lineInnerWidth, padding = this.padding;
    if (this.orientation === 0) { // x
        lineInnerWidth = newWidth - padding.left - padding.right;
    } else { // y
        lineInnerWidth = newHeight - padding.top - padding.bottom;
    }
    var wrapResult = RunChildrenWrap.call(this, lineInnerWidth);
    // Expanded height is less then min-lines-height
    if (this.orientation === 0) { // x
        newHeight = Math.max(newHeight, wrapResult.height + padding.top + padding.bottom);
    } else { // y
        newWidth = Math.max(newWidth, wrapResult.height + left + padding.right);
    }
    this.resize(newWidth, newHeight);

    // Layout children    
    var child, childConfig, padding;
    var startX = this.left,
        startY = this.top;
    var itemX, itemY;
    var x, y, width, height; // Align zone

    // Layout each line
    var lines = wrapResult.lines;
    var line, lineChlidren;
    if (this.orientation === 0) { // x
        itemX = startX
        itemY = startY + this.padding.top;
    } else {
        itemX = startX + this.padding.left;
        itemY = startY
    }
    for (var i = 0, icnt = lines.length; i < icnt; i++) {
        line = lines[i];
        lineChlidren = line.children;

        for (var j = 0, jcnt = lineChlidren.length; j < jcnt; j++) {
            child = lineChlidren[j];
            childConfig = child.rexSizer;
            padding = childConfig.padding;
            if (this.orientation === 0) { // x
                x = (itemX + padding.left);
                if (j === 0) {
                    x += this.padding.left;
                } else {
                    x += this.itemSpacing;
                }

                y = (itemY + padding.top);
                width = child.displayWidth;
                height = child.displayHeight;
                itemX = x + child.displayWidth + padding.right;
            } else { // y
                x = (itemX + padding.left);

                y = (itemY + padding.top);
                if (j === 0) {
                    y += this.padding.top;
                } else {
                    y += this.itemSpacing;
                }

                width = child.displayWidth;
                height = child.displayHeight;
                itemY = y + child.displayHeight + padding.bottom;
            }

            GlobZone.setPosition(x, y).setSize(width, height);
            AlignIn(child, GlobZone, childConfig.align);
            this.resetChildPositionState(child);
        }

        if (this.orientation === 0) { // x
            itemX = startX;
            itemY += line.height + this.lineSpacing;
        } else { // y
            itemX += line.height + this.lineSpacing;
            itemY = startY;
        }
    }

    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}

export default Layout;