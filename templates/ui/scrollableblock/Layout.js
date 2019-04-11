import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import MaskToGameObject from '../../../plugins/utils/mask/MaskToGameObject.js';

var Layout = function (parent, newWidth, newHeight) {
    // Skip invisible sizer
    if (this.rexSizer.hidden) {
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
    if (!child.rexSizer.hidden) {
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

        // Layout child mask
        if (this.childMask) {
            var maskGameObject = MaskToGameObject(this.childMask);
            maskGameObject.setPosition().resize();
            this.resetChildPositionState(maskGameObject);
        }
    }

    return this;
}

export default Layout;