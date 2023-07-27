import AlignConst from '../utils/AlignConst.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var ScrollToChild = function (child, align) {
    if (!this.hasChild(child)) {
        return this;
    }

    switch (this.scrollMode) {
        case 0:
            AlignChild.call(this, child, 'y', align);
            break;

        case 1:
            AlignChild.call(this, child, 'x', align);
            break;

        default:
            AlignChild.call(this, child, 'y', GetValue(align, 'y'));
            AlignChild.call(this, child, 'x', GetValue(align, 'x'));
            break;
    }

    return this;
}

var AlignChild = function (child, axis, align) {
    var isAxisY = (axis === 'y');
    var delta;
    if (isAxisY) {
        switch (align) {
            case AlignConst.top:
            case 'top':
                delta = this.top - child.getTopLeft().y;
                break;

            case AlignConst.bottom:
            case 'bottom':
                delta = this.bottom - child.getBottomLeft().y;
                break;

            case AlignConst.center:
            case 'center':
                delta = this.centerY - child.getCenter().y;
                break;

            default:
                var dTop = this.top - child.getTopLeft().y;
                var dBottom = this.bottom - child.getBottomLeft().y;
                if ((dTop <= 0) && (dBottom >= 0)) {
                    delta = 0;
                } else {
                    delta = (Math.abs(dTop) <= Math.abs(dBottom)) ? dTop : dBottom;
                }
                break;
        }
    } else {
        switch (align) {
            case AlignConst.left:
            case 'left':
                delta = this.left - child.getTopLeft().x;
                break;

            case AlignConst.right:
            case 'right':
                delta = this.right - child.getTopRight().x;
                break;

            case AlignConst.center:
            case 'center':
                delta = this.centerX - child.getCenter().x;
                break;

            default:
                var dLeft = this.left - child.getTopLeft().x;
                var dRight = this.right - child.getTopRight().x;
                if ((dLeft <= 0) && (dRight >= 0)) {
                    delta = 0;
                } else {
                    delta = (Math.abs(dLeft) <= Math.abs(dRight)) ? dLeft : dRight;
                }
                break;
        }
    }

    switch (this.scrollMode) {
        case 0:
        case 1:
            this.childOY += delta;
            break;

        default:
            if (isAxisY) {
                this.childOY += delta;
            } else {
                this.childOX += delta;
            }

            break;
    }
}
export default ScrollToChild;