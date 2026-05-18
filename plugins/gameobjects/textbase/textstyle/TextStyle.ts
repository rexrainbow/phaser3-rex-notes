import DefaultPropertyMap from './PropertyMap';
import MeasureText from './MeasureText';
import CONST from '../const';
import WRAPMODE from './WrapModes';
import GetStyle from '../../../utils/canvas/GetStyle';

import { Utils as PhaserUtils } from 'phaser';
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const GetValue = PhaserUtils.Objects.GetValue;

class TextStyle {
    color: any;
    fontSize: any;
    halign: any;
    propertyMap: any;
    shadowFill: any;
    shadowStroke: any;
    valign: any;

    _font: any;
    backgroundColor: any;
    backgroundColor2: any;
    backgroundCornerIteration: any;
    backgroundCornerRadius: any;
    backgroundHorizontalGradient: any;
    backgroundStrokeColor: any;
    backgroundStrokeLineWidth: any;
    baselineX: any;
    baselineY: any;
    fixedHeight: any;
    fixedWidth: any;
    fontFamily: any;
    fontStyle: any;
    maxLines: any;
    metrics: any;
    parent: any;
    resolution: any;
    rtl: any;
    shadowBlur: any;
    shadowColor: any;
    shadowOffsetX: any;
    shadowOffsetY: any;
    strikethroughColor: any;
    strikethroughOffset: any;
    strikethroughThickness: any;
    stroke: any;
    strokeThickness: any;
    testString: any;
    underlineColor: any;
    underlineOffset: any;
    underlineThickness: any;
    wrapCallback: any;
    wrapCallbackScope: any;
    wrapMode: any;
    wrapWidth: any;
    xOffset: any;

    constructor(text?: any, style?: any, propertyMap?: any) {
        this.parent = text;
        // parent.updateText()
        // parent.width, parent.height

        if (propertyMap === undefined) {
            propertyMap = DefaultPropertyMap;
        }
        this.propertyMap = propertyMap;

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

        this.strikethroughColor;
        this.strikethroughThickness;
        this.strikethroughOffset;

        this.halign;
        this.valign;

        this.maxLines;
        this.fixedWidth;
        this.fixedHeight;
        this.resolution;
        this.xOffset;

        this.rtl;
        this.testString;

        this.baselineX;
        this.baselineY;

        this.wrapMode;
        this.wrapWidth;
        this.wrapCallback;
        this.wrapCallbackScope;

        this._font;

        //  Set to defaults + user style
        this.setStyle(style, false, true);
    }

    get isWrapFitMode() {
        return (this.fixedWidth > 0) && (this.wrapMode !== CONST.NO_WRAP) && (this.wrapWidth === 0);
    }

