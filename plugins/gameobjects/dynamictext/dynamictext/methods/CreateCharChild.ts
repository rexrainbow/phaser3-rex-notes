import CharData from '../bob/char/CharData';
import { CharTypeName } from '../bob/Types';

var CreateCharChild = function(text?: any, style?: any) {
    if (style?: any) {
        this.textStyle.modify(style);
    }

    var child = this.poolManager.allocate(CharTypeName);
    if (child === null) {
        child = new CharData(
            this,               // parent
            text,               // text
            this.textStyle,     // style
        );
    } else {
        child
            .setParent(this)
            .setActive()
            .modifyStyle(this.textStyle)
            .setText(text);
    }

    return child;
}

export default CreateCharChild;