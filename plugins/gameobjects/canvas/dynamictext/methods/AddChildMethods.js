import CharData from '../bob/char/CharData.js';
import ImageData from '../bob/image/ImageData.js';

export default {
    modifyTextStyle(style) {
        this.textStyle.modify(style);
        return this;
    },

    setText(text, style) {
        if (text === undefined) {
            text = '';
        }

        var childrenLengthSave = this.children.length;

        this.poolManager.freeMultiple(this.children);
        this.children.length = 0;
        this.appendText(text, style);

        if (this.children.length !== childrenLengthSave) {
            this.dirty = true;
        }
        return this;
    },

    appendText(text, style) {
        if (style) {
            this.modifyTextStyle(style);
        }
        for (var i = 0, cnt = text.length; i < cnt; i++) {
            var char = text.charAt(i);
            var bob = this.poolManager.allocate('text');
            if (bob === null) {
                bob = new CharData(
                    this,               // parent
                    char,               // text
                    this.textStyle,     // style
                );
            } else {
                bob
                    .setParent(this)
                    .setActive()
                    .modifyStyle(this.textStyle)
                    .setText(char);
            }
            this.children.push(bob);
        }
        return this;
    },

    appendImage(key, frame, style) {
        var bob = this.poolManager.allocate('frame');
        if (bob === null) {
            bob = new ImageData(
                this,               // parent
                key,
                frame,
                style
            );
        } else {
            bob
                .setParent(this)
                .setActive()
                .setTexture(key, frame)
                .setStyle(style)
        }
        this.children.push(bob);
        return this;
    },
};