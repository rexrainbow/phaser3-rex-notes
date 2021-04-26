import GetStyle from '../../../../utils/canvas/GetStyle.js';

class CharData {
    constructor(
        parent,
        fontSize, bold, italic, fontFamily,
        fillStyle, strokeStyle, strtokeLineWidth,
        text,
        x, y, rotation
    ) {
        this.parent = parent;

        this.setFontSize(fontSize);
        this.setBold(bold);
        this.setItalic(italic);
        this.setFontFamily(fontFamily);
        this.setFillStyle(fillStyle);
        this.setStrokeStyle(strokeStyle, strtokeLineWidth);

        this.setText(text);

        this.setPosition(x, y);
        this.setRotation(rotation);
    }

    get canvas() {
        return this.parent.canvas;
    }

    get context() {
        return this.parent.context;
    }

    syncFont() {
        var ctx = this.context;
        ctx.font = this.font;
        return this;
    }

    syncStyle() {
        var ctx = this.context;
        ctx.textBaseline = 'alphabetic';

        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;

        ctx.lineWidth = this.strtokeLineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        return this;
    }

    getTextWidth() {
        this.syncFont().syncStyle();
        return this.ctx.measureText(this.text).width;
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

    get font() {
        return `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`;
    }

    setFontSize(fontSize) {
        if (typeof (fontSize) === 'number') {
            fontSize = `${fontSize.toString()}px`;
        }
        this.fontSize = fontSize;
        return this;
    }

    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        return this;
    }

    setFillStyle(fillStyle) {
        this.fillStyle = GetStyle(fillStyle);
        return this;
    }

    setStrokeStyle(strokeStyle, strtokeLineWidth) {
        if (strokeStyle == null) {
            strtokeLineWidth = 0;
        }
        this.strokeStyle = GetStyle(strokeStyle);
        this.strtokeLineWidth = strtokeLineWidth;
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

    setText(text) {
        this.text = text;
        this.textWidth = this.getTextWidth();
        return this;
    }

    setPosition(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        this.x = x;
        this.y = y;
        return this;
    }

    setRotation(rotation) {
        if (rotation === undefined) {
            rotation = 0;
        }
        this.rotation = rotation;
        return this;
    }
}

export default CharData;