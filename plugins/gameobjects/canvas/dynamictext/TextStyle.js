import GetStyle from '../../../utils/canvas/GetStyle.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextStyle {
    constructor(config) {
        this.setBold(GetValue(config, 'bold', false));
        this.setItalic(GetValue(config, 'italic', false));
        this.setFontFamily(GetValue(config, 'fontFamily', 'Courier'));
        this.setFillStyle(GetValue(config, 'color', null));
        this.setStrokeStyle(GetValue(config, 'stroke', null), GetValue(config, 'strokeThickness', 0));
    }

    toJSON() {
        return {
            bold: this.bold,
            italic: this.italic,
            fontFamily: this.fontFamily,
            color: this.fillStyle,
            stroke: this.strokeStyle,
            strokeThickness: this.strokeThickness
        }
    }

    modify(o) {
        if (o.hasOwnProperty('bold')) {
            this.setBold(o.bold);
        }
        if (o.hasOwnProperty('italic')) {
            this.setItalic(o.italic);
        }
        if (o.hasOwnProperty('fontFamily')) {
            this.setFontFamily(o.fontFamily);
        }
        if (o.hasOwnProperty('color')) {
            this.setFillStyle(o.color);
        }
        if (o.hasOwnProperty('stroke') || o.hasOwnProperty('strokeThickness')) {
            var stroke = o.hasOwnProperty('stroke') ? o.stroke : this.strokeStyle;
            var strokeThickness = o.hasOwnProperty('strokeThickness') ? o.strokeThickness : this.strokeThickness;
            this.setStrokeStyle(stroke, strokeThickness);
        }
        return this;
    }

    setBold(value) {
        if (value === undefined) {
            value = true;
        }
        this.bold = value;
        return this;
    }

    setItalic(value) {
        if (value === undefined) {
            value = true;
        }
        this.italic = value;
        return this;
    }

    get fontStyle() {
        if (this.bold && this.italic) {
            return 'bold italic';
        } else if (this.bold) {
            return 'bold';
        } else if (this.italic) {
            return 'italic';
        } else {
            return '';
        }
    }

    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        return this;
    }

    get font() {
        return `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`;
    }

    setFillStyle(fillStyle) {
        this.fillStyle = GetStyle(fillStyle);
        return this;
    }

    setStrokeStyle(strokeStyle, strokeThickness) {
        if (strokeStyle == null) {
            strokeThickness = 0;
        }
        this.strokeStyle = GetStyle(strokeStyle);
        this.strokeThickness = strokeThickness;
        return this;
    }

    syncFont(context) {
        context.font = this.font;
        return this;
    }

    syncStyle(context) {
        context.textBaseline = 'alphabetic';

        context.fillStyle = this.fillStyle;
        context.strokeStyle = this.strokeStyle;

        context.lineWidth = this.strokeThickness;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        return this;
    }

    getTextWidth(context, text) {
        this.syncFont(context).syncStyle(context);
        return context.measureText(text).width;
    }
}

export default TextStyle;