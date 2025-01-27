var UpdateController = function () {
    switch (this.scrollMode) {
        case 0:
        case 1:
            var scroller = this.childrenMap.scroller;
            var slider = this.childrenMap.slider;
            if (scroller) {
                scroller.setValue(this.childOY);
            }
            if (slider) {
                slider.setValue(this.t);
            }
            break;

        default:
            var scrollerY = this.childrenMap.scrollerY;
            var sliderY = this.childrenMap.sliderY;
            var scrollerX = this.childrenMap.scrollerX;
            var sliderX = this.childrenMap.sliderX;

            if (scrollerY) {
                scrollerY.setValue(this.childOY);
            }
            if (sliderY) {
                sliderY.setValue(this.t);
            }
            if (scrollerX) {
                scrollerX.setValue(this.childOX);
            }
            if (sliderX) {
                sliderX.setValue(this.s);
            }
            break;
    }

}

export default UpdateController;