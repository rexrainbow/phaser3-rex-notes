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
            strokeThickness: this.strokeThickness,
            shaodwColor: this.shadowColor,
            shadowBlur: this.shadowBlur,
            shadowOffsetX: this.shadowOffsetX,
            shadowOffsetY: this.shadowOffsetY,
            x: this.x,
            y: this.y,
        }
    }

    set(o) {
        this.setBold(GetValue(o, 'bold', false));
        this.setItalic(GetValue(o, 'italic', false));
        this.setFontSize(GetValue(o, 'fontSize', '16px'));
        this.setFontFamily(GetValue(o, 'fontFamily', 'Courier'));
        this.setColor(GetValue(o, 'color', '#fff'));
        this.setStrokeStyle(
            GetValue(o, 'stroke', '#fff'),
            GetValue(o, 'strokeThickness', 0)
        );
        this.setShadow(
            GetValue(o, 'shadowColor', null),
            GetValue(o, 'shadowOffsetX', 0),
            GetValue(o, 'shadowOffsetY', 0),
            GetValue(o, 'shadowBlur', 0)
        );
        this.setOffset(
            GetValue(o, 'x', 0),
            GetValue(o, 'y', 0)
        );
    }

    modify(o) {
        if (o.hasOwnProperty('bold')) {
            this.setBold(o.bold);
        }
        if (o.hasOwnProperty('italic')) {
            this.setItalic(o.italic);
        }
        if (o.hasOwnProperty('fontSize')) {
            this.setFontSize(o.fontSize);
        }
        if (o.hasOwnProperty('fontFamily')) {
            this.setFontFamily(o.fontFamily);
        }
        if (o.hasOwnProperty('color')) {
            this.setColor(o.color);
        }
        if (o.hasOwnProperty('stroke') || o.hasOwnProperty('strokeThickness')) {
            this.setStrokeStyle(
                GetProperty('stroke', o, this),
                GetProperty('strokeThickness', o, this)
            );
        }

        if (o.hasOwnProperty('shadowColor') || o.hasOwnProperty('shadowBlur') || o.hasOwnProperty('shadowOffsetX') || o.hasOwnProperty('shadowOffsetY')) {
            this.setShadow(
                GetProperty('shadowColor', o, this),
                GetProperty('shadowOffsetX', o, this),
                GetProperty('shadowOffsetY', o, this),
                GetProperty('shadowBlur', o, this),
            );
        }

        if (o.hasOwnProperty('x') || o.hasOwnProperty('y')) {
            this.setOffset(
                GetProperty('x', o, this),
                GetProperty('y', o, this)
            );
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

    setShadow(color, offsetX, offsetY, blur) {
        this.shadowColor = GetStyle(color);
        this.shadowOffsetX = offsetX;
        this.shadowOffsetY = offsetY;
        this.shaodwBlur = blur;
        return this;
    }

    setOffset(x, y) {
        this.x = x;
        this.y = y;
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

    syncShadow(context) {
        if (context.shadowColor != null) {
            context.shadowColor = this.shadowColor;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
            context.shadowBlur = this.shadowBlur;
        } else {
            context.shadowColor = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 0;
        }
    }

    getTextMetrics(context, text) {
        this.syncFont(context).syncStyle(context);
        return context.measureText(text);
    }

}

var GetProperty = function (name, config, defaultConfig) {
    if (config.hasOwnProperty(name)) {
        return config[name];
    } else {
        return defaultConfig[name];
    }
}

export default TextStyle;