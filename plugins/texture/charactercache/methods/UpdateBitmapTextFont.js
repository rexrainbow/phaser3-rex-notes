var UpdateBitmapTextFont = function (bitmapText) {
    bitmapText.font = undefined;
    bitmapText.setFont(this.frameManager.key);
    return this;
}

export default UpdateBitmapTextFont;