import ResizeGameObject from '../../../../plugins/utils/size/ResizeGameObject.js';

var LayoutChildren = function () {
    // LayoutChildren child
    var child = this.child;
    var childWidth, childHeight;
    if (!child.rexSizer.hidden) {
        // Set size
        switch (this.scrollMode) {
            case 0:
                childWidth = this.width * this.scaleX;
                break;
            case 1:
                childHeight = this.height * this.scaleY;
                break;

            default:
                break;
        }

        if (child.isRexSizer) {
            child.runLayout(this, childWidth, childHeight);
        } else {
            ResizeGameObject(child, childWidth, childHeight);
        }

        // Update local state
        this.resetChildPosition();
        // Layout children-mask
        this.layoutChildrenMask();
        // Re-mask children
        this.maskChildren();
    }
}

export default LayoutChildren;