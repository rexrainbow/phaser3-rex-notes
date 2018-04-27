/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

import MeasureText from './MeasureText.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetValue = Phaser.Utils.Objects.GetValue;

//  Key: [ Object Key, Default Value ]

/**
 * A custom function that will be responsible for wrapping the text.
 * @callback TextStyleWordWrapCallback
 *
 * @param {string} text - The string to wrap.
 * @param {Phaser.GameObjects.Text} textObject - The Text instance.
 *
 * @return {(string|string[])} Should return the wrapped lines either as an array of lines or as a string with
 * newline characters in place to indicate where breaks should happen.
 */

var propertyMap = {
    // background
    backgroundColor: ['backgroundColor', null],

    // font
    fontFamily: ['fontFamily', 'Courier'],
    fontSize: ['fontSize', '16px'],
    fontStyle: ['fontStyle', ''],
    color: ['color', '#fff'],
    stroke: ['stroke', '#fff'],
    strokeThickness: ['strokeThickness', 0],
    shadowOffsetX: ['shadow.offsetX', 0],
    shadowOffsetY: ['shadow.offsetY', 0],
    shadowColor: ['shadow.color', '#000'],
    shadowBlur: ['shadow.blur', 0],
    shadowStroke: ['shadow.stroke', false],
    shadowFill: ['shadow.fill', false],

    // underline
    underlineColor: ['underline.color', '#000'],
    underlineThickness: ['underline.thickness', 0],
    underlineOffset: ['underline.offset', 0],

    // align
    halign: ['halign', 'left'],
    valign: ['valign', 'top'],

    // size
    maxLines: ['maxLines', 0],
    fixedWidth: ['fixedWidth', 0],
    fixedHeight: ['fixedHeight', 0],
    lineSpacing: ['lineSpacing', 0],

    rtl: ['rtl', false],
    testString: ['testString', '|MÃ‰qgy'],
    baselineX: ['baselineX', 1.2],
    baselineY: ['baselineY', 1.4],

    // wrap
    wrapMode: ['wrap.mode', 0],
    wrapWidth: ['wrap.width', null],
    wrapCallback: ['wrap.callback', null],
    wrapCallbackScope: ['wrap.callbackScope', null]
};

class TextStyle {
    constructor(text, style) {
        this.parent = text;

        this.backgroundColor;

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

    setStyle(style, updateText) {
        if (updateText === undefined) {
            updateText = true;
        }

        //  Avoid type mutation
        if (style && style.hasOwnProperty('fontSize') && typeof style.fontSize === 'number') {
            style.fontSize = style.fontSize.toString() + 'px';
        }

        for (var key in propertyMap) {
            if (key === 'wrapCallback' || key === 'wrapCallbackScope') {
                // Callback & scope should be set without processing the values
                this[key] = GetValue(style, propertyMap[key][0], propertyMap[key][1]);
            } else {
                this[key] = GetAdvancedValue(style, propertyMap[key][0], propertyMap[key][1]);
            }
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

    syncFont(canvas, context, rebuildFont) {
        if (rebuildFont) {
            this._font = this.fontStyle + ' ' + this.fontSize + ' ' + this.fontFamily;
        }
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

        return this.parent.updateText();
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

        return this.update(false);
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;

        return this.update(false);
    }

    setFill(color) {
        this.color = color;

        return this.update(false);
    }

    setColor(color) {
        this.color = color;

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

            this.stroke = color;
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
        this.shadowColor = color;
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

        this.shadowColor = color;

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

    setWordWrapWidth(width) {
        this.wrapWidth = width;

        return this.update(false);
    }

    setWordWrapCallback(callback, scope) {
        if (scope === undefined) {
            scope = null;
        }

        this.wrapCallback = callback;
        this.wrapCallbackScope = scope;

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
        this.wrapCallback = undefined;
        this.wrapCallbackScope = undefined;
    }

}

export default TextStyle;