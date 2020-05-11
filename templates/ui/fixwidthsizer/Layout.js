import RunChildrenWrap from './RunChildrenWrap.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var Layout = function (parent, newWidth, newHeight) {
    // Skip hidden or !dirty sizer
    if (this.rexSizer.hidden || (!this.dirty)) {
        return this;
    }

    this.preLayout(parent);

    // Set size
    if (newWidth === undefined) {
        newWidth = Math.max((this.maxChildWidth + this.space.left + this.space.right), this.minWidth);
    }
    if (newHeight === undefined) {
        newHeight = Math.max((this.maxChildHeight + this.space.top + this.space.bottom), this.minHeight);
    }

    var innerLineWidth;
    if (this.orientation === 0) { // x
        innerLineWidth = newWidth - this.space.left - this.space.right;
    } else { // y
        innerLineWidth = newHeight - this.space.top - this.space.bottom;
    }
    var wrapResult = RunChildrenWrap.call(this, innerLineWidth);
    // Expanded height is less then min-lines-height
    if (this.orientation === 0) { // x
        newHeight = Math.max(newHeight, (wrapResult.height + this.space.top + this.space.bottom));
    } else { // y
        newWidth = Math.max(newWidth, (wrapResult.height + this.space.left + this.space.right));
    }
    this.resize(newWidth, newHeight);

    // Layout children    
    var child, childConfig, padding, justifySpace = 0;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var itemX = startX,
        itemY = startY;
    var x, y, width, height; // Align zone

    // Layout each line
    var lines = wrapResult.lines;
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
                if (this.orientation === 0) { // x
                    itemX += remainderLineWidth;
                } else {
                    itemY += remainderLineWidth;
                }
                break;
            case 2: // center
                if (this.orientation === 0) { // x
                    itemX += remainderLineWidth / 2;
                } else {
                    itemY += remainderLineWidth / 2;
                }
                break;
            case 3: // justify-left
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                break;
            case 4: // justify-right
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align right
                    if (this.orientation === 0) { // x
                        itemX += remainderLineWidth;
                    } else {
                        itemY += remainderLineWidth;
                    }
                }
                break;
            case 5: // justify-center
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align center
                    if (this.orientation === 0) { // x
                        itemX += remainderLineWidth / 2;
                    } else {
                        itemY += remainderLineWidth / 2;
                    }
                }
                break;
        }


        for (var j = 0, jcnt = lineChlidren.length; j < jcnt; j++) {
            child = lineChlidren[j];
            childConfig = child.rexSizer;
            padding = childConfig.padding;
            if (this.orientation === 0) { // x
                x = (itemX + padding.left);
                if (j > 0) {
                    x += this.space.item;
                }

                y = (itemY + padding.top);
                width = GetDisplayWidth(child);
                height = GetDisplayHeight(child);
                itemX = x + width + padding.right + justifySpace;
            } else { // y
                x = (itemX + padding.left);

                y = (itemY + padding.top);
                if (j > 0) {
                    y += this.space.item;
                }

                width = GetDisplayWidth(child);
                height = GetDisplayHeight(child);
                itemY = y + height + padding.bottom + justifySpace;
            }

            GlobZone.setPosition(x, y).setSize(width, height);
            AlignIn(child, GlobZone, childConfig.align);
            this.resetChildPositionState(child);
        }

        if (this.orientation === 0) { // x
            itemX = startX;
            itemY += line.height + this.space.line;
        } else { // y
            itemX += line.height + this.space.line;
            itemY = startY;
        }
    }

    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}

var GetJustifySpace = function (total, remainder, childCount) {
    return ((remainder / total) <= 0.25) ? (remainder / (childCount - 1)) : 0;
}

export default Layout;