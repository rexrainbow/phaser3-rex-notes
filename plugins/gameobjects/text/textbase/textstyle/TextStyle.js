import MeasureText from './MeasureText.js';
import CONST from '../const.js';
import GetStyle from '../../../../utils/canvas/GetStyle.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetValue = Phaser.Utils.Objects.GetValue;

//  Key: [ Object Key, Default Value, postCallback ]

var propertyMap = {
    // background
    backgroundColor: ['backgroundColor', null, GetStyle],
    backgroundColor2: ['backgroundColor2', null, GetStyle],
    backgroundHorizontalGradient: ['backgroundHorizontalGradient', true, null],
    backgroundStrokeColor: ['backgroundStrokeColor', null, GetStyle],
    backgroundStrokeLineWidth: ['backgroundStrokeLineWidth', 2, null],
    backgroundCornerRadius: ['backgroundCornerRadius', 0, null],
    backgroundCornerIteration: ['backgroundCornerIteration', null, null],

    // font
    fontFamily: ['fontFamily', 'Courier', null],
    fontSize: ['fontSize', '16px', null],
    fontStyle: ['fontStyle', '', null],
    color: ['color', '#fff', GetStyle],
    stroke: ['stroke', '#fff', GetStyle],
    strokeThickness: ['strokeThickness', 0, null],
    shadowOffsetX: ['shadow.offsetX', 0, null],
    shadowOffsetY: ['shadow.offsetY', 0, null],
    shadowColor: ['shadow.color', '#000', GetStyle],
    shadowBlur: ['shadow.blur', 0, null],
    shadowStroke: ['shadow.stroke', false, null],
    shadowFill: ['shadow.fill', false, null],

    // underline
    underlineColor: ['underline.color', '#000', GetStyle],
    underlineThickness: ['underline.thickness', 0, null],
    underlineOffset: ['underline.offset', 0, null],

    // align
    halign: ['halign', 'left', null],
    valign: ['valign', 'top', null],

    // size
    maxLines: ['maxLines', 0, null],
    fixedWidth: ['fixedWidth', 0, null],
    fixedHeight: ['fixedHeight', 0, null],
    resolution: ['resolution', 0, null],
    lineSpacing: ['lineSpacing', 0, null],

    rtl: ['rtl', false, null],
    testString: ['testString', '|MÃ‰qgy', null],
    baselineX: ['baselineX', 1.2, null],
    baselineY: ['baselineY', 1.4, null],

    // wrap
    wrapMode: ['wrap.mode', 0, null],
    wrapWidth: ['wrap.width', 0, null]
};

class TextStyle {
    constructor(text, style) {
        this.parent = text;

        this.backgroundColor;
        this.backgroundColor2;
        this.backgroundHorizontalGradient;
        this.backgroundStrokeColor;
        this.backgroundStrokeLineWidth;
        this.backgroundCornerRadius;
        this.backgroundCornerIteration;

        this.fontFamily;
        this.fontSize;
        this.fontStyle;
        this.color;
        this.stroke;
        this.strokeThickness;
        this.shadowOffsetX;
        this.shadowOffsetY;
        this.shadowColor;
        this.shadowBlur;
        this.shadowStroke;
        this.shadowFill;

        this.underlineColor;
        this.underlineThickness;
        this.underlineOffset;

        this.halign;
        this.valign;

        this.maxLines;
        this.fixedWidth;
        this.fixedHeight;
        this.resolution;
        this.lineSpacing;

        this.rtl;
        this.testString;


        this.baselineX;
        this.baselineY;

        this._font;

        //  Set to defaults + user style
        this.setStyle(style, false);

        var metrics = GetValue(style, 'metrics', false);

        //  Provide optional TextMetrics in the style object to avoid the canvas look-up / scanning
        //  Doing this is reset if you then change the font of this TextStyle after creation
        if (metrics) {
            this.metrics = {
                ascent: GetValue(metrics, 'ascent', 0),
                descent: GetValue(metrics, 'descent', 0),
                fontSize: GetValue(metrics, 'fontSize', 0)
            };
        } else {
            this.metrics = MeasureText(this);
        }
    }

    get canvas() {
        return this.parent.canvasText.canvas;
    }

    get context() {
        return this.parent.canvasText.context;
    }

    get isWrapFitMode() {
        return (this.fixedWidth > 0) && (this.wrapMode !== CONST.NO_WRAP) && (this.wrapWidth === 0);
    }

