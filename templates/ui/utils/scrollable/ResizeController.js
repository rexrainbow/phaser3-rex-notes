import ResizeGameObject from '../../../../plugins/utils/size/ResizeGameObject.js';

var ResizeController = function () {
    switch (this.scrollMode) {
        case 0:
        case 1:
            SetControllerBounds.call(this);

            this.updateController();

            HideUnscrollableSlider.call(this);

            AdaptThumbSize.call(this);

            break;

        default: // 2
            SetControllerBounds.call(this, 'y');
            SetControllerBounds.call(this, 'x');

            this.updateController();

            HideUnscrollableSlider.call(this, 'y');
            HideUnscrollableSlider.call(this, 'x');

            AdaptThumbSize.call(this, 'y');
            AdaptThumbSize.call(this, 'x');
            break;
    }

    return this;
}


var SetControllerBounds = function (axis) {
    // Scale will force to 1
    var bound0, bound1;
    var scroller, slider;
    switch (this.scrollMode) {
        case 0:
        case 1:
            bound0 = this.topChildOY;
            bound1 = this.bottomChildOY;
            scroller = this.childrenMap.scroller;
            slider = this.childrenMap.slider;
            axis = (this.scrollMode === 0) ? 'Y' : 'X';
            break;

        default:  // 2
            axis = axis.toUpperCase();
            if (axis === 'Y') {
                bound0 = this.topChildOY;
                bound1 = this.bottomChildOY;
            } else {
                bound0 = this.leftChildOX;
                bound1 = this.rightChildOX;
            }
            scroller = this.childrenMap[`scroller${axis}`];
            slider = this.childrenMap[`slider${axis}`];
    }

    var scale = (axis === 'Y') ? this.scaleY : this.scaleX;
    bound1 *= scale;

    if (scroller) {
        scroller.setBounds(bound0, bound1);
    }
    if (slider) {
        slider.setEnable(bound0 !== bound1);

        if (slider.tickLength) {
            slider.setTick(slider.tickLength, bound0, bound1);
        }
    }
}

var HideUnscrollableSlider = function (axis) {
    switch (this.scrollMode) {
        case 0:
        case 1:
            var slider = this.childrenMap.slider;
            if (slider && this.hideUnscrollableSlider) {
                this.setChildVisible(slider, this.isOverflow);
            }

            var scroller = this.childrenMap.scroller;
            if (scroller && this.disableUnscrollableDrag) {
                scroller.setEnable(this.isOverflow);
            }

            break;

        default:
            axis = axis.toUpperCase();
            var isOverflow = this[`isOverflow${axis}`];

            var slider = this.childrenMap[`slider${axis}`];
            var hideUnscrollableSlider = this[`hideUnscrollableSlider${axis}`];
            if (slider && hideUnscrollableSlider) {
                this.setChildVisible(slider, isOverflow);
            }

            var scroller = this.childrenMap.scroller;
            var disableUnscrollableDrag = this[`disableUnscrollableDrag${axis}`];
            if (scroller && disableUnscrollableDrag) {
                scroller.setEnable(isOverflow);
            }
            break;
    }
}

var AdaptThumbSize = function (axis) {
    switch (this.scrollMode) {
        case 0:
        case 1:
            if (!this.adaptThumbSizeMode) {
                return;
            }
            var slider = this.childrenMap.slider;
            if (!slider) {
                return;
            }

            // Change slider size according to visible ratio
            var ratio = Math.min(this.childVisibleHeight / this.childHeight, 1);
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
            LayoutSlider(slider);
            break;

        default:
            // TODO
            axis = axis.toUpperCase();
            var adaptThumbSizeMode = this[`adaptThumb${axis}SizeMode`];
            if (!adaptThumbSizeMode) {
                return;
            }
            var slider = this.childrenMap[`slider${axis}`];
            if (!slider) {
                return;
            }

            // Change slider size according to visible ratio            
            var track = slider.childrenMap.track;
            var thumb = slider.childrenMap.thumb;
            var minThumbSize = this[`minThumb${axis}Size`];
            if (axis === 'Y') {
                var ratio = Math.min(this.childVisibleHeight / this.childHeight, 1);
                var newHeight = track.displayHeight * ratio;
                if ((minThumbSize !== undefined) && (newHeight < minThumbSize)) {
                    newHeight = minThumbSize;
                }
                ResizeGameObject(thumb, undefined, newHeight);
            } else {
                var ratio = Math.min(this.childVisibleWidth / this.childWidth, 1);
                var newWidth = track.displayWidth * ratio;
                if ((minThumbSize !== undefined) && (newWidth < minThumbSize)) {
                    newWidth = minThumbSize;
                }
                ResizeGameObject(thumb, newWidth, undefined);

            }
            LayoutSlider(slider);
            break;

    }


}

var LayoutSlider = function (slider) {
    // Save minSize
    var minWidthSave = slider.minWidth;
    var minHeightSave = slider.minHeight;
    // Set minSize to current size
    slider.minWidth = slider.width;
    slider.minHeight = slider.height;
    // Layout slider
    slider.layout();
    // Restore minSize
    slider.minWidth = minWidthSave;
    slider.minHeight = minHeightSave;
}

export default ResizeController;