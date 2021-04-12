/*
Steps of layout:

1. Calculate parent width
    1. Width wrapping
2. Calculate parent height
3. Resize parent
4. Layout children
    1. Get expand child width
    2. Get expand child height
    3. Layout/resize child
    4. Place child
*/

// Override
var _layout = function (parent, newWidth, newHeight) {
    var isTopmostParent = !parent;
    // Skip hidden or !dirty sizer
    if (this.rexSizer.hidden || (!this.dirty)) {
        return this;
    }

    if (isTopmostParent) {
        this.preLayout();
    }

    // Calculate parent width
    if (newWidth === undefined) {
        newWidth = Math.max(this.childrenWidth, this.minWidth);
    }
    // Width wrapping

    // Calculate parent height
    if (newHeight === undefined) {
        newHeight = Math.max(this.childrenHeight, this.minHeight);
    }
    // Resize parent
    this.resize(newWidth, newHeight);

    // Layout children

    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}
export default _layout;