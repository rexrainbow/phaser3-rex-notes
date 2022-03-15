import ResizeGameObject from '../../../../plugins/utils/size/ResizeGameObject.js';
import Sizer from '../../sizer/Sizer.js';

const SizerRunLayout = Sizer.prototype.runLayout;

var ResizeController = function () {
    var topChildOY = this.topChildOY;
    var bottomChildOY = this.bottomChildOY;
    var scroller = this.childrenMap.scroller;
    var slider = this.childrenMap.slider;
    if (scroller) {
        scroller.setBounds(bottomChildOY, topChildOY);
    }
    if (slider) {
        slider.setEnable(bottomChildOY !== topChildOY);
    }
    this.updateController();

    if (this.adaptThumbSizeMode) {
        AdaptThumbSize.call(this);
    }

    return this;
}

var AdaptThumbSize = function () {
    // Change slider size according to visible ratio
    var ratio = Math.min(this.childVisibleHeight / this.childHeight, 1);
    var slider = this.childrenMap.slider;
    var track = slider.childrenMap.track;
    var thumb = slider.childrenMap.thumb;
    var minThumbSize = this.minThumbSize;
    if (this.scrollMode === 0) {
        var newHeight = track.displayHeight * ratio;
        if ((minThumbSize !== undefined) && (newHeight < minThumbSize)) {
            newHeight = minThumbSize;
        }
        ResizeGameObject(thumb, undefined, newHeight);
    } else {
        var newWidth = track.displayWidth * ratio;
        if ((minThumbSize !== undefined) && (newWidth < minThumbSize)) {
            newWidth = minThumbSize;
        }
        ResizeGameObject(thumb, newWidth, undefined);

    }
    LayoutSlider.call(this);
}

var LayoutSlider = function () {
    // Don't layout child, header, footer again
    var child = this.childrenMap.child;
    var header = this.childrenMap.header;
    var footer = this.childrenMap.footer;

    var childDirtySave = (child) ? child.dirty : undefined;
    var headerDirtySave = (header) ? header.dirty : undefined;
    var footerDirtySave = (footer) ? footer.dirty : undefined;

    var minWidthSave = this.minWidth;
    var minHeightSave = this.minHeight;

    if (child) {
        child.dirty = false;
    }
    if (header) {
        header.dirty = false;
    }
    if (footer) {
        footer.dirty = false;
    }

    this.minWidth = this.width;
    this.minHeight = this.height;

    SizerRunLayout.call(this);

    if (child) {
        child.dirty = childDirtySave;
    }
    if (header) {
        header.dirty = headerDirtySave;
    }
    if (footer) {
        footer.dirty = footerDirtySave;
    }

    this.minWidth = minWidthSave;
    this.minHeight = minHeightSave;
}

export default ResizeController;