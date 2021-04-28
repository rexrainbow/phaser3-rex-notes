import Base from './Base.js';
import TextStyle from './TextStyle.js';

class CharData extends Base {
    constructor(
        parent,
        styleJSON,
        text,
        x, y, rotation
    ) {
        super(parent);

        this.style = new TextStyle(styleJSON);
        this.setText(text);

        this.setPosition(x, y);
        this.setRotation(rotation);
    }

    get autoRound() {
        return this.parent.autoRound;
    }

    setStyle(styleJSON) {
        this.setDirty(true);
        this.style.reset(styleJSON);
        return this;
    }

    setText(text) {
        this.setDirty(this.text != text);
        this.text = text;
        return this;
    }

    setPosition(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        this.setDirty((this.x != x) || (this.y != y));
        this.x = x;
        this.y = y;
        return this;
    }

    setRotation(rotation) {
        if (rotation === undefined) {
            rotation = 0;
        }

        this.setDirty(this.rotation != rotation);
        this.rotation = rotation;
        return this;
    }

    draw() {
        if (!this.visible || (this.text === '')) {
            return this;
        }

        var context = this.context;
        context.save();

        var textStyle = this.style;
        textStyle.syncFont(context).syncStyle(context);

        var padding = this.parent.padding;
        var x = this.x + padding.left,
            y = this.y + padding.top;
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        if (textStyle.stroke && textStyle.strokeThickness) {
            context.strokeText(this.text, x, y);
        }

        if (textStyle.color) {
            context.fillText(this.text, x, y);
        }

        context.restore();
    }
}

export default CharData;