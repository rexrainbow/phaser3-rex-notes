import { GetTopLeft, GetBottomLeft, GetTopRight, GetCenter } from '../../../../plugins/utils/bounds/GetBounds.js';
import EaseValueTask from '../../../../plugins/utils/ease/EaseValueTask.js';

var ScrollToChild = function (child, align, duration, ease) {
    if (!this.hasChild(child)) {
        return this;
    }

    var newChildOY, newChildOX;
    switch (this.scrollMode) {
        case 0:
            newChildOY = this.childOY + AlignChild.call(this, child, 'y', align);
            break;

        case 1:
            newChildOY = this.childOY + AlignChild.call(this, child, 'x', align);
            break;

        default:
            newChildOY = this.childOY + AlignChild.call(this, child, 'y', align);
            newChildOX = this.childOX + AlignChild.call(this, child, 'x', align);
            break;
    }

    if ((duration === undefined) || (duration <= 0)) {
        this.childOY = newChildOY;
        if (this.scrollMode === 2) {
            this.childOX = newChildOX;
        }
    } else {
        if (this._easeScrollChildOY === undefined) {
            this._easeScrollChildOY = new EaseValueTask(this)
        }
        this._easeScrollChildOY.restart({
            key: 'childOY',
            to: newChildOY,
            duration: duration,
            ease: ease
        });

        if (this.scrollMode === 2) {
            if (this._easeScrollChildOX === undefined) {
                this._easeScrollChildOX = new EaseValueTask(this)
            }

            this._easeScrollChildOX.restart({
                key: 'childOX',
                to: newChildOX,
                duration: duration,
                ease: ease
            });
        }
    }

    return this;
}

const AlignYModes = ['top', 'bottom', 'centerY', 'center'];
const AlignXModes = ['left', 'right', 'centerX', 'center'];

var AlignChild = function (child, axis, align) {
    axis = axis.toUpperCase();
    var isAxisY = (axis === 'Y');

    var scrollableBlock = this.childrenMap.child;
    var delta;
    if (isAxisY) {
        if (align) {
            for (var i = 0, cnt = AlignYModes.length; i < cnt; i++) {
                var modeName = AlignYModes[i];
                if (align.indexOf(modeName) !== -1) {
                    align = modeName;
                    break;
                }
            }
        }

        switch (align) {
            case 'top':
                delta = scrollableBlock.top - GetTopLeft(child).y;
                break;

            case 'bottom':
                delta = scrollableBlock.bottom - GetBottomLeft(child).y;
                break;

            case 'centerY':
            case 'center':
                delta = scrollableBlock.centerY - GetCenter(child).y;
                break;

            default:
                var dTop = scrollableBlock.top - GetTopLeft(child).y;
                var dBottom = scrollableBlock.bottom - GetBottomLeft(child).y;
                if ((dTop <= 0) && (dBottom >= 0)) {
                    delta = 0;
                } else {
                    delta = (Math.abs(dTop) <= Math.abs(dBottom)) ? dTop : dBottom;
                }
                break;
        }
    } else {
        if (align) {
            for (var i = 0, cnt = AlignXModes.length; i < cnt; i++) {
                var modeName = AlignXModes[i];
                if (align.indexOf(modeName) !== -1) {
                    align = modeName;
                    break;
                }
            }
        }

        switch (align) {
            case 'left':
                delta = scrollableBlock.left - GetTopLeft(child).x;
                break;

            case 'right':
                delta = scrollableBlock.right - GetTopRight(child).x;
                break;

            case 'centerX':
            case 'center':
                delta = scrollableBlock.centerX - GetCenter(child).x;
                break;

            default:
                var dLeft = scrollableBlock.left - GetTopLeft(child).x;
                var dRight = scrollableBlock.right - GetTopRight(child).x;
                if ((dLeft <= 0) && (dRight >= 0)) {
                    delta = 0;
                } else {
                    delta = (Math.abs(dLeft) <= Math.abs(dRight)) ? dLeft : dRight;
                }
                break;
        }
    }

    return delta;
}
export default ScrollToChild;