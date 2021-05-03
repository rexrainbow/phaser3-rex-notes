import GetStyle from '../../../../../utils/canvas/GetStyle.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextStyle {
    constructor(config) {
        this.set(config);
    }

    toJSON() {
        return {
            bold: this.bold,
            italic: this.italic,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            color: this.color,
            stroke: this.stroke,
            strokeThickness: this.strokeThickness
        }
    }

    set(o) {
        this.setBold(GetValue(o, 'bold', false));
        this.setItalic(GetValue(o, 'italic', false));
        this.setFontSize(GetValue(o, 'fontSize', '16px'));
        this.setFontFamily(GetValue(o, 'fontFamily', 'Courier'));
        this.setColor(GetValue(o, 'color', '#fff'));
        this.setStrokeStyle(GetValue(o, 'stroke', '#fff'), GetValue(o, 'strokeThickness', 0));
        this.setOffset(GetValue(o, 'x', 0), GetValue(o, 'y', 0));
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
            this.setColor(o.color);
        }
        if (o.hasOwnProperty('stroke') || o.hasOwnProperty('strokeThickness')) {
            var stroke = o.hasOwnProperty('stroke') ? o.stroke : this.stroke;
            var strokeThickness = o.hasOwnProperty('strokeThickness') ? o.strokeThickness : this.strokeThickness;
            this.setStrokeStyle(stroke, strokeThickness);
        }
        if (o.hasOwnProperty('fontSize')) {
            this.setFontSize(o.fontSize);
        }

        if (o.hasOwnProperty('x') || o.hasOwnProperty('y')) {
            var x = o.hasOwnProperty('x') ? o.x : 0;
            var y = o.hasOwnProperty('y') ? o.y : 0;
            this.setOffset(x, y);
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

    get fontSize() {
        return this._fontSize;
    }

    set fontSize(value) {
        if (typeof (value) === 'number') {
            value = `${value}px`;
        }
        this._fontSize = value;
    }

    setFontSize(fontSize) {
        this.fontSize = fontSize;
        return this;
    }

    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        return this;
    }

    get font() {
        return `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`;
    }

    setColor(color) {
        this.color = GetStyle(color);
        return this;
    }

    setStrokeStyle(stroke, strokeThickness) {
        if (stroke == null) {
            strokeThickness = 0;
        }
        this.stroke = GetStyle(stroke);
        this.strokeThickness = strokeThickness;
        return this;
    }

    syncFont(context) {
        context.font = this.font;
        return this;
    }

    syncStyle(context) {
        context.textBaseline = 'alphabetic';

        context.fillStyle = this.color;
        context.strokeStyle = this.stroke;

        context.lineWidth = this.strokeThickness;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        return this;
    }

    getTextMetrics(context, text) {
        this.syncFont(context).syncStyle(context);
        return context.measureText(text);
    }

    setOffset(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
}

export default TextStyle;