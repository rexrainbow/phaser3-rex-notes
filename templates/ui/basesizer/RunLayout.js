// Override
var RunLayout = function (parent, newWidth, newHeight) {
    // Skip hidden or !dirty sizer
    if (this.ignoreLayout) {
        return this;
    }

    var isTopmostParent = !parent;
    // Pre-processor, top parent only
    if (isTopmostParent) {
        this.preLayout();
    }

    var size = { width: newWidth, height: newHeight };
    var runWidthWrap = isTopmostParent && this.hasWidthWrap();
    var runHeightWrap = isTopmostParent && this.hasHeightWrap();
    var resolved = ResolveSize(this, size, runWidthWrap, runHeightWrap);
    if (!resolved) {
        debugger;
    }

    var width = size.width,
        height = size.height;

    // The last chance of resolving size
    this.postResolveSize(width, height);

    // Resize parent
    this.resize(width, height);

    if (this.sizerEventsEnable) {
        if (this.layoutedChildren === undefined) {
            this.layoutedChildren = [];
        }
    }

    // Layout children    
    this.layoutChildren();

    // Layout background children
    this.layoutBackgrounds();

    if (this.sizerEventsEnable) {
        this.emit('postlayout', this.layoutedChildren, this);
        this.layoutedChildren.length = 0;
    }

    // Custom postLayout callback
    this.postLayout();

    // Post-processor, top parent only
    if (isTopmostParent) {
        this._postLayout();
    }

    return this;
}

var ResolveSize = function (self, size, runWidthWrap, runHeightWrap) {

    // Calculate parent width
    var width = self.resolveWidth(size.width);

    // Calculate all children width, run width wrap
    if (width !== undefined) {
        size.width = width;
        if (runWidthWrap) {
            self.resolveChildrenWidth(width);
            self.runWidthWrap(width);
        }
    }

    // Calculate parent height
    var height = self.resolveHeight(size.height);

    // Calculate all children width, run width wrap
    if (height !== undefined) {
        size.height = height;
        if (runHeightWrap) {
            self.resolveChildrenHeight(height);
            self.runHeightWrap(height);
        }
    }

    return (width !== undefined) && (height !== undefined);
}

export default RunLayout;