    setStyle(style?: any, updateText?: any, setDefaults?: any) {
        if (updateText === undefined) {
            updateText = true;
        }
        if (setDefaults === undefined) {
            setDefaults = false;
        }

        // Compatible with Text game object
        if (style && style.hasOwnProperty('wordWrap')) {
            var wordWrap = style.wordWrap;
            if (wordWrap.hasOwnProperty('width')) {
                style.wrap = {
                    mode: 'word',
                    width: wordWrap.width,
                }
            }
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

        // default halign of RTL is 'right'
        if (style && style.rtl && setDefaults && (!style.hasOwnProperty('halign'))) {
            style.halign = 'right';
        }

        //  Avoid type mutation
        if (style && style.hasOwnProperty('fontSize') && typeof style.fontSize === 'number') {
            style.fontSize = style.fontSize.toString() + 'px';
        }

        var propertyMap = this.propertyMap;
        for (var key in propertyMap) {
            var prop = propertyMap[key];  // [ Object Key, Default Value, preCallback ]
            var objKey = prop[0];
            var defaultValue = (setDefaults) ? prop[1] : this[key];
            var postCallback = prop[2];


            if (key === 'wrapCallback' || key === 'wrapCallbackScope') {
                // Callback & scope should be set without processing the values
                this[key] = GetValue(style, objKey, defaultValue);
            } else {
                var value = GetAdvancedValue(style, objKey, defaultValue);
                if (postCallback?: any) {
                    value = postCallback(value);
                }
                this[key] = value;
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
            this.color = GetStyle(fill);
        }

        var metrics = GetValue(style, 'metrics', false);

        //  Provide optional TextMetrics in the style object to avoid the canvas look-up / scanning
        //  Doing this is reset if you then change the font of this TextStyle after creation
        if (metrics?: any) {
            this.metrics = {
                ascent: GetValue(metrics, 'ascent', 0),
                descent: GetValue(metrics, 'descent', 0),
                fontSize: GetValue(metrics, 'fontSize', 0)
            };
        } else if (updateText || (!this.metrics)) {
            this.metrics = MeasureText(this);
        }

        if (updateText?: any) {
            return this.parent.updateText();
        } else {
            return this.parent;
        }
    }

    syncFont(canvas?: any, context?: any) {
        context.font = this._font;
    }

    syncStyle(canvas?: any, context?: any) {
        context.textBaseline = 'alphabetic';

        context.fillStyle = this.color;
        context.strokeStyle = this.stroke;

        context.lineWidth = this.strokeThickness;
        context.lineCap = 'round';
        context.lineJoin = 'round';
    }

    syncShadow(context?: any, enabled?: any) {
        if (enabled?: any) {
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

    update(recalculateMetrics?: any) {
        if (recalculateMetrics?: any) {
            this._font = `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`.trim();

            this.metrics = MeasureText(this);
        }

        return this.parent.updateText(recalculateMetrics);
    }

    buildFont() {
        var newFont = `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`.trim();
        if (newFont !== this._font) {
            this._font = newFont;
            //this.metrics = MeasureText(this);
        }
        return this;
    }

    setFont(font?: any) {
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

    setFontFamily(family?: any) {
        this.fontFamily = family;

        return this.update(true);
    }

    setFontStyle(style?: any) {
        this.fontStyle = style;

        return this.update(true);
    }

    setFontSize(size?: any) {
        if (typeof size === 'number') {
            size = size.toString() + 'px';
        }

        this.fontSize = size;

        return this.update(true);
    }

    setTestString(string?: any) {
        this.testString = string;

        return this.update(true);
    }

    setFixedSize(width?: any, height?: any) {
        this.fixedWidth = width;
        this.fixedHeight = height;

        if (width?: any) {
            this.parent.width = width;
        }

        if (height?: any) {
            this.parent.height = height;
        }

        return this.update(this.isWrapFitMode);
    }

    setResolution(value?: any) {
        this.resolution = value;

        return this.update(false);
    }

    setXOffset(value?: any) {
        this.xOffset = value;

        return this.update(false);
    }

    setBackgroundColor(color?: any, color2?: any, isHorizontalGradient?: any) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }

        this.backgroundColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.backgroundColor2 = GetStyle(color2, this.parent.canvas, this.parent.context);
        this.backgroundHorizontalGradient = isHorizontalGradient;

        return this.update(false);
    }

    setBackgroundStrokeColor(color?: any, lineWidth?: any) {
        this.backgroundStrokeColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.backgroundStrokeLineWidth = lineWidth;

        return this.update(false);
    }

    setBackgroundCornerRadius(radius?: any, iteration?: any) {
        this.backgroundCornerRadius = radius;
        this.backgroundCornerIteration = iteration;

        return this.update(false);
    }

    setFill(color?: any) {
        this.color = GetStyle(color, this.parent.canvas, this.parent.context);

        return this.update(false);
    }

    setColor(color?: any) {
        this.color = GetStyle(color, this.parent.canvas, this.parent.context);

        return this.update(false);
    }

    setStroke(color?: any, thickness?: any) {
        if (color === undefined) {
            //  Reset the stroke to zero (disabling it)
            this.strokeThickness = 0;
        } else {
            if (thickness === undefined) {
                thickness = this.strokeThickness;
            }

            this.stroke = GetStyle(color, this.parent.canvas, this.parent.context);
            this.strokeThickness = thickness;
        }

        return this.update(true);
    }

    setShadow(x?: any, y?: any, color?: any, blur?: any, shadowStroke?: any, shadowFill?: any) {
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
        this.shadowColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.shadowBlur = blur;
        this.shadowStroke = shadowStroke;
        this.shadowFill = shadowFill;

        return this.update(false);
    }

    setShadowOffset(x?: any, y?: any) {
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

    setShadowColor(color?: any) {
        if (color === undefined) {
            color = '#000';
        }

        this.shadowColor = GetStyle(color, this.parent.canvas, this.parent.context);

        return this.update(false);
    }

    setShadowBlur(blur?: any) {
        if (blur === undefined) {
            blur = 0;
        }

        this.shadowBlur = blur;

        return this.update(false);
    }

    setShadowStroke(enabled?: any) {
        this.shadowStroke = enabled;

        return this.update(false);
    }

    setShadowFill(enabled?: any) {
        this.shadowFill = enabled;

        return this.update(false);
    }

    setUnderline(color?: any, thickness?: any, offset?: any) {
        if (color === undefined) {
            color = '#000';
        }
        if (thickness === undefined) {
            thickness = 0;
        }
        if (offset === undefined) {
            offset = 0;
        }

        this.underlineColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.underlineThickness = thickness;
        this.underlineOffset = offset;

        return this.update(false);
    }

    setUnderlineColor(color?: any) {
        if (color === undefined) {
            color = '#000';
        }

        this.underlineColor = GetStyle(color, this.parent.canvas, this.parent.context);
        return this.update(false);
    }

    setUnderlineThickness(thickness?: any) {
        if (thickness === undefined) {
            thickness = 0;
        }

        this.underlineThickness = thickness;
        return this.update(false);
    }

    setUnderlineOffset(offset?: any) {
        if (offset === undefined) {
            offset = 0;
        }

        this.underlineOffset = offset;
        return this.update(false);
    }

    setStrikethrough(color?: any, thickness?: any, offset?: any) {
        if (color === undefined) {
            color = '#000';
        }
        if (thickness === undefined) {
            thickness = 0;
        }
        if (offset === undefined) {
            offset = 0;
        }

        this.strikethroughColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.strikethroughThickness = thickness;
        this.strikethroughOffset = offset;

        return this.update(false);
    }

    setStrikethroughColor(color?: any) {
        if (color === undefined) {
            color = '#000';
        }

        this.strikethroughColor = GetStyle(color, this.parent.canvas, this.parent.context);
        return this.update(false);
    }

    setStrikethroughThickness(thickness?: any) {
        if (thickness === undefined) {
            thickness = 0;
        }

        this.strikethroughThickness = thickness;
        return this.update(false);
    }

    setStrikethroughOffset(offset?: any) {
        if (offset === undefined) {
            offset = 0;
        }

        this.strikethroughOffset = offset;
        return this.update(false);
    }

    setWrapMode(mode?: any) {
        if (typeof mode === 'string') {
            mode = WRAPMODE[mode.toLowerCase()] || 0;
        }
        this.wrapMode = mode;
        return this.update(true);
    }

    setWrapWidth(width?: any) {
        this.wrapWidth = width;
        return this.update(false);
    }

    setAlign(halign?: any, valign?: any) {
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

    setHAlign(halign?: any) {
        if (halign === undefined) {
            halign = 'left';
        }
        this.halign = halign;

        return this.update(false);
    }

    setVAlign(valign?: any) {
        if (valign === undefined) {
            valign = 'top';
        }
        this.valign = valign;

        return this.update(false);
    }

    setMaxLines(max?: any) {
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

    setTextMetrics(metrics?: any, font?: any) {
        this.metrics.ascent = metrics.ascent;
        this.metrics.descent = metrics.descent;
        this.metrics.fontSize = metrics.fontSize;

        if (font?: any) {
            if (typeof font === 'string') {
                this.fontFamily = font;
                this.fontSize = '';
                this.fontStyle = '';
            } else {
                this.fontFamily = GetValue(font, 'fontFamily', this.fontFamily);
                this.fontSize = GetValue(font, 'fontSize', this.fontSize);
                this.fontStyle = GetValue(font, 'fontStyle', this.fontStyle);
            }
        }

        return this.parent.updateText(true);
    }

    get lineHeight() {
        return this.metrics.fontSize + this.parent.lineSpacing;
    }

    toJSON() {
        var output = {};

        var propertyMap = this.propertyMap;
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

export default TextStyle;