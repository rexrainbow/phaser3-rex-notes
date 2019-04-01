import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';

var Layout = function (parent, newWidth, newHeight) {
    // Skip invisible sizer
    if (!this.visible) {
        return this;
    }

    this.layoutInit(parent);

    // Set size
    if (newWidth === undefined) {
        newWidth = Math.max(this.childrenWidth, this.minWidth);
    }
    if (newHeight === undefined) {
        newHeight = Math.max(this.childrenHeight, this.minHeight);
    }
    this.resize(newWidth, newHeight);

    // Layout child
    var child = this.child;
    var newChildWidth, newChildHeight;
    if (child.visible) {
        // Set size
        if (this.scrollMode === 0) {
            newChildWidth = this.width;
        } else {
            newChildHeight = this.height;
        }
        if (child.isRexSizer) {
            child.layout(this, newChildWidth, newChildHeight);
        } else {
            ResizeGameObject(child, newChildWidth, newChildHeight);
        }

        this.resetChildPosition();

        // Layout text mask before reset text position
        if (this.childMask) {
            this.childMask.setPosition().resize();
            this.resetChildState(this.childMask);
        }
    }

    return this;
}

export default Layout;