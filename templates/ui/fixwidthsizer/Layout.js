import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var Layout = function (parent, newWidth, newHeight) {
    // Skip hidden or !dirty sizer
    if (this.rexSizer.hidden || (!this.dirty)) {
        return this;
    }

    var isTopmostParent = !parent;
    var space = this.space;
    // Preprocessor, top parent only
    if (isTopmostParent) {
        this.preLayout();
    }

    // Calculate parent width
    if (newWidth === undefined) {
        newWidth = Math.max((this.maxChildWidth + space.left + space.right), this.minWidth);
    }
    // Width-wrap children, top parent only
    if (isTopmostParent) {
        this.width = newWidth;
        this.runWidthWrap(newWidth);
    }

    // Calculate parent height
    if (newHeight === undefined) {
        newHeight = Math.max((this.maxChildHeight + space.top + space.bottom), this.minHeight);
    }
    // Expanded height is less then min-lines-height
    newHeight = Math.max(newHeight, (this.widthWrapResult.height + space.top + space.bottom));

    // Resize parent
    this.resize(newWidth, newHeight);

    // Layout children
    var innerLineWidth = this.width - space.left - space.right;
    var child, childConfig, padding, justifySpace = 0;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var itemX = startX,
        itemY = startY;
    var x, y, width, height; // Align zone

    // Layout each line
    var lines = this.widthWrapResult.lines;
    var line, lineChlidren, remainderLineWidth;
    for (var i = 0, icnt = lines.length; i < icnt; i++) {
        line = lines[i];
        lineChlidren = line.children;

        if (this.rtl) {
            lineChlidren.reverse();
        }

        remainderLineWidth = (innerLineWidth - line.width);
        switch (this.align) {
            case 0: // left
                break;
            case 1: // right
                itemX += remainderLineWidth;
                break;
            case 2: // center
                itemX += remainderLineWidth / 2;
                break;
            case 3: // justify-left
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                break;
            case 4: // justify-right
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align right
                    itemX += remainderLineWidth;
                }
                break;
            case 5: // justify-center
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align center
                    itemX += remainderLineWidth / 2;
                }
                break;
        }


        for (var j = 0, jcnt = lineChlidren.length; j < jcnt; j++) {
            child = lineChlidren[j];
            childConfig = child.rexSizer;
            padding = childConfig.padding;
            x = (itemX + padding.left);
            if (j > 0) {
                x += space.item;
            }

            y = (itemY + padding.top);
            width = GetDisplayWidth(child);
            height = GetDisplayHeight(child);
            itemX = x + width + padding.right + justifySpace;

            GlobZone.setPosition(x, y).setSize(width, height);
            AlignIn(child, GlobZone, childConfig.align);
            this.resetChildPositionState(child);
        }

        itemX = startX;
        itemY += line.height + space.line;
    }

    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}

var GetJustifySpace = function (total, remainder, childCount) {
    return ((remainder / total) <= 0.25) ? (remainder / (childCount - 1)) : 0;
}

export default Layout;