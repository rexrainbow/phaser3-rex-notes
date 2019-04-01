var UpdatePanel = function () {
    var scrollableBlock = this.childrenMap.scrollableBlock;

    // Controller
    var bottomOY = scrollableBlock.bottomChildOY,
        topOY = scrollableBlock.topChildOY;
    var scroller = this.childrenMap.scroller;
    var slider = this.childrenMap.slider;
    if (scroller) {
        scroller
            .setBounds(bottomOY, topOY)
            .setValue(topOY);
        // Scroller also reflects to slider
    } else if (slider) {
        slider.setValue(0);
    } else {
        scrollableBlock.setChildOY(topOY);
    }
    if (slider) {
        slider.setEnable(bottomOY !== topOY);
    }
    return this;
}
export default UpdatePanel;