import CharData from '../bob/char/CharData.js';
import { CharTypeName } from '../bob/Types.js';

var AppendText = function (text, style) {
    if (style) {
        this.textStyle.modify(style);
    }

    this.lastAppendedChildren.length = 0;
    for (var i = 0, cnt = text.length; i < cnt; i++) {
        var char = text.charAt(i);
        var bob = this.poolManager.allocate(CharTypeName);
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
        // bob.modifyPorperties(properties);  // Warning: Will modify text-style twice

        this.children.push(bob);
        this.lastAppendedChildren.push(bob);
    }
    return this;
};

export default AppendText;