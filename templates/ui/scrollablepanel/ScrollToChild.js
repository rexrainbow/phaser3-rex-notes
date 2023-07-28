import AlignConst from '../utils/AlignConst.js';

var ScrollToChild = function (child, align) {
    if (!this.hasChild(child)) {
        return this;
    }

    var scrollableBlock = this.childrenMap.child;
    var dy;
    if (this.scrollMode === 0) {
        switch (align) {
            case AlignConst.top:
            case 'top':
                dy = scrollableBlock.top - child.getTopLeft().y;
                break;

            case AlignConst.bottom:
            case 'bottom':
                dy = scrollableBlock.bottom - child.getBottomLeft().y;
                break;

            case AlignConst.center:
            case 'center':
                dy = scrollableBlock.centerY - child.getCenter().y;
                break;

            default:
                var dTop = scrollableBlock.top - child.getTopLeft().y;
                var dBottom = scrollableBlock.bottom - child.getBottomLeft().y;
                if ((dTop <= 0) && (dBottom >= 0)) {
                    dy = 0;
                } else {
                    dy = (Math.abs(dTop) <= Math.abs(dBottom)) ? dTop : dBottom;
                }
                break;
        }
    } else {
        switch (align) {
            case AlignConst.left:
            case 'left':
                dy = scrollableBlock.left - child.getTopLeft().x;
                break;

            case AlignConst.right:
            case 'right':
                dy = scrollableBlock.right - child.getTopRight().x;
                break;

            case AlignConst.center:
            case 'center':
                dy = scrollableBlock.centerX - child.getCenter().x;
                break;

            default:
                var dLeft = scrollableBlock.left - child.getTopLeft().x;
                var dRight = scrollableBlock.right - child.getTopRight().x;
                if ((dLeft <= 0) && (dRight >= 0)) {
                    dy = 0;
                } else {
                    dy = (Math.abs(dLeft) <= Math.abs(dRight)) ? dLeft : dRight;
                }
                break;
        }
    }

    this.childOY += dy;

    return this;
}

export default ScrollToChild;