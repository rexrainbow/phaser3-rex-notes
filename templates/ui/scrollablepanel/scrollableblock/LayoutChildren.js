import ResizeGameObject from '../../../../plugins/utils/size/ResizeGameObject.js';

var LayoutChildren = function () {
    // LayoutChildren child
    var child = this.child;
    var childWidth, childHeight;
    if (!child.rexSizer.hidden) {
        // Set size
        if (this.scrollMode === 0) {
            childWidth = this.width;
        } else {
            childHeight = this.height;
        }
        if (child.isRexSizer) {
            child.runLayout(this, childWidth, childHeight);
        } else {
            ResizeGameObject(child, childWidth, childHeight);
        }

        // LayoutChildren children-mask
        this.layoutChildrenMask();

        this.resetChildPosition();

    }
}

export default LayoutChildren;