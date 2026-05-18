import ImagePen from './ImagePen';

class CharPen extends ImagePen {
    bitmapText: any;
    char: any;
    setFrame: any;

    onFree() {
        this.char = undefined;
        super.onFree();
    }

    setChar(char?: any) {
        this.char = char;
        var fontData = this.bitmapText.fontData;
        if (!fontData) {
            return this;
        }

        var frame = fontData.chars[char.charCodeAt(0)];
        this.setFrame(frame);

        return this;
    }

}

export default CharPen;