import CharData from '../bob/CharData.js';
import RunWordWrap from './RunWordWrap.js';

export default {
    modifyTextStyle(style) {
        this.textStyle.modify(style);
        return this;
    },

    setText(text, style) {
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
                    this.textStyle,     // style
                    char               // text
                );
            } else {
                bob
                    .setParent(this)
                    .modifyStyle(this.textStyle)
                    .setText(char);
            }
            this.children.push(bob);
        }
        return this;
    },

    runWordWrap(config) {
        return RunWordWrap.call(this, config);
    }
};