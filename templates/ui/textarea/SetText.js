var SetText = function (text) {
    var textBlock = this.childrenMap.textBlock;
    textBlock.setText(text);

    // Controller
    var bottomOY = textBlock.bottomTextOY,
        topOY = textBlock.topTextOY;
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
        textBlock.setTextOY(topOY);
    }
    if (slider) {
        slider.setEnable(bottomOY !== topOY);
    }
    return this;
}
export default SetText;