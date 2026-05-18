import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject';

// Override
var RunLayout = function(parent?: any, newWidth?: any, newHeight?: any) {
    // Skip hidden or !dirty sizer
    if (this.ignoreLayout) {
        return this;
    }

    var isTopmostParent = !parent;
    // Pre-processor, top parent only
    if (isTopmostParent?: any) {
        this.preLayout();
    }

    var runWidthWrap, runHeightWrap;
    if (isTopmostParent || parent.runChildrenWrapFlag) {
        runWidthWrap = this.hasWidthWrap();
        runHeightWrap = this.hasHeightWrap();
    } else {
        runWidthWrap = false;
        runHeightWrap = false;
    }

    var size = ResolveSize(this, newWidth, newHeight, runWidthWrap, runHeightWrap);
    if (!size) {
        console.error('Can\'t resolve size of ', this);
    }

    var width = size.width;
    var height = size.height;

    // Resize parent
    ResizeGameObject(this, width, height);

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
    this.postLayout(parent, width, height);

    // Post-processor, top parent only
    if (isTopmostParent?: any) {
        if (this._anchor) {
            this._anchor.updatePosition();
        }
    }

    return this;
}

var ResolveSize = function(self?: any, width?: any, height?: any, runWidthWrap?: any, runHeightWrap?: any) {
    var newWidth = ResolveWidth(self, width, runWidthWrap);

    var newHeight = ResolveHeight(self, height, runHeightWrap);

    if (newWidth === undefined) {
        newWidth = ResolveWidth(self, width, runWidthWrap);
    }

    if ((newWidth !== undefined) && (newHeight !== undefined)) {
        return {
            width: newWidth,
            height: newHeight
        }
    }

    return false;
}

var ResolveWidth = function(self?: any, width?: any, runWidthWrap?: any) {
    // Calculate parent width
    var width = self.resolveWidth(width);

    // Calculate all children width, run width wrap
    if (runWidthWrap?: any) {
        self.resolveChildrenWidth(width);
        self.runWidthWrap(width);
    }

    return width;
}

var ResolveHeight = function(self?: any, height?: any, runHeightWrap?: any) {
    // Calculate parent height
    var height = self.resolveHeight(height);

    // Calculate all children width, run width wrap
    if (runHeightWrap?: any) {
        self.resolveChildrenHeight(height);
        self.runHeightWrap(height);
    }

    return height;
}

export default RunLayout;