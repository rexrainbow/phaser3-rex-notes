export default {
    overrideBitmapText(bitmapText) {
        var self = this;
        var setTextSave = bitmapText.setText;
        bitmapText.setText = function (text) {
            self.load(text);
            setTextSave.call(bitmapText, text);
        }
        return this;
    }
}