    setStyle(style, updateText) {
        if (updateText === undefined) {
            updateText = true;
        }

        if (style && style.hasOwnProperty('wrap')) {
            var wrap = style.wrap;
            if (wrap.hasOwnProperty('mode')) {
                var mode = wrap.mode;
                if (typeof mode === 'string') {
                    wrap.mode = WRAPMODE[mode];
                }
            } else {
                if (wrap.hasOwnProperty('width')) {
                    wrap.mode = 1;
                }
            }
        }

        //  Avoid type mutation
        if (style && style.hasOwnProperty('fontSize') && typeof style.fontSize === 'number') {
            style.fontSize = style.fontSize.toString() + 'px';
        }

        for (var key in propertyMap) {
            var prop = propertyMap[key];  // [ Object Key, Default Value, preCallback ]
            var objKey = prop[0];
            var defaultValue = prop[1];
            var postCallback = prop[2];

            var value = GetAdvancedValue(style, objKey, defaultValue);
            if (postCallback) {
                value = postCallback(value);
            }
            this[key] = value;
        }

        //  Allow for 'font' override
        var font = GetValue(style, 'font', null);

        if (font === null) {
            this._font = this.fontStyle + ' ' + this.fontSize + ' ' + this.fontFamily;
        } else {
            this._font = font;
        }

        //  Allow for 'fill' to be used in place of 'color'
        var fill = GetValue(style, 'fill', null);

        if (fill !== null) {
            this.color = fill;
        }

        if (updateText) {
            return this.update(true);
        } else {
            return this.parent;
        }
    }

    syncFont(canvas, context) {
        context.font = this._font;
    }

    syncStyle(canvas, context) {
        context.textBaseline = 'alphabetic';

        context.fillStyle = this.color;
        context.strokeStyle = this.stroke;

        context.lineWidth = this.strokeThickness;
        context.lineCap = 'round';
        context.lineJoin = 'round';
    }

    syncShadow(context, enabled) {
        if (enabled) {
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
        } else {
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowColor = 0;
            context.shadowBlur = 0;
        }
    }

    update(recalculateMetrics) {
        if (recalculateMetrics) {
            this._font = this.fontStyle + ' ' + this.fontSize + ' ' + this.fontFamily;

            this.metrics = MeasureText(this);
        }

        return this.parent.updateText(recalculateMetrics);
    }

    buildFont() {
        var newFont = this.fontStyle + ' ' + this.fontSize + ' ' + this.fontFamily;
        if (newFont !== this._font) {
            this._font = newFont;
            //this.metrics = MeasureText(this);
        }
        return this;
    }

    setFont(font) {
        if (typeof font === 'string') {
            this.fontFamily = font;
            this.fontSize = '';
            this.fontStyle = '';
        } else {
            this.fontFamily = GetValue(font, 'fontFamily', 'Courier');
            this.fontSize = GetValue(font, 'fontSize', '16px');
            this.fontStyle = GetValue(font, 'fontStyle', '');
        }

        return this.update(true);
    }

    setFontFamily(family) {
        this.fontFamily = family;

        return this.update(true);
    }

    setFontStyle(style) {
        this.fontStyle = style;

        return this.update(true);
    }

    setFontSize(size) {
        if (typeof size === 'number') {
            size = size.toString() + 'px';
        }

        this.fontSize = size;

        return this.update(true);
    }

    setTestString(string) {
        this.testString = string;

        return this.update(true);
    }

    setFixedSize(width, height) {
        this.fixedWidth = width;
        this.fixedHeight = height;

        if (width) {
            this.parent.width = width;
        }

        if (height) {
            this.parent.height = height;
        }

        return this.update(this.isWrapFitMode);
    }

    setResolution(value) {
        this.resolution = value;

        return this.update(false);
    }

    setLineSpacing(value) {
        this.lineSpacing = value;

        return this.update(false);
    }

    setBackgroundColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }

        this.backgroundColor = GetStyle(color, this.canvas, this.context);
        this.backgroundColor2 = GetStyle(color2, this.canvas, this.context);
        this.backgroundHorizontalGradient = isHorizontalGradient;

        return this.update(false);
    }

    setBackgroundStrokeColor(color, lineWidth) {
        this.backgroundStrokeColor = GetStyle(color, this.canvas, this.context);
        this.backgroundStrokeLineWidth = lineWidth;

        return this.update(false);
    }

    setBackgroundCornerRadius(radius, iteration) {
        this.backgroundCornerRadius = radius;
        this.backgroundCornerIteration = iteration;

        return this.update(false);
    }

    setFill(color) {
        this.color = GetStyle(color, this.canvas, this.context);

        return this.update(false);
    }

    setColor(color) {
        this.color = GetStyle(color, this.canvas, this.context);

        return this.update(false);
    }

    setStroke(color, thickness) {
        if (color === undefined) {
            //  Reset the stroke to zero (disabling it)
            this.strokeThickness = 0;
        } else {
            if (thickness === undefined) {
                thickness = this.strokeThickness;
            }

            this.stroke = GetStyle(color, this.canvas, this.context);
            this.strokeThickness = thickness;
        }

        return this.update(true);
    }

    setShadow(x, y, color, blur, shadowStroke, shadowFill) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (color === undefined) {
            color = '#000';
        }
        if (blur === undefined) {
            blur = 0;
        }
        if (shadowStroke === undefined) {
            shadowStroke = false;
        }
        if (shadowFill === undefined) {
            shadowFill = true;
        }

        this.shadowOffsetX = x;
        this.shadowOffsetY = y;
        this.shadowColor = GetStyle(color, this.canvas, this.context);
        this.shadowBlur = blur;
        this.shadowStroke = shadowStroke;
        this.shadowFill = shadowFill;

        return this.update(false);
    }

    setShadowOffset(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = x;
        }

        this.shadowOffsetX = x;
        this.shadowOffsetY = y;

        return this.update(false);
    }

    setShadowColor(color) {
        if (color === undefined) {
            color = '#000';
        }

        this.shadowColor = GetStyle(color, this.canvas, this.context);

        return this.update(false);
    }

    setShadowBlur(blur) {
        if (blur === undefined) {
            blur = 0;
        }

        this.shadowBlur = blur;

        return this.update(false);
    }

    setShadowStroke(enabled) {
        this.shadowStroke = enabled;

        return this.update(false);
    }

    setShadowFill(enabled) {
        this.shadowFill = enabled;

        return this.update(false);
    }

    setUnderline(color, thickness, offset) {
        if (color === undefined) {
            color = '#000';
        }
        if (thickness === undefined) {
            thickness = 0;
        }
        if (offset === undefined) {
            offset = 0;
        }

        this.underlineColor = GetStyle(color, this.canvas, this.context);
        this.underlineThickness = thickness;
        this.underlineOffset = offset;

        return this.update(false);
    }

    setUnderlineColor(color) {
        if (color === undefined) {
            color = '#000';
        }

        this.underlineColor = GetStyle(color, this.canvas, this.context);
        return this.update(false);
    }

    setUnderlineThickness(thickness) {
        if (thickness === undefined) {
            thickness = 0;
        }

        this.underlineThickness = thickness;
        return this.update(false);
    }

    setUnderlineOffset(offset) {
        if (offset === undefined) {
            offset = 0;
        }

        this.underlineOffset = offset;
        return this.update(false);
    }

    setWrapMode(mode) {
        if (typeof mode === 'string') {
            mode = WRAPMODE[mode.toLowerCase()] || 0;
        }
        this.wrapMode = mode;
        return this.update(true);
    }

    setWrapWidth(width) {
        this.wrapWidth = width;
        return this.update(false);
    }

    setAlign(halign, valign) {
        if (halign === undefined) {
            halign = 'left';
        }
        if (valign === undefined) {
            valign = 'top';
        }
        this.halign = halign;
        this.valign = valign;

        return this.update(false);
    }

    setHAlign(halign) {
        if (halign === undefined) {
            halign = 'left';
        }
        this.halign = halign;

        return this.update(false);
    }

    setVAlign(valign) {
        if (valign === undefined) {
            valign = 'top';
        }
        this.valign = valign;

        return this.update(false);
    }

    setMaxLines(max) {
        if (max === undefined) {
            max = 0;
        }

        this.maxLines = max;

        return this.update(false);
    }

    getTextMetrics() {
        var metrics = this.metrics;

        return {
            ascent: metrics.ascent,
            descent: metrics.descent,
            fontSize: metrics.fontSize
        };
    }

    get lineHeight() {
        return this.metrics.fontSize + this.strokeThickness + this.lineSpacing;
    }

    toJSON() {
        var output = {};

        for (var key in propertyMap) {
            output[key] = this[key];
        }

        output.metrics = this.getTextMetrics();

        return output;
    }

    destroy() {
        this.parent = undefined;
    }

}

const HALIGNMODE = {
    left: CONST.hleft,
    center: CONST.hcenter,
    right: CONST.hright,
};
const VALIGNMODE = {
    top: CONST.vtop,
    center: CONST.vcenter,
    bottom: CONST.vbottom,
};
const WRAPMODE = {
    none: CONST.NO_WRAP,
    word: CONST.WORD_WRAP,
    char: CONST.CHAR_WRAP,
    character: CONST.CHAR_WRAP
};

export default TextStyle;