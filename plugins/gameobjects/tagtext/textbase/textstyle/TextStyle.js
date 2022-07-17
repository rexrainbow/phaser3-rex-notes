import TextStyleBase from '../../../../utils/text/textbase/textstyle/TextStyle';

class TextStyle extends TextStyleBase {
    get canvas() {
        return this.parent.canvasText.canvas;
    }

    get context() {
        return this.parent.canvasText.context;
    }

}

export default TextStyle;