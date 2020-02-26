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
    return this;
}

export default ResizeController;