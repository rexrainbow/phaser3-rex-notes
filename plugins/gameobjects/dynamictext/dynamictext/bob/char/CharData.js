import Base from '../Base.js';
import { CharTypeName } from '../Types.js';
import TextStyle from './TextStyle.js';

class CharData extends Base {
    constructor(
        parent,
        text,
        style
    ) {
        super(parent, CharTypeName);
        this.style = new TextStyle(style);
        this.setText(text);
    }

    get autoRound() {
        return this.parent.autoRound;
    }

    get offsetX() {
        return this.style.offsetX;
    }

    set offsetX(value) { }

    get offsetY() {
        return this.style.offsetY;
    }

    set offsetY(value) { }

    modifyStyle(style) {
        this.setDirty(true);
        this.style.modify(style);
        return this;
    }

    modifyPorperties(o) {
        if (!o) {
            return this;
        }

        this.modifyStyle(o);
        super.modifyPorperties(o);
        return this;
    }

    setText(text) {
        this.setDirty(this.text != text);
        this.text = text;

        this.updateTextSize();

        return this;
    }

    updateTextSize() {
        if ((this.text === '\n') || (this.text === '')) {
            this.textWidth = 0;
            this.textHeight = 0;
        } else {
            var metrics = this.style.getTextMetrics(this.context, this.text);
            this.textWidth = metrics.width;

            var ascent, descent;
            if (metrics.hasOwnProperty('actualBoundingBoxAscent')) {
                ascent = metrics.actualBoundingBoxAscent;
                descent = metrics.actualBoundingBoxDescent;
            } else {
                ascent = 0;
                descent = 0;
            }
            this.textHeight = ascent + descent;
        }
        return this;
    }

    get width() {
        return this.textWidth * this.scaleX;
    }

    set width(value) {
        if (this.textWidth > 0) {
            this.scaleX = value / this.textWidth;
        } else {
            this.scaleX = 1;
        }
    }

    get height() {
        return this.textHeight * this.scaleY;
    }

    set height(value) {
        if (this.textHeight > 0) {
            this.scaleY = value / this.textHeight;
        } else {
            this.scaleY = 1;
        }
    }

    drawContent() {
        var textStyle = this.style;
        var hasFill = textStyle.hasFill,
            hasStroke = textStyle.hasStroke;

        if (!hasFill && !hasStroke) {
            return;
        }

        var context = this.context;
        textStyle.syncFont(context).syncStyle(context);

        if (hasStroke) {
            textStyle.syncShadow(context);
            context.strokeText(this.text, 0, 0);
        }

        if (hasFill) {
            textStyle.syncShadow(context);
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

export default CharData;