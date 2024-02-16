import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';

var ExpandFitRatioChildren = function (width, height) {
    if (!this.hasRatioFitChild) {
        return;
    }

    var innerHeight, innerWidth;
    if (this.orientation === 0) {
        innerHeight = height - this.getInnerPadding('top') - this.getInnerPadding('bottom');
    } else {
        innerWidth = width - this.getInnerPadding('left') - this.getInnerPadding('right');
    }

    var children = this.sizerChildren,
        childWidth, childHeight;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (child.rexSizer.hidden) {
            continue;
        }

        var fitRatio = child.rexSizer.fitRatio;
        if (!fitRatio) {
            continue;
        }

        if (this.orientation === 0) {
            // Set child width by child height 
            childHeight = innerHeight - this.getChildOuterPadding(child, 'top') - this.getChildOuterPadding(child, 'bottom');
            childWidth = childHeight * fitRatio;
        } else {
            // Set child height by child width
            childWidth = innerHeight - this.getChildOuterPadding(child, 'top') - this.getChildOuterPadding(child, 'bottom');
            childHeight = childWidth / fitRatio;
        }

        ResizeGameObject(child, childWidth, childHeight);
        if (child.isRexSizer) {
            child.setMinSize(childWidth, childHeight)
        }
    }
}

export default ExpandFitRatioChildren;