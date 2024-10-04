import PreLayoutChild from '../basesizer/utils/PreLayoutChild.js';
import LayoutChild from '../basesizer/utils/LayoutChild.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';


var LayoutChildren = function () {
    var horizontalWrap = (this.orientation === 0);

    var innerLineWidth = (horizontalWrap) ? this.innerWidth : this.innerHeight;
    var child, childConfig, padding, justifySpace = 0, indentLeft, indentTop;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var x, y, width, height, alignOffsetX, alignOffsetY; // Align zone
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
            indentLeft = (i % 2) ? this.space.indentLeftEven : this.space.indentLeftOdd;
            itemX = startX + (indentLeft * this.scaleX);
        } else {
            indentTop = (i % 2) ? this.space.indentTopEven : this.space.indentTopOdd;
            itemY = startY + (indentTop * this.scaleY);
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
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, this.justifyPercentage, lineChlidren.length);
                break;

            case 4: // justify-right
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, this.justifyPercentage, lineChlidren.length);
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
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, this.justifyPercentage, lineChlidren.length);
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
                x = itemX + (padding.left * this.scaleX);
            } else {
                y = itemY + (padding.top * this.scaleY);
            }

            if (isFirstChild) {
                isFirstChild = false;
            } else {
                if (horizontalWrap) {
                    x += (this.space.item * this.scaleX);
                } else {
                    y += (this.space.item * this.scaleY);
                }
            }

            width = GetDisplayWidth(child);
            height = GetDisplayHeight(child);

            if (horizontalWrap) {
                indentTop = (j % 2) ? this.space.indentTopEven : this.space.indentTopOdd;
                y = itemY + (indentTop * this.scaleY) + (padding.top * this.scaleY);
                itemX = x + width + (padding.right * this.scaleX) + justifySpace;
            } else {
                indentLeft = (j % 2) ? this.space.indentLeftEven : this.space.indentLeftOdd;
                x = itemX + (indentLeft * this.scaleX) + (padding.left * this.scaleX);
                itemY = y + height + (padding.top * this.scaleY) + justifySpace;
            }

            alignOffsetX = (childConfig.alignOffsetX + (childConfig.alignOffsetOriginX * width)) * this.scaleX;
            alignOffsetY = (childConfig.alignOffsetY + (childConfig.alignOffsetOriginY * height)) * this.scaleY;

            LayoutChild.call(this,
                child, x, y, width, height, childConfig.align,
                alignOffsetX, alignOffsetY
            );
        }

        if (horizontalWrap) {
            itemY += line.height + (this.space.line * this.scaleY);
        } else {
            itemX += line.width + (this.space.line * this.scaleX);
        }
    }
}

var GetJustifySpace = function (total, remainder, justifyPercentage, childCount) {
    return ((remainder / total) <= justifyPercentage) ? (remainder / (childCount - 1)) : 0;
}

export default LayoutChildren;