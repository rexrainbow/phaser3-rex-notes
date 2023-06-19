import AlignConst from '../utils/AlignConst.js';

var ScrollToChild = function (child, align) {
    if (!this.hasChild(child)) {
        return this;
    }

    var dy;
    if (this.scrollMode === 0) {
        switch (align) {
            case AlignConst.top:
            case 'top':
                dy = this.top - child.getTopLeft().y;
                break;

            case AlignConst.bottom:
            case 'bottom':
                dy = this.bottom - child.getBottomLeft().y;
                break;

            case AlignConst.center:
            case 'center':
                dy = this.centerY - child.getCenter().y;
                break;

            default:
                var dTop = this.top - child.getTopLeft().y;
                var dBottom = this.bottom - child.getBottomLeft().y;
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
                dy = this.left - child.getTopLeft().x;
                break;

            case AlignConst.right:
            case 'right':
                dy = this.right - child.getTopRight().x;
                break;

            case AlignConst.center:
            case 'center':
                dy = this.centerX - child.getCenter().x;
                break;

            default:
                var dLeft = this.left - child.getTopLeft().x;
                var dRight = this.right - child.getTopRight().x;
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