import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';

var ExpandFitRatioChildren = function (width, height) {
    if (!this.hasRatioFitChild) {
        return;
    }

    var innerHeight, innerWidth;
    if (this.orientation === 0) {
        innerHeight = height - ((this.getInnerPadding('top') + this.getInnerPadding('bottom')) * this.scaleY);
    } else {
        innerWidth = width - ((this.getInnerPadding('left') + this.getInnerPadding('right')) * this.scaleX);
    }

    var child, childConfig;
    var childWidth, childHeight;
    var children = this.sizerChildren;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        var childConfig = child.rexSizer;
        if (childConfig.hidden) {
            continue;
        }

        var fitRatio = childConfig.fitRatio;
        if (!fitRatio) {
            continue;
        }

        if (this.orientation === 0) {
            // Set child width by child height 
            childHeight = innerHeight - ((this.getChildOuterPadding(child, 'top') + this.getChildOuterPadding(child, 'bottom')) * this.scaleY);
            childWidth = childHeight * fitRatio;
        } else {
            // Set child height by child width
            childWidth = innerHeight - ((this.getChildOuterPadding(child, 'top') + this.getChildOuterPadding(child, 'bottom')) * this.scaleX);
            childHeight = childWidth / fitRatio;
        }

        if (!childConfig.noResize) {
            ResizeGameObject(child, childWidth, childHeight);
        }

        if (child.isRexSizer) {
            child.setMinSize(childWidth, childHeight)
        }

        childConfig.resolved = true;
    }
}

export default ExpandFitRatioChildren;