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

    var child, sizerConfig;
    var childWidth, childHeight;
    var children = this.sizerChildren;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        var sizerConfig = child.rexSizer;
        if (sizerConfig.hidden) {
            continue;
        }

        var fitRatio = sizerConfig.fitRatio;
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

        ResizeGameObject(child, childWidth, childHeight);
        if (child.isRexSizer) {
            child.setMinSize(childWidth, childHeight)
        }

        sizerConfig.resolved = true;
    }
}

export default ExpandFitRatioChildren;