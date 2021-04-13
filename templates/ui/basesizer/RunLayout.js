// Override
var RunLayout = function (parent, newWidth, newHeight) {
    // Skip hidden or !dirty sizer
    if (this.rexSizer.hidden || (!this.dirty)) {
        return this;
    }

    var isTopmostParent = !parent;
    // Preprocessor, top parent only
    if (isTopmostParent) {
        this.preLayout();
    }

    // Calculate parent width
    newWidth = this.resolveWidth(parent, newWidth);
    // Run width wrap
    if (isTopmostParent) {
        this.runWidthWrap(newWidth);
    }
    // Calculate parent height
    newHeight = this.resolveHeight(parent, newHeight);
    // Resize parent
    this.resize(newWidth, newHeight);

    // Layout children    
    this.layoutChildren();

    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}
export default RunLayout;