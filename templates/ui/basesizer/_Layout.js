// Override
var _layout = function (parent, newWidth, newHeight) {
    // Skip hidden or !dirty sizer
    if (this.rexSizer.hidden || (!this.dirty)) {
        return this;
    }

    // Preprocessor, top parent only
    if (!parent) {
        this.preLayout();
    }

    // Calculate parent width
    newWidth = this.resolveWidth(parent, newWidth);
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
export default _layout;