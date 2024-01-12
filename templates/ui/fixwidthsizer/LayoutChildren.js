import PreLayoutChild from '../basesizer/utils/PreLayoutChild.js';
import LayoutChild from '../basesizer/utils/LayoutChild.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';


var LayoutChildren = function () {
    var horizontalWrap = (this.orientation === 0);

    var innerLineWidth = (horizontalWrap) ? this.innerWidth : this.innerHeight;
    var justifyPercentage = this.justifyPercentage;
    var itemSpace = this.space.item,
        lineSpace = this.space.line,
        indentLeftOdd = this.space.indentLeftOdd,
        indentLeftEven = this.space.indentLeftEven,
        indentTopOdd = this.space.indentTopOdd,
        indentTopEven = this.space.indentTopEven;

    var child, childConfig, padding, justifySpace = 0, indentLeft, indentTop;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var x, y, width, height; // Align zone
    var lines = this.wrapResult.lines;  // Get this.wrapResult from RunChildrenWrap()
    var line, lineChlidren, remainderLineWidth;

    var itemX = startX,
        itemY = startY;
    for (var i = 0, icnt = lines.length; i < icnt; i++) {
        // Layout this line
        line = lines[i];
        lineChlidren = line.children;
        if (this.rtl) {
            lineChlidren.reverse();
        }

        if (horizontalWrap) {
            indentLeft = (i % 2) ? indentLeftEven : indentLeftOdd;
            itemX = startX + indentLeft;
        } else {
            indentTop = (i % 2) ? indentTopEven : indentTopOdd;
            itemY = startY + indentTop;
        }

        remainderLineWidth = innerLineWidth - ((horizontalWrap) ? line.width : line.height);

        switch (this.align) {
            case 0: // left
                break;

            case 1: // right
                if (horizontalWrap) {
                    itemX += remainderLineWidth;
                } else {
                    itemY += remainderLineWidth;
                }
                break;

            case 2: // center
                if (horizontalWrap) {
                    itemX += remainderLineWidth / 2;
                } else {
                    itemY += remainderLineWidth / 2;
                }
                break;

            case 3: // justify-left            
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);
                break;

            case 4: // justify-right
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align right
                    if (horizontalWrap) {
                        itemX += remainderLineWidth;
                    } else {
                        itemY += remainderLineWidth;
                    }
                }
                break;

            case 5: // justify-center
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align center
                    if (horizontalWrap) {
                        itemX += remainderLineWidth / 2;
                    } else {
                        itemY += remainderLineWidth / 2;
                    }
                }
                break;
        }

        var isFirstChild = true;
        for (var j = 0, jcnt = lineChlidren.length; j < jcnt; j++) {
            child = lineChlidren[j];
            if (child.rexSizer.hidden) {
                continue;
            }

            childConfig = child.rexSizer;
            padding = childConfig.padding;

            PreLayoutChild.call(this, child);

            if (horizontalWrap) {
                x = (itemX + padding.left);
            } else {
                y = (itemY + padding.top);
            }

            if (isFirstChild) {
                isFirstChild = false;
            } else {
                if (horizontalWrap) {
                    x += itemSpace;
                } else {
                    y += itemSpace;
                }
            }

            width = GetDisplayWidth(child);
            height = GetDisplayHeight(child);

            if (horizontalWrap) {
                indentTop = (j % 2) ? indentTopEven : indentTopOdd;
                y = (itemY + indentTop + padding.top);
                itemX = x + width + padding.right + justifySpace;
            } else {
                indentLeft = (j % 2) ? indentLeftEven : indentLeftOdd;
                x = (itemX + indentLeft + padding.left);
                itemY = y + height + padding.top + justifySpace;
            }

            LayoutChild.call(this, child, x, y, width, height, childConfig.align);
        }

        if (horizontalWrap) {
            itemY += line.height + lineSpace;
        } else {
            itemX += line.width + lineSpace;
        }
    }
}

var GetJustifySpace = function (total, remainder, justifyPercentage, childCount) {
    return ((remainder / total) <= justifyPercentage) ? (remainder / (childCount - 1)) : 0;
}

export default LayoutChildren;