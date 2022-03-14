import ResizeGameObject from '../../../../plugins/utils/size/ResizeGameObject.js';

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
    }

    return this;
}

export default ResizeController;