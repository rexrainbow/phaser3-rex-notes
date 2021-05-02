import Base from '../Base.js';
import TextStyle from './TextStyle.js';

class Char extends Base {
    constructor(
        parent,
        text,
        style
    ) {
        super(parent, 'text');
        this.style = new TextStyle(style);
        this.setText(text);
    }

    get autoRound() {
        return this.parent.autoRound;
    }

    get xOffset() {
        return this.style.x;
    }

    set xOffset(value) { }

    get yOffset() {
        return this.style.y;
    }

    set yOffset(value) { }

    modifyStyle(style) {
        this.setDirty(true);
        this.style.modify(style);
        return this;
    }

    setText(text) {
        this.setDirty(this.text != text);
        this.text = text;
        this.width = (text !== '\n') ? this.style.getTextWidth(this.context, text) : 0;
        return this;
    }

    drawContent() {
        var context = this.context;
        var textStyle = this.style;

        textStyle.syncFont(context).syncStyle(context);

        if (textStyle.stroke && textStyle.strokeThickness) {
            context.strokeText(this.text, 0, 0);
        }

        if (textStyle.color) {
            context.fillText(this.text, 0, 0);
        }
    }

    draw() {
        if (!this.visible || (this.text === '') || (this.text === '\n')) {
            return this;
        }

        super.draw();
    }
}

export default Char;