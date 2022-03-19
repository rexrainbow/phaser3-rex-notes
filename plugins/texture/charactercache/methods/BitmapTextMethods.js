export default {
    resetBitmapTextFont(bitmapText) {
        bitmapText.font = undefined;
        bitmapText.setFont(this.fontKey);
        return this;
    },

    overrideBitmapText(bitmapText) {
        var self = this;
        var setTextSave = bitmapText.setText;
        bitmapText.setText = function (text) {
            self.load(text).resetBitmapTextFont(bitmapText);
            setTextSave.call(bitmapText, text);
        }
        return this;
    }
}