import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import PreLayoutChild from '../basesizer/utils/PreLayoutChild.js';
import FitToSize from '../../../plugins/utils/size/FitTo.js';
import LayoutChild from '../basesizer/utils/LayoutChild.js';
import CheckSize from '../basesizer/utils/CheckSize.js';

var LayoutChildren = function () {
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var innerWidth = this.innerWidth,
        innerHeight = this.innerHeight;
    var x, y, width, height; // Align zone
    var childWidth, childHeight, childSize;
    // Layout current page
    var children = this.sizerChildren;
    for (var key in children) {
        child = children[key];
        if (child.rexSizer.hidden) {
            continue;
        }

        childConfig = child.rexSizer;
        padding = childConfig.padding;

        PreLayoutChild.call(this, child);

        childWidth = this.getExpandedChildWidth(child);
        childHeight = this.getExpandedChildHeight(child);

        if (childConfig.aspectRatio > 0) {
            sourceSize.width = childConfig.aspectRatio;
            sourceSize.height = 1;
            targetSize.width = childWidth;
            targetSize.height = childHeight;

            childSize = FitToSize(sourceSize, targetSize, true, true);

            childWidth = childSize.width;
            childHeight = childSize.height;
        }

        // Set size
        if (child.isRexSizer) {
            child.runLayout(this, childWidth, childHeight);
            CheckSize(child, this);
        } else {
            ResizeGameObject(child, childWidth, childHeight);
        }

        // Set position
        x = (startX + padding.left);
        width = innerWidth - padding.left - padding.right;
        y = (startY + padding.top);
        height = innerHeight - padding.top - padding.bottom;

        LayoutChild.call(this,
            child, x, y, width, height, childConfig.align,
            childConfig.alignOffsetX, childConfig.alignOffsetY
        );
    }
}

var sourceSize = {};
var targetSize = {};

export default LayoutChildren;