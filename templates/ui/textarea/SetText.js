var SetText = function (text) {
    var textBlock = this.childrenMap.textBlock;
    textBlock.setText(text);

    // Controller
    var scroller = this.childrenMap.scroller;
    var slider = this.childrenMap.slider;
    if (scroller) {
        scroller.setBounds(textBlock.bottomTextOY, textBlock.topTextOY).setValue(textBlock.topTextOY);
        // Scroller also reflects to slider
    } else if (slider) {
        slider.setValue(0);
    } else {
        textBlock.setTextOY(0);
    }
    if (slider) {
        slider.setEnable(textBlock.textHeight > textBlock.textObjectHeight);
    }
    return this;
}
export default SetText;