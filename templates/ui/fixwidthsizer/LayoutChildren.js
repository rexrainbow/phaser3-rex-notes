import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var LayoutChildren = function () {
    var innerLineWidth = this.innerWidth;
    var child, childConfig, padding, justifySpace = 0;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var itemX = startX,
        itemY = startY;
    var x, y, width, height; // Align zone

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
                x += this.space.item;
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
        itemY += line.height + this.space.line;
    }
}

var GetJustifySpace = function (total, remainder, childCount) {
    return ((remainder / total) <= 0.25) ? (remainder / (childCount - 1)) : 0;
}

export default LayoutChildren;