var SetText = function (text) {
    var textBlock = this.childrenMap.child;
    textBlock.setText(text);

    this.resizeController();
    return this;
}
export default SetText;