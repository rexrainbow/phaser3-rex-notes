import CharData from './bob/CharData.js';

export default {
    modifyTextStyle(style) {
        this.textStyle.modify(style);
        return this;
    },

    setText(text, style) {
        this.children.length = 0; // TODO: Recycle children
        this.appendText(text, style);
        return this;
    },

    appendText(text, style) {
        if (style) {
            this.modifyTextStyle(style);
        }
        for (var i = 0, cnt = text.length; i < cnt; i++) {
            var bob = new CharData(
                this,               // parent
                this.textStyle,     // style
                text.charAt(i)      // text
            ); // TODO: Reuse CharData
            this.children.push(bob);
        }
        return this;
    },
};