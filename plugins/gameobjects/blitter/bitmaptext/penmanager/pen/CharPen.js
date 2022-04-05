import ImagePen from './ImagePen.js';

class CharPen extends ImagePen {
    setChar(char) {
        this.char = char;
        var fontData = this.blitter.fontData;
        if (!fontData) {
            return this;
        }

        var frame = fontData.chars[char.charCodeAt(0)];
        this.setFrame(frame);

        return this;
    }

}

export default CharPen;