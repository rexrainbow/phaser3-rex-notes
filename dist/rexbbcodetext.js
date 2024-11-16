(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbbcodetext = factory());
})(this, (function () { 'use strict';

    var Utils = Phaser.Renderer.WebGL.Utils;

    var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
        if ((src.width === 0) || (src.height === 0)) {
            return;
        }

        camera.addToRenderList(src);

        var frame = src.frame;
        var width = frame.width;
        var height = frame.height;
        var getTint = Utils.getTintAppendFloatAlpha;
        var pipeline = renderer.pipelines.set(src.pipeline, src);
        var textureUnit = pipeline.setTexture2D(frame.glTexture, src);

        renderer.pipelines.preBatch(src);

        pipeline.batchTexture(
            src,
            frame.glTexture,
            width, height,
            src.x, src.y,
            width / src.style.resolution, height / src.style.resolution,
            src.scaleX, src.scaleY,
            src.rotation,
            src.flipX, src.flipY,
            src.scrollFactorX, src.scrollFactorY,
            src.displayOriginX, src.displayOriginY,
            0, 0, width, height,
            getTint(src.tintTopLeft, camera.alpha * src._alphaTL),
            getTint(src.tintTopRight, camera.alpha * src._alphaTR),
            getTint(src.tintBottomLeft, camera.alpha * src._alphaBL),
            getTint(src.tintBottomRight, camera.alpha * src._alphaBR),
            src.tintFill,
            0, 0,
            camera,
            parentMatrix,
            false,
            textureUnit
        );

        renderer.pipelines.postBatch(src);
    };

    var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
        if ((src.width === 0) || (src.height === 0)) {
            return;
        }

        camera.addToRenderList(src);

        renderer.batchSprite(src, src.frame, camera, parentMatrix);
    };

    var Render = {
        renderWebGL: WebGLRenderer,
        renderCanvas: CanvasRenderer

    };

    const CanvasPool$3 = Phaser.Display.Canvas.CanvasPool;

    var MeasureTextMargins = function (textStyle, testString, out) {
        if (out === undefined) {
            out = {};
        }

        var canvas = CanvasPool$3.create(this);
        var context = canvas.getContext('2d', { willReadFrequently: true });

        textStyle.syncFont(canvas, context);

        var metrics = context.measureText(testString);

        var width = Math.ceil(metrics.width * textStyle.baselineX);
        var baseline = width;
        var height = 2 * baseline;

        baseline = baseline * textStyle.baselineY | 0;

        canvas.width = width;
        canvas.height = height;

        context.fillStyle = '#f00';
        context.fillRect(0, 0, width, height);

        context.font = textStyle._font;

        context.textBaseline = 'alphabetic';
        context.fillStyle = '#000';
        context.fillText(textStyle.testString, 0, baseline);

        out.left = 0;

        if ((width === 0) || (height === 0) || !context.getImageData(0, 0, width, height)) {
            CanvasPool$3.remove(canvas);
            return out;
        }

        var imagedata = context.getImageData(0, 0, width, height).data;
        var stop = false;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (y * width + x) * 4;
                if (imagedata[idx] !== 255) {
                    out.left = x;
                    stop = true;
                    break;
                }
            }
            if (stop) {
                break;
            }
        }

        CanvasPool$3.remove(canvas);
        return out;
    };

    const MinVersion = 60;

    var IsChecked = false;

    var CheckP3Version = function (minVersion) {
        if (IsChecked) {
            return;
        }

        if (minVersion === undefined) {
            minVersion = MinVersion;
        }
        var version = Phaser.VERSION.split('.');
        var mainVersion = parseInt(version[0]);
        if (mainVersion === 3) {
            var currentVersion = parseInt(version[1]);
            if (currentVersion < minVersion) {
                console.error(`Minimum supported version : ${mainVersion}.${currentVersion}`);
            }
        } else {
            console.error(`Can't supported version : ${mainVersion}`);
        }

        IsChecked = true;
    };

    CheckP3Version();

    const GameObject$1 = Phaser.GameObjects.GameObject;

    class TextBase extends GameObject$1 {

        setStyle(style) {
            return this.style.setStyle(style);
        }

        setFont(font) {
            return this.style.setFont(font);
        }

        setFontFamily(family) {
            return this.style.setFontFamily(family);
        }

        setFontSize(size) {
            return this.style.setFontSize(size);
        }

        setFontStyle(style) {
            return this.style.setFontStyle(style);
        }

        setTestString(string) {
            return this.style.setTestString(string);
        }

        setFixedSize(width, height) {
            return this.style.setFixedSize(width, height);
        }

        setBackgroundColor(color, color2, isHorizontalGradient) {
            return this.style.setBackgroundColor(color, color2, isHorizontalGradient);
        }

        setBackgroundStrokeColor(color, lineWidth) {
            return this.style.setBackgroundStrokeColor(color, lineWidth);
        }

        setBackgroundCornerRadius(radius, iteration) {
            return this.style.setBackgroundCornerRadius(radius, iteration);
        }

        setFill(color) {
            return this.style.setFill(color);
        }

        setColor(color) {
            return this.style.setColor(color);
        }

        setStroke(color, thickness) {
            return this.style.setStroke(color, thickness);
        }

        setShadow(x, y, color, blur, shadowStroke, shadowFill) {
            return this.style.setShadow(x, y, color, blur, shadowStroke, shadowFill);
        }

        setShadowOffset(x, y) {
            return this.style.setShadowOffset(x, y);
        }

        setShadowColor(color) {
            return this.style.setShadowColor(color);
        }

        setShadowBlur(blur) {
            return this.style.setShadowBlur(blur);
        }

        setShadowStroke(enabled) {
            return this.style.setShadowStroke(enabled);
        }

        setShadowFill(enabled) {
            return this.style.setShadowFill(enabled);
        }

        setUnderline(color, thickness, offset) {
            return this.style.setUnderline(color, thickness, offset);
        }

        setUnderlineColor(color) {
            return this.style.setUnderlineColor(color);
        }

        setUnderlineThickness(thickness) {
            return this.style.setUnderlineThickness(thickness);
        }

        setUnderlineOffset(offset) {
            return this.style.setUnderlineOffset(offset);
        }

        setStrikethrough(color, thickness, offset) {
            return this.style.setStrikethrough(color, thickness, offset);
        }

        setStrikethroughColor(color) {
            return this.style.setStrikethroughColor(color);
        }

        setStrikethroughThickness(thickness) {
            return this.style.setStrikethroughThickness(thickness);
        }

        setStrikethroughOffset(offset) {
            return this.style.setStrikethroughOffset(offset);
        }

        setWrapMode(mode) {
            return this.style.setWrapMode(mode);
        }

        setWrapWidth(width) {
            return this.style.setWrapWidth(width);
        }

        // Align with built-in text game object
        setWordWrapWidth(width) {
            return this.style.setWrapWidth(width);
        }

        setAlign(align) {
            return this.style.setHAlign(align);
        }
        setHAlign(align) {
            return this.style.setHAlign(align);
        }
        setVAlign(align) {
            return this.style.setVAlign(align);
        }

        get lineSpacing() {
            return this.style.lineSpacing;
        }

        set lineSpacing(value) {
            this.style.lineSpacing = value;
        }

        setLineSpacing(value) {
            this.style.lineSpacing = value;
            this.updateText(true);
            return this;
        }

        setXOffset(value) {
            return this.style.setXOffset(value);
        }

        setMaxLines(max) {
            return this.style.setMaxLines(max);
        }

        setResolution(value) {
            return this.style.setResolution(value);
        }

        getTextMetrics() {
            return this.style.getTextMetrics();
        }

        setTextMetrics(metrics, font) {
            return this.style.setTextMetrics(metrics, font);
        }

        measureTextMargins(testString, out) {
            return MeasureTextMargins(this.style, testString, out);
        }

    }

    const Components$1 = Phaser.GameObjects.Components;
    Phaser.Class.mixin(TextBase,
        [
            Components$1.Alpha,
            Components$1.BlendMode,
            Components$1.ComputedSize,
            Components$1.Crop,
            Components$1.Depth,
            Components$1.Flip,
            Components$1.GetBounds,
            Components$1.Mask,
            Components$1.Origin,
            Components$1.Pipeline,
            Components$1.PostPipeline,
            Components$1.ScrollFactor,
            Components$1.Tint,
            Components$1.Transform,
            Components$1.Visible,
            Render
        ]
    );

    const Pad = Phaser.Utils.String.Pad;
    var GetStyle = function (style, canvas, context) {
        if (style == null) {
            return style;
        }

        switch (typeof (style)) {
            case 'string': return style;
            case 'number': return `#${Pad(Math.floor(style).toString(16), 6, '0', 1)}`;
            case 'function': return style(canvas, context);
            case 'object':
                if (style.hasOwnProperty('r')) {
                    if (style.hasOwnProperty('a')) {  // rgba
                        return `rgba(${style.r},${style.g},${style.b},${style.a})`;
                    } else {  // rgb
                        return `rgb(${style.r},${style.g},${style.b})`;
                    }
                } else if (style.hasOwnProperty('h')) {
                    if (style.hasOwnProperty('a')) {  // hsla
                        return `hsla(${style.h},${style.s},${style.l},${style.a})`;
                    } else {  // hsl
                        return `hsl(${style.h},${style.s},${style.l})`;
                    }
                } else {
                    return style; // Not a valid input
                }
            default: return style;
        }
    };

    //  Key: [ Object Key, Default Value, postCallback ]

    var PropertyMap = {
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

        // strikethrough
        strikethroughColor: ['strikethrough.color', '#000', GetStyle],
        strikethroughThickness: ['strikethrough.thickness', 0, null],
        strikethroughOffset: ['strikethrough.offset', 0, null],

        // align
        halign: ['halign', 'left', null],
        valign: ['valign', 'top', null],

        // size
        maxLines: ['maxLines', 0, null],
        fixedWidth: ['fixedWidth', 0, null],
        fixedHeight: ['fixedHeight', 0, null],
        resolution: ['resolution', 0, null],
        lineSpacing: ['lineSpacing', 0, null],
        xOffset: ['xOffset', 0, null],

        rtl: ['rtl', false, null],
        testString: ['testString', '|MÃ‰qgy', null],
        baselineX: ['baselineX', 1.2, null],
        baselineY: ['baselineY', 1.4, null],

        // wrap
        wrapMode: ['wrap.mode', 0, null],
        wrapWidth: ['wrap.width', 0, null],
        wrapCallback: ['wrap.callback', null],
        wrapCallbackScope: ['wrap.callbackScope', null],
    };

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2018 Photon Storm Ltd.
     * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
     */

    const CanvasPool$2 = Phaser.Display.Canvas.CanvasPool;

    /**
     * Calculates the ascent, descent and fontSize of a given font style.
     *
     * @function Phaser.GameObjects.MeasureText
     * @since 3.0.0
     *
     * @param {Phaser.GameObjects.Text.TextStyle} textStyle - The TextStyle object to measure.
     *
     * @return {object} An object containing the ascent, descent and fontSize of the TextStyle.
     */
    var MeasureText = function (textStyle) {
        // @property {HTMLCanvasElement} canvas - The canvas element that the text is rendered.
        var canvas = CanvasPool$2.create(this);

        // @property {HTMLCanvasElement} context - The context of the canvas element that the text is rendered to.
        var context = canvas.getContext('2d', { willReadFrequently: true });

        textStyle.syncFont(canvas, context);

        var metrics = context.measureText(textStyle.testString);

        if ('actualBoundingBoxAscent' in metrics) {
            var ascent = metrics.actualBoundingBoxAscent;
            var descent = metrics.actualBoundingBoxDescent;

            var output = {
                ascent: ascent,
                descent: descent,
                fontSize: (ascent + descent)
            };

            CanvasPool$2.remove(canvas);

            return output;
        }

        var width = Math.ceil(metrics.width * textStyle.baselineX);
        var baseline = width;
        var height = 2 * baseline;

        baseline = baseline * textStyle.baselineY | 0;

        canvas.width = width;
        canvas.height = height;

        context.fillStyle = '#f00';
        context.fillRect(0, 0, width, height);

        context.font = textStyle._font;

        context.textBaseline = 'alphabetic';
        context.fillStyle = '#000';
        context.fillText(textStyle.testString, 0, baseline);

        var output = {
            ascent: 0,
            descent: 0,
            fontSize: 0
        };

        if (!context.getImageData(0, 0, width, height)) {
            output.ascent = baseline;
            output.descent = baseline + 6;
            output.fontSize = output.ascent + output.descent;

            CanvasPool$2.remove(canvas);

            return output;
        }

        var imagedata = context.getImageData(0, 0, width, height).data;
        var pixels = imagedata.length;
        var line = width * 4;
        var i;
        var j;
        var idx = 0;
        var stop = false;

        // ascent. scan from top to bottom until we find a non red pixel
        for (i = 0; i < baseline; i++) {
            for (j = 0; j < line; j += 4) {
                if (imagedata[idx + j] !== 255) {
                    stop = true;
                    break;
                }
            }

            if (!stop) {
                idx += line;
            }
            else {
                break;
            }
        }

        output.ascent = baseline - i;

        idx = pixels - line;
        stop = false;

        // descent. scan from bottom to top until we find a non red pixel
        for (i = height; i > baseline; i--) {
            for (j = 0; j < line; j += 4) {
                if (imagedata[idx + j] !== 255) {
                    stop = true;
                    break;
                }
            }

            if (!stop) {
                idx -= line;
            }
            else {
                break;
            }
        }

        output.descent = (i - baseline);
        output.fontSize = output.ascent + output.descent;

        CanvasPool$2.remove(canvas);

        return output;
    };

    var CONST = {
        // new line mode
        NO_NEWLINE: 0,
        RAW_NEWLINE: 1,
        WRAPPED_NEWLINE: 2,

        // wrap mode
        NO_WRAP: 0,
        WORD_WRAP: 1,
        CHAR_WRAP: 2,
        MIX_WRAP: 3,

        // split lines
        SPLITREGEXP: /(?:\r\n|\r|\n)/
    };

    const WRAPMODE = {
        none: CONST.NO_WRAP,
        word: CONST.WORD_WRAP,
        char: CONST.CHAR_WRAP,
        character: CONST.CHAR_WRAP,
        mix: CONST.MIX_WRAP
    };

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const GetValue$6 = Phaser.Utils.Objects.GetValue;

    class TextStyle {
        constructor(text, style, propertyMap) {
            this.parent = text;
            // parent.updateText()
            // parent.width, parent.height

            if (propertyMap === undefined) {
                propertyMap = PropertyMap;
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

        setStyle(style, updateText, setDefaults) {
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
                    };
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
                    this[key] = GetValue$6(style, objKey, defaultValue);
                } else {
                    var value = GetAdvancedValue(style, objKey, defaultValue);
                    if (postCallback) {
                        value = postCallback(value);
                    }
                    this[key] = value;
                }

            }

            //  Allow for 'font' override
            var font = GetValue$6(style, 'font', null);

            if (font === null) {
                this._font = this.fontStyle + ' ' + this.fontSize + ' ' + this.fontFamily;
            } else {
                this._font = font;
            }

            //  Allow for 'fill' to be used in place of 'color'
            var fill = GetValue$6(style, 'fill', null);

            if (fill !== null) {
                this.color = GetStyle(fill);
            }

            var metrics = GetValue$6(style, 'metrics', false);

            //  Provide optional TextMetrics in the style object to avoid the canvas look-up / scanning
            //  Doing this is reset if you then change the font of this TextStyle after creation
            if (metrics) {
                this.metrics = {
                    ascent: GetValue$6(metrics, 'ascent', 0),
                    descent: GetValue$6(metrics, 'descent', 0),
                    fontSize: GetValue$6(metrics, 'fontSize', 0)
                };
            } else if (updateText || (!this.metrics)) {
                this.metrics = MeasureText(this);
            }

            if (updateText) {
                return this.parent.updateText();
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

        setFont(font) {
            if (typeof font === 'string') {
                this.fontFamily = font;
                this.fontSize = '';
                this.fontStyle = '';
            } else {
                this.fontFamily = GetValue$6(font, 'fontFamily', 'Courier');
                this.fontSize = GetValue$6(font, 'fontSize', '16px');
                this.fontStyle = GetValue$6(font, 'fontStyle', '');
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

        setXOffset(value) {
            this.xOffset = value;

            return this.update(false);
        }

        setBackgroundColor(color, color2, isHorizontalGradient) {
            if (isHorizontalGradient === undefined) {
                isHorizontalGradient = true;
            }

            this.backgroundColor = GetStyle(color, this.parent.canvas, this.parent.context);
            this.backgroundColor2 = GetStyle(color2, this.parent.canvas, this.parent.context);
            this.backgroundHorizontalGradient = isHorizontalGradient;

            return this.update(false);
        }

        setBackgroundStrokeColor(color, lineWidth) {
            this.backgroundStrokeColor = GetStyle(color, this.parent.canvas, this.parent.context);
            this.backgroundStrokeLineWidth = lineWidth;

            return this.update(false);
        }

        setBackgroundCornerRadius(radius, iteration) {
            this.backgroundCornerRadius = radius;
            this.backgroundCornerIteration = iteration;

            return this.update(false);
        }

        setFill(color) {
            this.color = GetStyle(color, this.parent.canvas, this.parent.context);

            return this.update(false);
        }

        setColor(color) {
            this.color = GetStyle(color, this.parent.canvas, this.parent.context);

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

                this.stroke = GetStyle(color, this.parent.canvas, this.parent.context);
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
            this.shadowColor = GetStyle(color, this.parent.canvas, this.parent.context);
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

            this.shadowColor = GetStyle(color, this.parent.canvas, this.parent.context);

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

            this.underlineColor = GetStyle(color, this.parent.canvas, this.parent.context);
            this.underlineThickness = thickness;
            this.underlineOffset = offset;

            return this.update(false);
        }

        setUnderlineColor(color) {
            if (color === undefined) {
                color = '#000';
            }

            this.underlineColor = GetStyle(color, this.parent.canvas, this.parent.context);
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

        setStrikethrough(color, thickness, offset) {
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

        setStrikethroughColor(color) {
            if (color === undefined) {
                color = '#000';
            }

            this.strikethroughColor = GetStyle(color, this.parent.canvas, this.parent.context);
            return this.update(false);
        }

        setStrikethroughThickness(thickness) {
            if (thickness === undefined) {
                thickness = 0;
            }

            this.strikethroughThickness = thickness;
            return this.update(false);
        }

        setStrikethroughOffset(offset) {
            if (offset === undefined) {
                offset = 0;
            }

            this.strikethroughOffset = offset;
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

        setTextMetrics(metrics, font) {
            this.metrics.ascent = metrics.ascent;
            this.metrics.descent = metrics.descent;
            this.metrics.fontSize = metrics.fontSize;

            if (font) {
                if (typeof font === 'string') {
                    this.fontFamily = font;
                    this.fontSize = '';
                    this.fontStyle = '';
                } else {
                    this.fontFamily = GetValue$6(font, 'fontFamily', this.fontFamily);
                    this.fontSize = GetValue$6(font, 'fontSize', this.fontSize);
                    this.fontStyle = GetValue$6(font, 'fontStyle', this.fontStyle);
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

    var GetString = function (value) {
        if (value == null) {
            value = '';
        } else if (Array.isArray(value)) {
            value = value.join('\n');
        } else if (typeof (value) === 'number') {
            value = value.toString();
        }
        return value;
    };

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    class RoundRectangle {
        constructor(x, y, width, height, radiusConfig) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = x; }
            if (width === undefined) { width = 0; }
            if (height === undefined) { height = 0; }
            if (radiusConfig === undefined) { radiusConfig = 0; }

            this.cornerRadius = {};
            this._width = 0;
            this._height = 0;
            this.setTo(x, y, width, height, radiusConfig);
        }

        setTo(x, y, width, height, radiusConfig) {
            this.setPosition(x, y);
            this.setRadius(radiusConfig);
            this.setSize(width, height);
            return this;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        setRadius(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radius = value;
            return this;
        }

        setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        get minWidth() {
            var radius = this.cornerRadius;
            return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
        }

        get minHeight() {
            var radius = this.cornerRadius;
            return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
        }

        get width() {
            return this._width;
        }

        set width(value) {
            if (value == null) {
                value = 0;
            }
            this._width = Math.max(value, this.minWidth);
        }

        get height() {
            return this._height;
        }

        set height(value) {
            if (value == null) {
                value = 0;
            }
            this._height = Math.max(value, this.minHeight);
        }

        get radius() {
            var radius = this.cornerRadius;
            return Math.max(
                radius.tl.x, radius.tl.y,
                radius.tr.x, radius.tr.y,
                radius.bl.x, radius.bl.y,
                radius.br.x, radius.br.y
            );
        }

        set radius(value) {
            var defaultRadiusX, defaultRadiusY;
            if (typeof (value) === 'number') {
                defaultRadiusX = value;
                defaultRadiusY = value;
            } else {
                defaultRadiusX = GetValue$5(value, 'x', 0);
                defaultRadiusY = GetValue$5(value, 'y', 0);
            }

            var radius = this.cornerRadius;
            radius.tl = GetRadius(GetValue$5(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
            radius.tr = GetRadius(GetValue$5(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
            radius.bl = GetRadius(GetValue$5(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
            radius.br = GetRadius(GetValue$5(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
        }

        get radiusTL() {
            var radius = this.cornerRadius.tl;
            return Math.max(radius.x, radius.y);
        }

        set radiusTL(value) {
            SetRadius(this.cornerRadius.tl, value);
        }

        get radiusTR() {
            var radius = this.cornerRadius.tr;
            return Math.max(radius.x, radius.y);
        }

        set radiusTR(value) {
            SetRadius(this.cornerRadius.tr, value);
        }

        get radiusBL() {
            var radius = this.cornerRadius.bl;
            return Math.max(radius.x, radius.y);
        }

        set radiusBL(value) {
            SetRadius(this.cornerRadius.bl, value);
        }

        get radiusBR() {
            var radius = this.cornerRadius.br;
            return Math.max(radius.x, radius.y);
        }

        set radiusBR(value) {
            SetRadius(this.cornerRadius.br, value);
        }
    }

    var GetRadius = function (radius, defaultRadiusX, defaultRadiusY) {
        if (radius === undefined) {
            radius = {
                x: defaultRadiusX,
                y: defaultRadiusY
            };
        } else if (typeof (radius) === 'number') {
            radius = {
                x: radius,
                y: radius
            };
        }

        SetConvex(radius);
        return radius;

    };

    var SetRadius = function (radius, value) {
        if (typeof (value) === 'number') {
            radius.x = value;
            radius.y = value;
        } else {
            radius.x = GetValue$5(value, 'x', 0);
            radius.y = GetValue$5(value, 'y', 0);
        }

        SetConvex(radius);
    };

    var SetConvex = function (radius) {
        radius.convex = (radius.x >= 0) || (radius.y >= 0);

        radius.x = Math.abs(radius.x);
        radius.y = Math.abs(radius.y);
    };

    const DegToRad = Phaser.Math.DegToRad;

    var AddRoundRectanglePath = function (context, x, y, width, height, radiusConfig, iteration) {
        var geom = new RoundRectangle(x, y, width, height, radiusConfig),
            minWidth = geom.minWidth,
            minHeight = geom.minHeight,
            scaleRX = (width >= minWidth) ? 1 : (width / minWidth),
            scaleRY = (height >= minHeight) ? 1 : (height / minHeight);

        var cornerRadius = geom.cornerRadius;
        var radius, radiusX, radiusY, centerX, centerY;
        var startX, startY;

        context.save();
        context.beginPath();

        context.translate(x, y);

        // Top-left
        radius = cornerRadius.tl;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = radiusX;
                centerY = radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 270, false, iteration);
            } else {
                centerX = 0;
                centerY = 0;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 0, true, iteration);
            }

            startX = 0;
            startY = radiusY;
        } else {
            context.lineTo(0, 0);

            startX = 0;
            startY = 0;
        }

        // Top-right
        radius = cornerRadius.tr;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = width - radiusX;
                centerY = radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 360, false, iteration);
            } else {
                centerX = width;
                centerY = 0;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 90, true, iteration);
            }
        } else {
            context.lineTo(width, 0);
        }

        // Bottom-right
        radius = cornerRadius.br;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = width - radiusX;
                centerY = height - radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 0, 90, false, iteration);
            } else {
                centerX = width;
                centerY = height;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 180, true, iteration);
            }
        } else {
            context.lineTo(width, height);
        }

        // Bottom-left
        radius = cornerRadius.bl;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = radiusX;
                centerY = height - radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 180, false, iteration);
            } else {
                centerX = 0;
                centerY = height;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 360, 270, true, iteration);
            }
        } else {
            context.lineTo(0, height);
        }

        context.lineTo(startX, startY);
        context.closePath();
        context.restore();
    };

    var IsConvexArc = function (radius) {
        return (!radius.hasOwnProperty('convex')) ||  // radius does not have convex property
            radius.convex;
    };

    var IsArcCorner = function (radius) {
        return ((radius.x > 0) && (radius.y > 0));
    };

    var ArcTo = function (
        context,
        centerX, centerY,
        radiusX, radiusY,
        startAngle, endAngle,
        antiClockWise,
        iteration
    ) {

        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        startAngle = DegToRad(startAngle);
        endAngle = DegToRad(endAngle);

        if (iteration == null) {  // undefined, or null
            context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle, antiClockWise);
        } else {
            iteration += 1;
            var x, y, angle;
            var step = (endAngle - startAngle) / iteration;
            for (var i = 0; i <= iteration; i++) {
                angle = startAngle + (step * i);
                x = centerX + (radiusX * Math.cos(angle));
                y = centerY + (radiusY * Math.sin(angle));
                context.lineTo(x, y);
            }
        }
    };

    var DrawRoundRectangle = function (
        canvas, context,
        x, y,
        width, height, radiusConfig,
        fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient,
        iteration
    ) {

        AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration);

        if (fillStyle != null) {
            if (fillColor2 != null) {
                var grd;
                if (isHorizontalGradient) {
                    grd = context.createLinearGradient(0, 0, width, 0);
                } else {
                    grd = context.createLinearGradient(0, 0, 0, height);
                }
                grd.addColorStop(0, fillStyle);
                grd.addColorStop(1, fillColor2);
                fillStyle = grd;
            }

            context.fillStyle = fillStyle;
            context.fill();
        }

        if ((strokeStyle != null) && (lineWidth > 0)) {
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.stroke();
        }
    };

    var DrawRoundRectangleBackground = function (
        canvasObject,
        color,
        strokeColor, strokeLineWidth,
        radius,
        color2, isHorizontalGradient,
        iteration
    ) {

        if ((color == null) && (strokeColor == null)) {
            return;
        }

        var width = canvasObject.canvas.width,
            height = canvasObject.canvas.height;

        if (strokeColor == null) {
            strokeLineWidth = 0;
        }
        var x = strokeLineWidth / 2;
        width = Math.max(1, width - strokeLineWidth);   // Min width is 1
        height = Math.max(1, height - strokeLineWidth); // Min height is 1
        DrawRoundRectangle(canvasObject.canvas, canvasObject.context,
            x, x,
            width, height,
            radius,
            color,
            strokeColor, strokeLineWidth,
            color2, isHorizontalGradient,
            iteration
        );
    };

    var DrawMethods = {
        draw(startX, startY, textWidth, textHeight) {
            var penManager = this.penManager;
            this.hitAreaManager.clear();

            var context = this.context;
            context.save();

            var defaultStyle = this.defaultStyle;

            this.clear();
            DrawRoundRectangleBackground(
                this,
                defaultStyle.backgroundColor,
                defaultStyle.backgroundStrokeColor,
                defaultStyle.backgroundStrokeLineWidth,
                defaultStyle.backgroundCornerRadius,
                defaultStyle.backgroundColor2,
                defaultStyle.backgroundHorizontalGradient,
                defaultStyle.backgroundCornerIteration
            );

            // draw lines
            startX += this.startXOffset;
            startY += this.startYOffset;
            var defaultHalign = defaultStyle.halign,
                valign = defaultStyle.valign;

            var lineWidth, lineHeight = defaultStyle.lineHeight;
            var lines = penManager.lines;
            var totalLinesNum = lines.length,
                maxLines = defaultStyle.maxLines;
            var drawLinesNum, drawLineStartIdx, drawLineEndIdx;
            if ((maxLines > 0) && (totalLinesNum > maxLines)) {
                drawLinesNum = maxLines;
                if (valign === 'center') { // center
                    drawLineStartIdx = Math.floor((totalLinesNum - drawLinesNum) / 2);
                } else if (valign === 'bottom') { // bottom
                    drawLineStartIdx = totalLinesNum - drawLinesNum;
                } else {
                    drawLineStartIdx = 0;
                }
            } else {
                drawLinesNum = totalLinesNum;
                drawLineStartIdx = 0;
            }
            drawLineEndIdx = drawLineStartIdx + drawLinesNum;

            var offsetX, offsetY;
            var rtl = this.rtl,
                rtlOffset = (rtl) ? this.parent.width : undefined;
            if (valign === 'center') { // center
                offsetY = Math.max((textHeight - (drawLinesNum * lineHeight)) / 2, 0);
            } else if (valign === 'bottom') { // bottom
                offsetY = Math.max(textHeight - (drawLinesNum * lineHeight) - 2, 0);
            } else {
                offsetY = 0;
            }
            offsetY += startY;
            for (var lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
                lineWidth = penManager.getLineWidth(lineIdx);
                if (lineWidth === 0) {
                    continue;
                }

                var pens = lines[lineIdx],
                    penCount = pens.length;
                var halign = defaultHalign;
                // Seek if there has algin tag
                for (var penIdx = 0; penIdx < penCount; penIdx++) {
                    var penAlign = pens[penIdx].prop.align;
                    if (penAlign !== undefined) {
                        halign = penAlign;
                        break;
                    }
                }

                if (halign === 'center') { // center
                    offsetX = (textWidth - lineWidth) / 2;
                } else if (halign === 'right') { // right
                    offsetX = (!rtl) ? (textWidth - lineWidth) : 0;
                } else {
                    offsetX = (!rtl) ? 0 : (textWidth - lineWidth);
                }
                offsetX += startX;

                for (var penIdx = 0; penIdx < penCount; penIdx++) {
                    this.drawPen(pens[penIdx], offsetX, offsetY, rtlOffset);
                }
            }

            context.restore();
        },

        drawPen(pen, offsetX, offsetY, rtlOffset) {
            offsetX += pen.x;
            offsetY += pen.y + (pen.prop.y || 0);

            if (rtlOffset !== undefined) {
                offsetX = rtlOffset - offsetX;
            }

            var canvas = this.canvas;
            var context = this.context;
            context.save();

            var curStyle = this.parser.propToContextStyle(this.defaultStyle, pen.prop);

            // Background
            if ((curStyle.bgcolor !== null) && (pen.width > 0)) {
                var metrics = this.defaultStyle.metrics;
                var bgTLY = offsetY - metrics.ascent;
                var bgHeight = metrics.fontSize;
                this.drawRectangle(offsetX, bgTLY, pen.width, bgHeight, curStyle.bgcolor, curStyle);
            }

            // Underline
            if ((curStyle.underlineThickness > 0) && (pen.width > 0)) {
                var lineOffsetY = offsetY + curStyle.underlineOffset - (curStyle.underlineThickness / 2);
                this.drawLine(offsetX, lineOffsetY, pen.width, curStyle.underlineThickness, curStyle.underlineColor, curStyle);
            }

            // Text
            if (pen.isTextPen) {
                curStyle.buildFont();
                curStyle.syncFont(canvas, context);
                curStyle.syncStyle(canvas, context);
                this.drawText(offsetX, offsetY, pen.text, curStyle);
            }

            // Image
            if (pen.isImagePen) {
                this.drawImage(offsetX, offsetY, pen.prop.img, pen.prop.color, curStyle);
            }

            // Strikethrough
            if ((curStyle.strikethroughThickness > 0) && (pen.width > 0)) {
                var lineOffsetY = offsetY + curStyle.strikethroughOffset - (curStyle.strikethroughThickness / 2);
                this.drawLine(offsetX, lineOffsetY, pen.width, curStyle.strikethroughThickness, curStyle.strikethroughColor, curStyle);
            }

            context.restore();

            if (pen.hasAreaMarker && (pen.width > 0)) {
                var data;
                var areaKey = pen.prop.area;
                if (areaKey) {
                    data = {
                        key: areaKey
                    };
                } else {
                    var url = pen.prop.url;
                    data = {
                        key: `url:${url}`,
                        url: url
                    };
                }

                this.hitAreaManager.add(
                    offsetX,                       // x
                    (offsetY - this.startYOffset), // y
                    pen.width,                     // width
                    this.defaultStyle.lineHeight,  // height
                    data
                );
            }
        },

        clear() {
            var canvas = this.canvas;
            this.context.clearRect(0, 0, canvas.width, canvas.height);
        },

        drawRectangle(x, y, width, height, color, style) {
            if (this.autoRound) {
                x = Math.round(x);
                y = Math.round(y);
            }

            var context = this.context;
            context.fillStyle = color;
            context.fillRect(x, y, width, height);
        },

        drawLine(x, y, width, height, color, style) {
            if (this.autoRound) {
                x = Math.round(x);
                y = Math.round(y);
            }

            var context = this.context;
            style.syncShadow(context, style.shadowStroke);

            var savedLineCap = context.lineCap;
            context.lineCap = 'butt';
            context.strokeStyle = color;
            context.lineWidth = height;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo((x + width), y);
            context.stroke();
            context.lineCap = savedLineCap;
        },

        drawText(x, y, text, style) {
            if (this.autoRound) {
                x = Math.round(x);
                y = Math.round(y);
            }

            var context = this.context;
            if (style.stroke && (style.stroke !== 'none') && (style.strokeThickness > 0)) {
                style.syncShadow(context, style.shadowStroke);
                context.strokeText(text, x, y);
            }

            if (style.color && (style.color !== 'none')) {
                style.syncShadow(context, style.shadowFill);
                context.fillText(text, x, y);
            }
        },

        drawImage(x, y, imgKey, color, style) {
            y -= this.startYOffset;
            this.parent.imageManager.draw(imgKey, this.context, x, y, color, this.autoRound);
        }

    };

    const GetValue$4 = Phaser.Utils.Objects.GetValue;
    const NO_NEWLINE$3 = CONST.NO_NEWLINE;
    const RAW_NEWLINE$1 = CONST.RAW_NEWLINE;

    class Pen {
        constructor(config) {
            this.prop = {};
            this.resetFromJSON(config);
        }

        resetFromJSON(o) { // (txt, x, y, width, prop, newLineMode, startIndex)
            this.text = GetValue$4(o, 'text', '');
            this.x = GetValue$4(o, 'x', 0);
            this.y = GetValue$4(o, 'y', 0);
            this.width = GetValue$4(o, 'width', 0);

            var prop = GetValue$4(o, 'prop', null);
            if (prop === null) {
                prop = {};
            }
            this.prop = prop;
            this.newLineMode = GetValue$4(o, 'newLineMode', 0);
            this.startIndex = GetValue$4(o, 'startIndex', 0);
        }

        get plainText() {
            var txt = this.text;
            if (this.newLineMode === RAW_NEWLINE$1) {
                txt += "\n";
            }

            return txt;
        }

        get wrapText() {
            var txt = this.text;
            if (this.newLineMode !== NO_NEWLINE$3) {
                txt += "\n";
            }

            return txt;
        }

        get rawTextLength() {
            var len = this.text.length;
            if (this.newLineMode === RAW_NEWLINE$1) {
                len += 1;
            }
            return len;
        }

        get endIndex() {
            return this.startIndex + this.rawTextLength;
        }

        get lastX() {
            return this.x + this.width;
        }

        get isTextPen() {
            return (this.text !== '');
        }

        get isImagePen() {
            return !!this.prop.img;
        }

        get hasAreaMarker() {
            return !!this.prop.area || !!this.prop.url;
        }
    }

    var Clear = function (obj) {
        if ((typeof (obj) !== 'object') || (obj === null)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            obj.length = 0;
        } else {
            for (var key in obj) {
                delete obj[key];
            }
        }

        return obj;
    };

    /**
     * Shallow Object Clone. Will not out nested objects.
     * @param {object} obj JSON object
     * @param {object} ret JSON object to return, set null to return a new object
     * @returns {object} this object
     */
    var Clone = function (obj, out) {
        var objIsArray = Array.isArray(obj);

        if (out === undefined) {
            out = (objIsArray) ? [] : {};
        } else {
            Clear(out);
        }

        if (objIsArray) {
            out.length = obj.length;
            for (var i = 0, cnt = obj.length; i < cnt; i++) {
                out[i] = obj[i];
            }
        } else {
            for (var key in obj) {
                out[key] = obj[key];
            }
        }

        return out;
    };

    var NOOP = function () {
        //  NOOP
    };

    const GetFastValue = Phaser.Utils.Objects.GetFastValue;
    const NO_NEWLINE$2 = CONST.NO_NEWLINE;
    const WRAPPED_NEWLINE$2 = CONST.WRAPPED_NEWLINE;

    class PenManager {
        constructor(config) {
            this.pens = []; // all pens
            this.lines = []; // pens in lines [ [],[],[],.. ]
            this.maxLinesWidth = undefined;

            this.pensPool = config.pensPool;    // Required
            this.linesPool = config.linesPool;  // Required
            this.tagToText = GetFastValue(config, 'tagToText', NOOP);
            this.tagToTextScope = GetFastValue(config, 'tagToTextScope', undefined);
        }

        destroy() {
            this.clear();
            this.tagToText = undefined;
            this.tagToTextScope = undefined;
        }

        clear() {
            for (var i = 0, len = this.lines.length; i < len; i++) {
                this.lines[i].length = 0;
            }

            this.pensPool.pushMultiple(this.pens);
            this.linesPool.pushMultiple(this.lines);
            this.maxLinesWidth = undefined;
        }

        addTextPen(text, x, y, width, prop, newLineMode) {
            var pen = this.pensPool.pop();
            if (pen == null) {
                pen = new Pen();
            }
            PEN_CONFIG.text = text;
            PEN_CONFIG.x = x;
            PEN_CONFIG.y = y;
            PEN_CONFIG.width = width;
            PEN_CONFIG.prop = prop;
            PEN_CONFIG.newLineMode = newLineMode;
            pen.resetFromJSON(PEN_CONFIG);
            this.addPen(pen);
            return this;
        }

        addImagePen(x, y, width, prop) {
            this.addTextPen('', x, y, width, prop, NO_NEWLINE$2);
            return this;
        }

        addNewLinePen() {
            var previousPen = this.lastPen;
            var x = (previousPen) ? previousPen.lastX : 0;
            var y = (previousPen) ? previousPen.y : 0;
            var prop = (previousPen) ? Clone(previousPen.prop) : null;
            this.addTextPen('', x, y, 0, prop, WRAPPED_NEWLINE$2);
            return this;
        }

        addPen(pen) {
            var previousPen = this.lastPen;
            if (previousPen == null) {
                pen.startIndex = 0;
            } else {
                pen.startIndex = previousPen.endIndex;
            }
            this.pens.push(pen);

            // maintan lines
            var line = this.lastLine;
            if (line == null) {
                line = this.linesPool.pop() || [];
                this.lines.push(line);
            }
            line.push(pen);

            // new line, add an empty line
            if (pen.newLineMode !== NO_NEWLINE$2) {
                line = this.linesPool.pop() || [];
                this.lines.push(line);
            }
            this.maxLinesWidth = undefined;
        }

        clone(targetPenManager) {
            if (targetPenManager == null)
                targetPenManager = new PenManager();

            targetPenManager.clear();

            for (var li = 0, llen = this.lines.length; li < llen; li++) {
                var pens = this.lines[li];
                for (var pi = 0, plen = pens.length; pi < plen; pi++) {
                    var pen = pens[pi];
                    targetPenManager.addPen(
                        pen.text,
                        pen.x,
                        pen.y,
                        pen.width,
                        Clone(pen.prop),
                        pen.newLineMode
                    );
                }
            }

            return targetPenManager;
        }

        get lastPen() {
            return this.pens[this.pens.length - 1];
        }

        get lastLine() {
            return this.lines[this.lines.length - 1];
        }

        getLineStartIndex(i) {
            if (i >= this.lines.length) {
                return this.getLineEndIndex(i);
            } else {
                var line = this.lines[i];
                return (line && line[0]) ? line[0].startIndex : 0;
            }
        }

        getLineEndIndex(i) {
            if (i >= this.lines.length) {
                i = this.lines.length - 1;
            }
            var li, hasLastPen = false,
                line;
            for (li = i; li >= 0; li--) {
                line = this.lines[li];
                hasLastPen = (line != null) && (line.length > 0);
                if (hasLastPen) {
                    break;
                }
            }
            if (!hasLastPen) {
                return 0;
            }

            var lastPen = line[line.length - 1];
            return lastPen.endIndex;
        }

        getLineWidth(i) {
            var line = this.lines[i];
            if (!line) {
                return 0;
            }

            var lastPen = line[line.length - 1];
            if (lastPen == null) {
                return 0;
            }

            var lineWidth = lastPen.lastX; // start from 0
            return lineWidth;
        }

        getMaxLineWidth() {
            if (this.maxLinesWidth !== undefined) {
                return this.maxLinesWidth;
            }
            var w, maxW = 0;
            for (var i = 0, len = this.lines.length; i < len; i++) {
                w = this.getLineWidth(i);
                if (w > maxW) {
                    maxW = w;
                }
            }
            this.maxLinesWidth = maxW;
            return maxW;
        }

        getLineWidths() {
            var result = [];
            for (var i = 0, len = this.lines.length; i < len; i++) {
                result.push(this.getLineWidth(i));
            }
            return result;
        }

        get linesCount() {
            return this.lines.length;
        }

        get plainText() {
            var txt = "",
                pens = this.pens;
            for (var i = 0, len = pens.length; i < len; i++) {
                txt += pens[i].plainText;
            }

            return txt;
        }

        get rawTextLength() {
            var l = 0,
                pens = this.pens;
            for (var i = 0, len = this.pens.length; i < len; i++) {
                l += pens[i].rawTextLength;
            }

            return l;
        }

        getSliceTagText(start, end, wrap) {
            var lastPen = this.lastPen;
            if (lastPen == null) {
                return '';
            }
            var lastPenEnd = lastPen.endIndex;

            if ((start === undefined) || (start === 0)) {
                // Image pen before first character
                start = -1;
            }

            if ((end === undefined) || (end === lastPenEnd)) {
                // Image pen after last character
                end = lastPenEnd + 1;
            }
            if (wrap === undefined) {
                wrap = false;
            }

            var txt = "",
                pen, penTxt, penStartIdx, penEndIdx, isInRange;
            var currentProp, previousProp;
            for (var i = 0, len = this.pens.length; i < len; i++) {
                pen = this.pens[i];
                penEndIdx = pen.endIndex;
                if (penEndIdx <= start) {
                    continue;
                }
                pen = this.pens[i];
                penTxt = (!wrap) ? pen.plainText : pen.wrapText;
                currentProp = pen.prop;
                penStartIdx = pen.startIndex;

                isInRange = (penStartIdx >= start) && (penEndIdx <= end);
                if (!isInRange) {
                    penTxt = penTxt.substring(start - penStartIdx, end - penStartIdx);
                }

                if (this.tagToTextScope) {
                    txt += this.tagToText.call(this.tagToTextScope, penTxt, currentProp, previousProp);
                } else {
                    txt += this.tagToText(penTxt, currentProp, previousProp);
                }

                previousProp = currentProp;
                if (penEndIdx >= end) {
                    break;
                }
            }

            return txt;
        }

        get length() {
            return this.lines.length;
        }

        set length(value) {
            // Only for set length to 0 (clear)
            this.clear();
        }
    }
    var PEN_CONFIG = {};

    class Stack {
        constructor() {
            this.items = [];
        }

        destroy() {
            this.clear();
            this.items = undefined;
        }

        pop() {
            return (this.items.length > 0) ? this.items.pop() : null;
        }

        push(l) {
            this.items.push(l);
            return this;
        }

        pushMultiple(arr) {
            this.items.push.apply(this.items, arr);
            arr.length = 0;
            return this;
        }

        clear() {
            this.items.length = 0;
            return this;
        }
    }

    const Rectangle = Phaser.Geom.Rectangle;

    var RectanglePool = new Stack();
    class HitAreaManager {
        constructor() {
            this.hitAreas = [];
        }

        destroy() {
            this.clear();
        }

        clear() {
            // Reuse hitArea(rectangle) later
            for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
                Clear(this.hitAreas[i].data);
            }
            RectanglePool.pushMultiple(this.hitAreas);
            return this;
        }

        add(x, y, width, height, data) {
            var rectangle = RectanglePool.pop();
            if (rectangle === null) {
                rectangle = new Rectangle(x, y, width, height);
            } else {
                rectangle.setTo(x, y, width, height);
            }

            rectangle.data = data;

            this.hitAreas.push(rectangle);
            return this;
        }

        getFirst(x, y) {
            for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
                var hitArea = this.hitAreas[i];
                if (hitArea.contains(x, y)) {
                    return hitArea;
                }
            }
            return null;
        }

        getByKey(key) {
            for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
                var hitArea = this.hitAreas[i];
                if (hitArea.data.key === key) {
                    return hitArea;
                }
            }
            return null;
        }

        drawBounds(graphics, color, parent) {
            if (color === undefined) {
                color = 0xffffff;
            }

            if (parent) {
                graphics
                    .save()
                    .scaleCanvas(parent.scaleX, parent.scaleY)
                    .rotateCanvas(parent.rotation)
                    .translateCanvas(parent.x, parent.y);
            }

            for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
                var hitArea = this.hitAreas[i];
                graphics
                    .lineStyle(1, color)
                    .strokeRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
            }

            if (parent) {
                graphics
                    .restore();
            }
            return this;
        }
    }

    var SetInteractive = function () {
        this.parent

            .on('pointerdown', OnAreaDown, this)

            .on('pointerup', OnAreaUp, this)

            .on('pointermove', OnAreaOverOut, this)
            .on('pointerover', OnAreaOverOut, this)
            .on('pointerout', function (pointer, event) {
                OnAreaOverOut.call(this, pointer, null, null, event);
            }, this);
    };

    var OnAreaDown = function (pointer, localX, localY, event) {
        var area = this.hitAreaManager.getFirst(localX, localY);
        if (area === null) {
            return;
        }

        var key = area.data.key;
        FireEvent.call(this, 'areadown', key, pointer, localX, localY, event);

        area.data.isDown = true;
    };

    var OnAreaUp = function (pointer, localX, localY, event) {
        var area = this.hitAreaManager.getFirst(localX, localY);
        if (area === null) {
            return;
        }

        var areaData = area.data;

        var key = areaData.key;
        FireEvent.call(this, 'areaup', key, pointer, localX, localY, event);

        if (areaData.isDown) {
            FireEvent.call(this, 'areaclick', key, pointer, localX, localY, event);

            var url = areaData.url;
            if (url) {
                window.open(url, '_blank');
            }
        }

        areaData.isDown = false;
    };

    var OnAreaOverOut = function (pointer, localX, localY, event) {
        if (localX === null) {  // Case of pointerout
            if (this.lastHitAreaKey !== null) {
                FireEvent.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);
                this.hitAreaManager.getByKey(this.lastHitAreaKey).isDown = false;
                this.lastHitAreaKey = null;
            }
            return;
        }

        var area = this.hitAreaManager.getFirst(localX, localY);
        var key = (area) ? area.data.key : null;
        if (this.lastHitAreaKey === key) {
            return;
        }

        if (this.lastHitAreaKey !== null) {
            FireEvent.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);

            var prevHitArea = this.hitAreaManager.getByKey(this.lastHitAreaKey);
            if (this.urlTagCursorStyle && !!prevHitArea.data.url) {
                this.scene.input.manager.canvas.style.cursor = '';
            }

            prevHitArea.isDown = false;
        }
        if (key !== null) {
            FireEvent.call(this, 'areaover', key, pointer, localX, localY, event);

            if (this.urlTagCursorStyle && !!area.data.url) {
                this.scene.input.manager.canvas.style.cursor = this.urlTagCursorStyle;
            }
        }

        this.lastHitAreaKey = key;
    };

    var FireEvent = function (eventName, key, pointer, localX, localY, event) {
        this.parent.emit(`${eventName}-${key}`, pointer, localX, localY, event);
        this.parent.emit(eventName, key, pointer, localX, localY, event);
    };

    var RE_ASCII = /^[\x00-\x7F]+$/;
    var IsASCIIString = function (s) {
        return RE_ASCII.test(s);
    };

    const NO_NEWLINE$1 = CONST.NO_NEWLINE;
    const RAW_NEWLINE = CONST.RAW_NEWLINE;
    const WRAPPED_NEWLINE$1 = CONST.WRAPPED_NEWLINE;
    const NO_WRAP$1 = CONST.NO_WRAP;
    const WORD_WRAP = CONST.WORD_WRAP;
    const CHAR_WRAP = CONST.CHAR_WRAP;
    const splitRegExp = CONST.SPLITREGEXP;

    var WrapText = function (text, context, wrapMode, wrapWidth, offset, wrapTextLinesPool) {
        if (wrapWidth <= 0) {
            wrapMode = NO_WRAP$1;
        }

        var retLines = [];
        if (!text || !text.length) {
            return retLines;
        }

        var isNoWrap = (wrapMode === NO_WRAP$1);

        var lines = text.split(splitRegExp),
            line, remainWidth, newLineMode;
        for (var i = 0, linesLen = lines.length; i < linesLen; i++) {
            line = lines[i];
            newLineMode = (i === (linesLen - 1)) ? NO_NEWLINE$1 : RAW_NEWLINE;

            if (isNoWrap) {
                var textWidth = context.measureText(line).width;
                retLines.push(wrapTextLinesPool.getLine(line, textWidth, newLineMode));
                continue;
            }

            remainWidth = (i === 0) ? (wrapWidth - offset) : wrapWidth;

            // Short string testing
            if (line.length <= 100) {
                var textWidth = context.measureText(line).width;
                if (textWidth <= remainWidth) {
                    retLines.push(wrapTextLinesPool.getLine(line, textWidth, newLineMode));
                    continue;
                }
            }

            var tokenArray = ParseLine(line, wrapMode);
            var token, tokenWidth;
            var lineText = '', lineWidth = 0;
            var currLineWidth;
            for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
                token = tokenArray[j];
                tokenWidth = context.measureText(token).width;

                // Text width of single token is larger than a line width
                if ((tokenWidth > wrapWidth) && IsWord(token)) {
                    if (lineText !== '') {
                        // Has pending lineText, flush it out
                        retLines.push(wrapTextLinesPool.getLine(lineText, lineWidth, WRAPPED_NEWLINE$1));

                    } else if ((j === 0) && (offset > 0)) {
                        // No pending lineText, but has previous text. Append a newline
                        retLines.push(wrapTextLinesPool.getLine('', 0, WRAPPED_NEWLINE$1));

                    }

                    // Word break
                    retLines.push(...WrapText(token, context, CHAR_WRAP, wrapWidth, 0, wrapTextLinesPool));
                    // Continue at last-wordBreak-line
                    var lastwordBreakLine = retLines.pop();
                    lineText = lastwordBreakLine.text;
                    lineWidth = lastwordBreakLine.width;
                    // Free this line
                    wrapTextLinesPool.freeLine(lastwordBreakLine);

                    // Special case : Start at a space character, discard it
                    if (lineText === ' ') {
                        lineText = '';
                        lineWidth = 0;
                    }
                    continue;
                }

                currLineWidth = lineWidth + tokenWidth;
                if (currLineWidth > remainWidth) {
                    // New line
                    retLines.push(wrapTextLinesPool.getLine(lineText, lineWidth, WRAPPED_NEWLINE$1));
                    lineText = token;
                    lineWidth = tokenWidth;
                    remainWidth = wrapWidth;

                } else {
                    // Append token, continue
                    lineText += token;
                    lineWidth = currLineWidth;
                }

                if (j === (tokenLen - 1)) {
                    // Flush remain text
                    retLines.push(wrapTextLinesPool.getLine(lineText, lineWidth, newLineMode));
                }
            } // for token in tokenArray

        } // for each line in lines

        return retLines;
    };

    var ParseLine = function (s, mode) {
        var tokens;

        switch (mode) {
            case WORD_WRAP:
                tokens = [];
                s = s.split(' ');
                for (var i = 0, icnt = s.length; i < icnt; i++) {
                    var token = s[i];
                    if (i < (icnt - 1)) {
                        tokens.push(token + ' ');
                    } else { // The last token
                        if (token !== '') {
                            tokens.push(token);
                        }
                    }
                }
                break;

            case CHAR_WRAP:
                tokens = s.split('');
                break;

            default: // MIX_WRAP
                tokens = [];
                s = s.split(' ');
                for (var i = 0, icnt = s.length; i < icnt; i++) {
                    var token = s[i];
                    if (i < (icnt - 1)) {
                        if (IsASCIIString(token)) {
                            tokens.push(token + ' ');
                        } else {
                            tokens.push(...token.split(''));
                            // Add space as last token
                            tokens.push(' ');
                        }
                    } else { // The last token
                        if (token !== '') {
                            if (IsASCIIString(token)) {
                                tokens.push(token);
                            } else {
                                tokens.push(...token.split(''));
                            }
                        }
                    }

                }
                break;
        }

        return tokens;
    };

    var IsWord = function (s) {
        switch (s.length) {
            case 1: return false;
            case 2: return (s.charAt(1) !== ' ');
            default: return true;
        }
    };

    const GetValue$3 = Phaser.Utils.Objects.GetValue;
    const NO_WRAP = CONST.NO_WRAP;
    const NO_NEWLINE = CONST.NO_NEWLINE;
    const WRAPPED_NEWLINE = CONST.WRAPPED_NEWLINE;

    class CanvasText {
        constructor(config) {
            this.parent = config.parent;
            this.scene = this.parent.scene;
            this.context = GetValue$3(config, 'context', null);
            this.canvas = this.context.canvas;
            this.parser = GetValue$3(config, 'parser', null);
            this.defaultStyle = GetValue$3(config, 'style', null);
            this.autoRound = true;

            this.pensPool = config.pensPool;                     // Required
            this.linesPool = config.linesPool;                   // Required
            this.wrapTextLinesPool = config.wrapTextLinesPool;   // Required

            this.penManager = this.newPenManager();
            this._tmpPenManager = null;

            this.hitAreaManager = new HitAreaManager();
            this.lastHitAreaKey = null;
            this.urlTagCursorStyle = null;
        }

        destroy() {
            this.parent = undefined;
            this.scene = undefined;
            this.context = undefined;
            this.canvas = undefined;
            this.parser = undefined;
            this.defaultStyle = undefined;

            if (this.penManager) {
                this.penManager.destroy();
                this.penManager = undefined;
            }
            if (this._tmpPenManager) {
                this._tmpPenManager.destroy();
                this._tmpPenManager = undefined;
            }
            if (this.hitAreaManager) {
                this.hitAreaManager.destroy();
                this.hitAreaManager = undefined;
            }

            this.pensPool = undefined;
            this.linesPool = undefined;
            this.wrapTextLinesPool = undefined;
        }

        updatePenManager(text, wrapMode, wrapWidth, lineHeight, penManager) {
            if (penManager === undefined) {
                penManager = this.penManager;
            }
            penManager.clear();
            if (text === "") {
                return penManager;
            }

            var textStyle = this.parent.style;
            if (textStyle.isWrapFitMode) {
                var padding = this.parent.padding;
                wrapWidth = textStyle.fixedWidth - padding.left - padding.right;
            }

            var canvas = this.canvas;
            var context = this.context;

            var cursorX = 0,
                cursorY = 0;

            var customTextWrapCallback = textStyle.wrapCallback,
                customTextWrapCallbackScope = textStyle.wrapCallbackScope;
            var reuseLines = true;

            var plainText, curProp, curStyle;
            var match = this.parser.splitText(text),
                result, wrapLines,
                wrapTextLinesPool = this.wrapTextLinesPool;
            for (var i = 0, len = match.length; i < len; i++) {
                result = this.parser.tagTextToProp(match[i], curProp);
                plainText = result.plainText;
                curProp = result.prop;

                if (curProp.img) { // Image tag                
                    var imgWidth = this.imageManager.getOuterWidth(curProp.img);
                    if ((wrapWidth > 0) && (wrapMode !== NO_WRAP)) {  // Wrap mode
                        if (wrapWidth < (cursorX + imgWidth)) {
                            penManager.addNewLinePen();
                            cursorY += lineHeight;
                            cursorX = 0;
                        }
                    }
                    penManager.addImagePen(cursorX, cursorY, imgWidth, Clone(curProp));
                    cursorX += imgWidth;

                } else if (plainText !== '') {
                    // wrap text to lines
                    // Save the current context.
                    context.save();
                    curStyle = this.parser.propToContextStyle(this.defaultStyle, curProp);
                    curStyle.buildFont();
                    curStyle.syncFont(canvas, context);
                    curStyle.syncStyle(canvas, context);

                    if (!customTextWrapCallback) {
                        wrapLines = WrapText(
                            plainText,
                            context,
                            wrapMode, wrapWidth,
                            cursorX,
                            wrapTextLinesPool
                        );

                    } else { // customTextWrapCallback
                        wrapLines = customTextWrapCallback.call(customTextWrapCallbackScope,
                            plainText,
                            context,
                            wrapWidth,
                            cursorX
                        );

                        if (typeof (wrapLines) === 'string') {
                            wrapLines = wrapLines.split('\n');
                        }

                        var segment;
                        for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                            segment = wrapLines[j];
                            if (typeof (segment) === 'string') {
                                wrapLines[j] = wrapTextLinesPool.getLine(
                                    segment,
                                    context.measureText(segment).width,
                                    (j < (jLen - 1)) ? WRAPPED_NEWLINE : NO_NEWLINE
                                );
                            } else {
                                reuseLines = false;
                            }
                        }
                    }  // customTextWrapCallback

                    // add pens
                    var segment;
                    for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                        segment = wrapLines[j];
                        penManager.addTextPen(
                            segment.text,
                            cursorX, cursorY,
                            segment.width,
                            Clone(curProp),
                            segment.newLineMode
                        );

                        if (segment.newLineMode !== NO_NEWLINE) {
                            cursorX = 0;
                            cursorY += lineHeight;
                        } else {
                            cursorX += segment.width;
                        }

                    }

                    if (reuseLines) {
                        wrapTextLinesPool.freeLines(wrapLines);
                    }
                    wrapLines = null;

                    context.restore();

                }

            }

            // Add strokeThinkness to last pen of each line
            for (var i = 0, len = this.lines.length; i < len; i++) {
                var line = this.lines[i];
                var lastPen = line[line.length - 1];
                if (lastPen) {
                    lastPen.width += this.parser.getStrokeThinkness(this.defaultStyle, lastPen.prop);
                }
            }

            return penManager;
        }

        get startXOffset() {
            return this.defaultStyle.xOffset;
        }

        get startYOffset() {
            return this.defaultStyle.metrics.ascent;
        }

        get lines() {
            return this.penManager.lines;
        }

        get displayLinesCount() {
            var linesCount = this.penManager.linesCount,
                maxLines = this.defaultStyle.maxLines;
            if ((maxLines > 0) && (linesCount > maxLines)) {
                linesCount = maxLines;
            }
            return linesCount;
        }

        get linesWidth() {
            return Math.ceil(this.penManager.getMaxLineWidth());
        }

        get linesHeight() {
            var linesCount = this.displayLinesCount;
            var linesHeight = (this.defaultStyle.lineHeight * linesCount);
            if (linesCount > 0) {
                linesHeight -= this.defaultStyle.lineSpacing;
            }
            return linesHeight;
        }

        get imageManager() {
            return this.parent.imageManager;
        }

        get rtl() {
            return this.parent.style.rtl;
        }

        newPenManager() {
            return new PenManager({
                pensPool: this.pensPool,
                linesPool: this.linesPool,
                tagToText: this.parser.propToTagText,
                tagToTextScope: this.parser
            });
        }

        get tmpPenManager() {
            if (this._tmpPenManager === null) {
                this._tmpPenManager = this.newPenManager();
            }
            return this._tmpPenManager;
        }

        getPlainText(text, start, end) {
            var plainText;
            if (text == null) {
                plainText = this.penManager.plainText;
            } else {
                var match = this.parser.splitText(text, 1); // PLAINTEXTONLY_MODE
                plainText = "";
                for (var i = 0, len = match.length; i < len; i++) {
                    plainText += match[i];
                }
            }

            if ((start != null) || (end != null)) {
                if (start == null) {
                    start = 0;
                }
                if (end == null) {
                    end = plainText.length;
                }
                plainText = plainText.substring(start, end);
            }

            return plainText;
        }

        getPenManager(text, retPenManager) {
            if (text === undefined) {
                return this.copyPenManager(retPenManager, this.penManager);
            }

            if (retPenManager === undefined) {
                retPenManager = this.newPenManager();
            }

            var defaultStyle = this.defaultStyle;
            this.updatePenManager(
                text,
                defaultStyle.wrapMode,
                defaultStyle.wrapWidth,
                defaultStyle.lineHeight,
                retPenManager
            );
            return retPenManager;
        }

        getText(text, start, end, wrap) {
            if (text == null) {
                return this.penManager.getSliceTagText(start, end, wrap);
            }

            var penManager = this.tmpPenManager;
            var defaultStyle = this.defaultStyle;
            this.updatePenManager(
                text,
                defaultStyle.wrapMode,
                defaultStyle.wrapWidth,
                defaultStyle.lineHeight,
                penManager
            );

            return penManager.getSliceTagText(start, end, wrap);
        }

        copyPenManager(ret, src) {
            if (src === undefined) {
                src = this.penManager;
            }
            return src.copy(ret);
        }

        getTextWidth(penManager) {
            if (penManager === undefined) {
                penManager = this.penManager;
            }

            return penManager.getMaxLineWidth();
        }

        getLastPen(penManager) {
            if (penManager === undefined) {
                penManager = this.penManager;
            }

            return penManager.lastPen;
        }
    }
    var methods$3 = {
        setInteractive: SetInteractive,
    };

    Object.assign(
        CanvasText.prototype,
        DrawMethods,
        methods$3
    );

    class WrapTextLinesPool extends Stack {
        freeLine(line) {
            if (!line) {
                return;
            }
            this.push(line);
            return this;
        }

        freeLines(lines) {
            if (!lines) {
                return;
            }
            this.pushMultiple(lines);
            return this;
        }

        getLine(text, width, newLineMode) {
            var l = this.pop();
            if (l === null) {
                l = {};
            }
            l.text = text;
            l.width = width;
            l.newLineMode = newLineMode;
            return l;
        }

    }

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    var AddImage = function (key, config) {
        if (IsPlainObject$1(key)) {
            config = key;
            key = config.key;
        } else if (config === undefined) {
            config = {
                key: key
            };
        }

        if (!config.hasOwnProperty('key')) {
            config.key = key;
        }

        var textureKey = config.key, frameKey = config.frame;
        var width = config.width, height = config.height;

        if ((width === undefined) || (height === undefined)) {
            var frame = this.textureManager.getFrame(textureKey, frameKey);
            var frameWidth = (frame) ? frame.cutWidth : 0;
            var frameHeight = (frame) ? frame.cutHeight : 0;
            if ((width === undefined) && (height === undefined)) {
                width = frameWidth;
                height = frameHeight;
            } else if (width === undefined) {
                width = frameWidth * (height / frameHeight);
            } else if (height === undefined) {
                height = frameHeight * (width / frameWidth);
            }
        }

        this.images[key] = {
            key: textureKey,
            frame: frameKey,
            width: width,
            height: height,
            y: GetValue$2(config, 'y', 0),
            left: GetValue$2(config, 'left', 0),
            right: GetValue$2(config, 'right', 0),
            originX: GetValue$2(config, 'originX', 0),
            originY: GetValue$2(config, 'originY', 0),
            tintFill: GetValue$2(config, 'tintFill', false),
        };
    };

    const CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;

    var DrawFrameToCanvas = function (frame, canvas, x, y, width, height, color, autoRound) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = frame.cutWidth; }
        if (height === undefined) { height = frame.cutHeight; }
        if (autoRound === undefined) { autoRound = false; }
        if (autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = canvas.getContext('2d', { willReadFrequently: true });

        if (color) {
            // Draw image at tempCanvas

            // Get tempCanvas
            var tempCanvas = CanvasPool$1.create(null, width, height, Phaser.CANVAS, true);

            var tempContext = tempCanvas.getContext('2d', { willReadFrequently: true });

            tempContext.drawImage(
                frame.source.image,
                frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
                0, 0, width, height
            );

            // Tint-fill
            tempContext.globalCompositeOperation = 'source-in';
            tempContext.fillStyle = color;
            tempContext.fillRect(0, 0, width, height);

            // Draw tempCanvas at context
            context.drawImage(
                tempCanvas,
                0, 0, width, height,
                x, y, width, height
            );

            // Release tempCanvas
            CanvasPool$1.remove(tempCanvas);
        } else {
            context.drawImage(
                frame.source.image,
                frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
                x, y, width, height
            );
        }
    };

    var DrawImage = function (key, context, x, y, color, autoRound) {
        var imgData = this.get(key);
        if (!imgData) {
            // Invalid key
            return;
        }

        var frame = this.textureManager.getFrame(imgData.key, imgData.frame);

        var width = imgData.width,
            height = imgData.height;
        x += imgData.left - (imgData.originX * width);
        y += imgData.y - (imgData.originY * height);

        if (!imgData.tintFill) {
            color = undefined;
        }

        DrawFrameToCanvas(
            frame, context.canvas,
            x, y, width, height,
            color, autoRound
        );
    };

    class ImageManager {
        constructor(scene) {
            this.textureManager = scene.sys.textures;
            this.images = {};
        }

        destroy() {
            this.textureManager = undefined;
            this.images = undefined;
        }

        add(key, config) {
            if (typeof (key) === 'string') {
                AddImage.call(this, key, config);
            } else if (Array.isArray(key)) {
                var data = key;
                for (var i = 0, cnt = data.length; i < cnt; i++) {
                    AddImage.call(this, data[i]);
                }
            } else {
                var data = key;
                for (var key in data) {
                    AddImage.call(this, key, data[key]);
                }
            }
            return this;
        }

        has(key) {
            return this.images.hasOwnProperty(key);
        }

        remove(key) {
            if (this.has(key)) {
                delete this.images[key];
            }
            return this;
        }

        get(key) {
            if (!this.has(key)) {
                if (this.textureManager.exists(key)) {
                    this.add(key);
                }
            }
            return this.images[key];
        }

        getOuterWidth(key) {
            var data = this.get(key);
            return (data) ? (data.width + data.left + data.right) : 0;
        }

        getFrame(key) {
            var data = this.get(key);
            return (data) ? this.textureManager.getFrame(data.key, data.frame) : undefined;
        }

        hasTexture(key) {
            return !!this.getFrame(key);
        }
    }

    var methods$2 = {
        draw: DrawImage
    };

    Object.assign(
        ImageManager.prototype,
        methods$2
    );

    var CopyCanvasToTexture = function (scene, srcCanvas, key, x, y, width, height) {
        var textures = scene.sys.textures;
        var renderer = scene.renderer;

        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = srcCanvas.width;
        }
        if (height === undefined) {
            height = srcCanvas.height;
        }

        var texture;
        if (textures.exists(key)) {
            texture = textures.get(key);
        } else {
            texture = textures.createCanvas(key, width, height);
        }

        var destCanvas = texture.getSourceImage();
        if (destCanvas.width !== width) {
            destCanvas.width = width;
        }
        if (destCanvas.height !== height) {
            destCanvas.height = height;
        }

        var destCtx = destCanvas.getContext('2d', { willReadFrequently: true });
        destCtx.clearRect(0, 0, width, height);
        destCtx.drawImage(srcCanvas, x, y, width, height);
        if (renderer.gl && texture) {
            renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
        }
    };

    var AppendText = function (value, addCR) {
        if (!value && value !== 0) {
            value = '';
        }

        if (addCR === undefined) {
            addCR = true;
        }

        if (Array.isArray(value)) {
            value = value.join('\n');
        }

        var newText;
        if (addCR) {
            newText = `${this.text}\n${value}`;
        } else {
            newText = `${this.text}${value}`;
        }

        if (newText != this.text) {
            this.setText(newText);
        }

        return this;
    };

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const AddToDOM = Phaser.DOM.AddToDOM;
    const CanvasPool = Phaser.Display.Canvas.CanvasPool;
    const GameObject = Phaser.GameObjects.GameObject;
    const GetValue$1 = Phaser.Utils.Objects.GetValue;
    const RemoveFromDOM = Phaser.DOM.RemoveFromDOM;
    const SPLITREGEXP = CONST.SPLITREGEXP;
    const UUID = Phaser.Utils.String.UUID;

    // Reuse objects can increase performance
    var SharedPensPools = null;
    var SharedLinesPool = null;
    var SharedWrapTextLinesPool = null;

    class Text extends TextBase {
        constructor(scene, x, y, text, style, type, parser) {
            if (IsPlainObject(x)) {
                var config = x;
                x = GetValue$1(config, 'x', 0);
                y = GetValue$1(config, 'y', 0);
                text = GetValue$1(config, 'text', '');
                style = GetValue$1(config, 'style');
            }
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }

            super(scene, type);

            this.renderer = scene.sys.game.renderer;

            this.setPosition(x, y);
            this.setOrigin(0, 0);
            this.initPipeline();
            this.initPostPipeline(true);

            this.canvas = CanvasPool.create(this);

            this.context = this.canvas.getContext('2d', { willReadFrequently: true });

            this._imageManager = undefined;

            if (style) {
                // Override align
                if (style.hasOwnProperty('align')) {
                    var halign = style.align;
                    delete style.align;
                    style.halign = halign;
                }
                // Has Stroke color but stroke thinkness, set stroke thinkness to 1
                if (style.hasOwnProperty('stroke') && !style.hasOwnProperty('strokeThickness')) {
                    style.strokeThickness = 1;
                }
            }
            this.style = new TextStyle(this, style);

            var imageData = GetValue$1(style, 'images', undefined);
            if (imageData) {
                this.addImage(imageData);
            }

            this.autoRound = true;

            this._text = undefined;

            this.padding = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };

            this.width = 1;

            this.height = 1;

            this.dirty = false;

            //  If resolution wasn't set, force it to 1
            if (this.style.resolution === 0) {
                this.style.resolution = 1;
            }

            this._crop = this.resetCropObject();

            //  Create a Texture for this Text object
            this._textureKey = UUID();

            this.texture = scene.sys.textures.addCanvas(this._textureKey, this.canvas);

            //  Get the frame
            this.frame = this.texture.get();

            //  Set the resolution
            this.frame.source.resolution = this.style.resolution;

            if (this.renderer && this.renderer.gl) {
                //  Clear the default 1x1 glTexture, as we override it later
                this.renderer.deleteTexture(this.frame.source.glTexture);
                this.frame.source.glTexture = null;
            }

            var sharedPoolMode = GetValue$1(style, 'sharedPool', true);

            var pensPool, linesPool, wrapTextLinesPool;
            if (sharedPoolMode) {
                // Use pools first time
                if (!SharedPensPools) {
                    SharedPensPools = {};
                    SharedLinesPool = new Stack();
                    SharedWrapTextLinesPool = new WrapTextLinesPool();

                    // Remove cached data
                    this.scene.game.events.once('destroy', function () {
                        SharedPensPools = null;
                        SharedLinesPool = null;
                        SharedWrapTextLinesPool = null;
                    });
                }
                if (!SharedPensPools.hasOwnProperty(type)) {
                    SharedPensPools[type] = new Stack();
                }

                pensPool = SharedPensPools[type];
                linesPool = SharedLinesPool;
                wrapTextLinesPool = SharedWrapTextLinesPool;
            } else {
                pensPool = new Stack();
                linesPool = new Stack();
                wrapTextLinesPool = new WrapTextLinesPool();
            }

            this.canvasText = new CanvasText({
                parent: this,
                context: this.context,
                parser: parser,
                style: this.style,
                pensPool: pensPool,
                linesPool: linesPool,
                wrapTextLinesPool: wrapTextLinesPool,
            });
            this.parser = parser;

            this.initRTL();

            if (style && style.padding) {
                this.setPadding(style.padding);
            }

            this.setText(text);

            this.setUrlTagCursorStyle(GetValue$1(style, 'urlTagCursorStyle', 'pointer'));

            if (GetValue$1(style, 'interactive', false)) {
                this.setInteractive();
            }
        }

        preDestroy() {
            RemoveFromDOM(this.canvas);
            // Do nothing if canvas did not add to parent node before

            this.canvasText.destroy();
            this.canvasText = undefined;

            if (this._imageManager) {
                this._imageManager.destroy();
                this._imageManager = undefined;
            }

            CanvasPool.remove(this.canvas);

            var texture = this.texture;

            if (texture) {
                texture.destroy();
            }
        }

        set text(value) {
            this.setText(value);
        }
        get text() {
            return this._text;
        }

        initRTL() {
            if (!this.style.rtl) {
                return;
            }

            //  Here is where the crazy starts.
            //
            //  Due to browser implementation issues, you cannot fillText BiDi text to a canvas
            //  that is not part of the DOM. It just completely ignores the direction property.

            this.canvas.dir = 'rtl';

            //  Experimental atm, but one day ...
            this.context.direction = 'rtl';

            //  Add it to the DOM, but hidden within the parent canvas.
            this.canvas.style.display = 'none';

            AddToDOM(this.canvas, this.scene.sys.canvas);

            //  And finally we set the x origin
            this.originX = 1;
        }

        setRTL(rtl) {
            if (rtl === undefined) {
                rtl = true;
            }

            var style = this.style;
            if (style.rtl === rtl) {
                return this;
            }

            style.rtl = rtl;

            if (rtl) {
                this.canvas.dir = 'rtl';
                this.context.direction = 'rtl';
                this.canvas.style.display = 'none';
                AddToDOM(this.canvas, this.scene.sys.canvas);
            } else {
                this.canvas.dir = 'ltr';
                this.context.direction = 'ltr';
            }

            if (style.halign === 'left') {
                style.halign = 'right';
            } else if (style.halign === 'right') {
                style.halign = 'left';
            }

            if (this._imageManager) {
                var images = this._imageManager.images;
                for (var key in images) {
                    images[key].originX = 1 - images[key].originX;
                }
            }

            return this;
        }

        setText(value) {
            value = GetString(value);

            if (value === this._text) {
                return this;
            }

            this._text = value;
            this.updateText();

            return this;
        }

        setPadding(left, top, right, bottom) {
            if (typeof left === 'object') {
                var config = left;

                //  If they specify x and/or y this applies to all
                var x = GetValue$1(config, 'x', null);

                if (x !== null) {
                    left = x;
                    right = x;
                } else {
                    left = GetValue$1(config, 'left', 0);
                    right = GetValue$1(config, 'right', left);
                }

                var y = GetValue$1(config, 'y', null);

                if (y !== null) {
                    top = y;
                    bottom = y;
                } else {
                    top = GetValue$1(config, 'top', 0);
                    bottom = GetValue$1(config, 'bottom', top);
                }
            } else {
                if (left === undefined) {
                    left = 0;
                }
                if (top === undefined) {
                    top = left;
                }
                if (right === undefined) {
                    right = left;
                }
                if (bottom === undefined) {
                    bottom = top;
                }
            }

            this.padding.left = left;
            this.padding.top = top;
            this.padding.right = right;
            this.padding.bottom = bottom;

            return this.updateText(false);
        }

        updateText(runWrap) {
            if (runWrap === undefined) {
                runWrap = true;
            }
            var canvasText = this.canvasText;

            // wrap text to pens
            var style = this.style;
            if (runWrap) {
                canvasText.updatePenManager(
                    this._text,
                    style.wrapMode,
                    style.wrapWidth,
                    style.lineHeight
                );
            }

            // resize
            var padding = this.padding;
            var textWidth, textHeight;
            var linesWidth = Math.ceil(canvasText.linesWidth);
            if (style.fixedWidth === 0) {
                this.width = linesWidth + padding.left + padding.right;
                textWidth = linesWidth;
            }
            else {
                this.width = style.fixedWidth;
                textWidth = this.width - padding.left - padding.right;
                if (textWidth < linesWidth) {
                    textWidth = linesWidth;
                }
            }
            if (style.fixedHeight === 0) {
                this.height = canvasText.linesHeight + padding.top + padding.bottom;
                textHeight = canvasText.linesHeight;
            }
            else {
                this.height = style.fixedHeight;
                textHeight = this.height - padding.top - padding.bottom;
                if (textHeight < canvasText.linesHeight) {
                    textHeight = canvasText.linesHeight;
                }
            }

            var w = this.width;
            var h = this.height;

            this.updateDisplayOrigin();

            var resolution = style.resolution;
            w *= resolution;
            h *= resolution;

            w = Math.max(Math.ceil(w), 1);
            h = Math.max(Math.ceil(h), 1);

            var canvas = this.canvas;
            var context = this.context;
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
                this.frame.setSize(w, h);
            } else {
                context.clearRect(0, 0, w, h);
            }

            context.save();
            context.scale(resolution, resolution);

            // draw
            var startX = (!this.style.rtl) ? padding.left : padding.right;
            var startY = padding.top;
            canvasText.draw(
                startX,
                startY,
                textWidth,
                textHeight,
            );

            context.restore();

            if (this.renderer && this.renderer.gl) {
                this.frame.source.glTexture = this.renderer.canvasToTexture(canvas, this.frame.source.glTexture, true);
                if (typeof WEBGL_DEBUG) {
                    this.frame.glTexture.spectorMetadata = { textureKey: 'BBCodeText Game Object' };
                }
            }

            this.dirty = true;

            var input = this.input;

            if (input && !input.customHitArea) {
                input.hitArea.width = this.width;
                input.hitArea.height = this.height;
            }

            return this;
        }

        toJSON() {
            var out = Components.ToJSON(this);

            //  Extra Text data is added here

            var data = {
                autoRound: this.autoRound,
                text: this._text,
                style: this.style.toJSON(),
                resolution: this.resolution,
                padding: {
                    left: this.padding.left,
                    right: this.padding.right,
                    top: this.padding.top,
                    bottom: this.padding.bottom
                }
            };

            out.data = data;

            return out;
        }

        setInteractive(hitArea, hitAreaCallback, dropZone) {
            var isInteractived = !!this.input;

            GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

            if (!isInteractived) {
                this.canvasText.setInteractive();
            }

            return this;
        }

        setUrlTagCursorStyle(cursor) {
            this.urlTagCursorStyle = cursor;
            return this;
        }

        get urlTagCursorStyle() {
            return this.canvasText.urlTagCursorStyle;
        }

        set urlTagCursorStyle(value) {
            this.canvasText.urlTagCursorStyle = value;
        }

        getWrappedText(text, start, end) {
            if (typeof (text) === 'number') {
                end = start;
                start = text;
                text = undefined;
            }
            text = this.canvasText.getText(text, start, end, true);
            return text.split(SPLITREGEXP);
        }

        getPlainText(text, start, end) {
            if (typeof (text) === 'number') {
                end = start;
                start = text;
                text = undefined;
            }
            return this.canvasText.getPlainText(text, start, end);
        }

        getText(text, start, end, wrap) {
            if (typeof (text) === 'number') {
                wrap = end;
                end = start;
                start = text;
                text = undefined;
            }
            if (wrap === undefined) {
                wrap = false;
            }
            return this.canvasText.getText(text, start, end, wrap);
        }

        getSubString(text, start, end) {
            if (typeof (text) === 'number') {
                end = start;
                start = text;
                text = undefined;
            }
            return this.getText(text, start, end);
        }

        copyPenManager(penManager) {
            return this.canvasText.copyPenManager(penManager);
        }

        getPenManager(text, penManager) {
            return this.canvasText.getPenManager(text, penManager);
        }

        setSize(width, height) {
            return this.setFixedSize(width, height);
        }

        resize(width, height) {
            return this.setFixedSize(width, height);
        }

        get imageManager() {
            if (!this._imageManager) {
                this._imageManager = new ImageManager(this.scene);
            }
            return this._imageManager;
        }

        addImage(key, config) {
            this.imageManager.add(key, config);
            return this;
        }

        drawAreaBounds(graphics, color) {
            this.canvasText.hitAreaManager.drawBounds(graphics, color, this);
            return this;
        }

        generateTexture(key, x, y, width, height) {
            var srcCanvas = this.canvas;
            if (width === undefined) {
                width = srcCanvas.width;
            } else {
                width *= this.resolution;
            }
            if (height === undefined) {
                height = srcCanvas.height;
            } else {
                height *= this.resolution;
            }

            CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);
            return this;
        }
    }

    var methods$1 = {
        appendText: AppendText,
    };

    Object.assign(
        Text.prototype,
        methods$1
    );

    var SplitText = function (text, mode) {
        var TagRegex = this.tagRegex;

        var result = [];
        var charIdx = 0;
        var rawMode = false,
            escMode = false;
        while (true) {
            var regexResult = TagRegex.RE_SPLITTEXT.exec(text);
            if (!regexResult) {
                break;
            }

            var match = regexResult[0];
            if (escMode) {
                if (TagRegex.RE_ESC_CLOSE.test(match)) {
                    escMode = false;
                } else {
                    continue; // Skip other tags
                }

            } else if (rawMode) {
                if (TagRegex.RE_RAW_CLOSE.test(match)) {
                    rawMode = false;
                } else {
                    continue; // Skip other tags
                }

            } else {
                if (TagRegex.RE_ESC_OPEN.test(match)) {
                    escMode = true;
                } else if (TagRegex.RE_RAW_OPEN.test(match)) {
                    rawMode = true;
                }
            }

            var matchEnd = TagRegex.RE_SPLITTEXT.lastIndex;
            var matchStart = matchEnd - match.length;

            if (charIdx < matchStart) {
                var content = text.substring(charIdx, matchStart);
                result.push(content);
            }

            if (mode === undefined) {
                result.push(match);
            }

            charIdx = matchEnd;
        }

        var totalLen = text.length;
        if (charIdx < totalLen) { // Push remainder string
            result.push(text.substring(charIdx, totalLen));
        }

        return result; // [text,...]
    };

    const PROP_REMOVE = false;
    const PROP_ADD = true;

    var GETPROP_RESULT = {
        plainText: null,
        prevProp: null
    };

    var TagTextToProp = function (text, prevProp) {
        var TagRegex = this.tagRegex;

        // text : result of splitText()
        if (prevProp == null) {
            prevProp = {};
        }
        var plainText = '';

        // close image tag
        if (prevProp.img) {
            UpdateProp(prevProp, PROP_REMOVE, 'img');
        }

        if (prevProp.esc) {
            if (TagRegex.RE_ESC_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'esc');
            } else {
                plainText = text;
            }

        } else if (prevProp.raw) {
            if (TagRegex.RE_RAW_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'raw');
            } else {
                plainText = text;
            }

        } else {
            if (TagRegex.RE_ESC_OPEN.test(text)) {
                UpdateProp(prevProp, PROP_ADD, 'esc', true);
            } else if (TagRegex.RE_ESC_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'esc');

            } else if (TagRegex.RE_RAW_OPEN.test(text)) {
                UpdateProp(prevProp, PROP_ADD, 'raw', true);
            } else if (TagRegex.RE_RAW_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'raw');

            } else if (TagRegex.RE_BLOD_OPEN.test(text)) {
                UpdateProp(prevProp, PROP_ADD, 'b', true);
            } else if (TagRegex.RE_BLOD_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'b');

            } else if (TagRegex.RE_ITALICS_OPEN.test(text)) {
                UpdateProp(prevProp, PROP_ADD, 'i', true);
            } else if (TagRegex.RE_ITALICS_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'i');

            } else if (TagRegex.RE_WEIGHT_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_WEIGHT_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'weight', innerMatch[1]);
            } else if (TagRegex.RE_WEIGHT_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'weight');

            } else if (TagRegex.RE_SIZE_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_SIZE_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'size', `${innerMatch[1]}px`);
            } else if (TagRegex.RE_SIZE_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'size');

            } else if (TagRegex.RE_FAMILY_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_FAMILY_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'family', innerMatch[1]);
            } else if (TagRegex.RE_FAMILY_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'family');

            } else if (TagRegex.RE_COLOR_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_COLOR_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'color', innerMatch[1]);
            } else if (TagRegex.RE_COLOR_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'color');

            } else if (TagRegex.RE_UNDERLINE_OPEN.test(text)) {
                UpdateProp(prevProp, PROP_ADD, 'u', true);
            } else if (TagRegex.RE_UNDERLINE_OPENC.test(text)) {
                var innerMatch = text.match(TagRegex.RE_UNDERLINE_OPENC);
                UpdateProp(prevProp, PROP_ADD, 'u', innerMatch[1]);
            } else if (TagRegex.RE_UNDERLINE_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'u');

            } else if (TagRegex.RE_STRIKETHROUGH_OPEN.test(text)) {
                UpdateProp(prevProp, PROP_ADD, 's', true);
            } else if (TagRegex.RE_STRIKETHROUGH_OPENC.test(text)) {
                var innerMatch = text.match(TagRegex.RE_STRIKETHROUGH_OPENC);
                UpdateProp(prevProp, PROP_ADD, 's', innerMatch[1]);
            } else if (TagRegex.RE_STRIKETHROUGH_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 's');

            } else if (TagRegex.RE_SHADOW_OPEN.test(text)) {
                UpdateProp(prevProp, PROP_ADD, 'shadow', true);
            } else if (TagRegex.RE_SHADOW_OPENC.test(text)) {
                var innerMatch = text.match(TagRegex.RE_SHADOW_OPENC);
                UpdateProp(prevProp, PROP_ADD, 'shadow', innerMatch[1]);
            } else if (TagRegex.RE_SHADOW_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'shadow');

            } else if (TagRegex.RE_STROKE_OPEN.test(text)) {
                UpdateProp(prevProp, PROP_ADD, 'stroke', true);
            } else if (TagRegex.RE_STROKE_OPENC.test(text)) {
                var innerMatch = text.match(TagRegex.RE_STROKE_OPENC);
                UpdateProp(prevProp, PROP_ADD, 'stroke', innerMatch[1]);
            } else if (TagRegex.RE_STROKE_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'stroke');

            } else if (TagRegex.RE_BGCOLOR_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_BGCOLOR_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'bgcolor', innerMatch[1]);
            } else if (TagRegex.RE_BGCOLOR_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'bgcolor');

            } else if (TagRegex.RE_OFFSETY_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_OFFSETY_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'y', parseFloat(innerMatch[1]));
            } else if (TagRegex.RE_OFFSETY_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'y');

            } else if (TagRegex.RE_IMAGE_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_IMAGE_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'img', innerMatch[1]);
            } else if (TagRegex.RE_IMAGE_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'img');

            } else if (TagRegex.RE_AREA_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_AREA_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'area', innerMatch[1]);
            } else if (TagRegex.RE_AREA_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'area');

            } else if (TagRegex.RE_URL_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_URL_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'url', innerMatch[1]);
            } else if (TagRegex.RE_URL_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'url');

            } else if (TagRegex.RE_ALIGN_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_ALIGN_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'align', innerMatch[1]);
            } else if (TagRegex.RE_ALIGN_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'align');

            } else if (TagRegex.RE_ID_OPEN.test(text)) {
                var innerMatch = text.match(TagRegex.RE_ID_OPEN);
                UpdateProp(prevProp, PROP_ADD, 'id', innerMatch[1]);
            } else if (TagRegex.RE_ID_CLOSE.test(text)) {
                UpdateProp(prevProp, PROP_REMOVE, 'id');

            } else {
                plainText = text;
            }
        }

        var result = GETPROP_RESULT;
        result.plainText = plainText;
        result.prop = prevProp;
        return result;
    };

    var UpdateProp = function (prop, op, key, value) {
        if (op === PROP_ADD) {
            // PROP_ADD     
            prop[key] = value;
        } else {
            // PROP_REMOVE        
            if (prop.hasOwnProperty(key)) {
                delete prop[key];
            }
        }

        return prop;
    };

    var PropToContextStyle = function (defaultStyle, prop) {
        var result = STYLE_RESULT;
        if (!prop.hasOwnProperty('img')) {
            result.image = null;

            if (prop.hasOwnProperty('family')) {
                result.fontFamily = prop.family;
            } else {
                result.fontFamily = defaultStyle.fontFamily;
            }

            if (prop.hasOwnProperty('size')) {
                var size = prop.size;
                if (typeof (size) === 'number') {
                    size = `${size}px`;
                }
                result.fontSize = size;
            } else {
                result.fontSize = defaultStyle.fontSize;
            }
            result.fontStyle = GetFontStyle(prop);

            if (prop.hasOwnProperty('color')) {
                result.color = prop.color;
            } else {
                result.color = defaultStyle.color;
            }

            if (prop.hasOwnProperty('stroke')) {
                if (prop.stroke === true) {
                    result.stroke = defaultStyle.stroke;
                    result.strokeThickness = defaultStyle.strokeThickness;
                } else {
                    result.stroke = prop.stroke;
                    result.strokeThickness = defaultStyle.strokeThickness;
                }
            } else {
                result.stroke = defaultStyle.stroke;
                result.strokeThickness = 0;
            }
        } else {
            result.image = prop.img;
        }

        if (prop.hasOwnProperty('shadow')) {
            if (prop.shadow === true) {
                result.shadowColor = defaultStyle.shadowColor;
                result.shadowOffsetX = defaultStyle.shadowOffsetX;
                result.shadowOffsetY = defaultStyle.shadowOffsetY;
                result.shadowBlur = defaultStyle.shadowBlur;
                result.shadowStroke = true;
                result.shadowFill = true;
            } else {
                result.shadowColor = prop.shadow;
                result.shadowOffsetX = defaultStyle.shadowOffsetX;
                result.shadowOffsetY = defaultStyle.shadowOffsetY;
                result.shadowBlur = defaultStyle.shadowBlur;
                result.shadowStroke = true;
                result.shadowFill = true;
            }
        } else {
            result.shadowColor = '#000';
            result.shadowOffsetX = 0;
            result.shadowOffsetY = 0;
            result.shadowBlur = 0;
            result.shadowStroke = false;
            result.shadowFill = false;
        }

        if (prop.hasOwnProperty('u')) {
            if (prop.u === true) {
                result.underlineColor = defaultStyle.underlineColor;
                result.underlineThickness = defaultStyle.underlineThickness;
                result.underlineOffset = defaultStyle.underlineOffset;
            } else {
                result.underlineColor = prop.u;
                result.underlineThickness = defaultStyle.underlineThickness;
                result.underlineOffset = defaultStyle.underlineOffset;
            }
        } else {
            result.underlineColor = '#000';
            result.underlineThickness = 0;
            result.underlineOffset = 0;
        }

        if (prop.hasOwnProperty('s')) {
            if (prop.s === true) {
                result.strikethroughColor = defaultStyle.strikethroughColor;
                result.strikethroughThickness = defaultStyle.strikethroughThickness;
                result.strikethroughOffset = defaultStyle.strikethroughOffset;
            } else {
                result.strikethroughColor = prop.s;
                result.strikethroughThickness = defaultStyle.strikethroughThickness;
                result.strikethroughOffset = defaultStyle.strikethroughOffset;
            }
        } else {
            result.strikethroughColor = '#000';
            result.strikethroughThickness = 0;
            result.strikethroughOffset = 0;
        }

        if (prop.hasOwnProperty('bgcolor')) {
            result.bgcolor = prop.bgcolor;
        } else {
            result.bgcolor = null;
        }

        return result;
    };

    var GetFontStyle = function (prop) {
        var isBold = prop.b;
        var weight = prop.weight;
        var isItalic = prop.i;

        if (isBold || weight || isItalic) {
            if (isItalic) {
                if (isBold) {
                    return 'bold italic';
                } else if (weight) {
                    return `${weight} italic`;
                } else {
                    return 'italic';
                }
            } else {  // !isItalic
                if (isBold) {
                    return 'bold';
                } else {
                    return weight.toString();
                }
            }
        } else {
            return '';
        }
    };


    var STYLE_RESULT = new TextStyle();

    var PropToTagText = function (text, prop, prevProp) {
        if (prevProp == null) {
            prevProp = EMPTYPROP;
        }

        var delimiterLeft = this.delimiters[0];
        var delimiterRight = this.delimiters[1];

        var headers = [];

        for (var k in prevProp) {
            if (!prop.hasOwnProperty(k)) {
                headers.push(`${delimiterLeft}/${k}${delimiterRight}`);
            }
        }

        for (var k in prop) {
            var value = prop[k];


            if (k === 'img') ; else {
                if (prevProp[k] === value) {
                    continue;
                }
            }

            switch (k) {
                case 'size':
                    headers.push(`${delimiterLeft}size=${value.replace('px', '')}${delimiterRight}`);
                    break;

                case 'color':
                case 'weight':
                case 'family':
                case 'stroke':
                case 'bgcolor':
                case 'y':
                case 'img':
                case 'area':
                case 'url':
                case 'align':
                case 'id':
                    headers.push(`${delimiterLeft}${k}=${value}${delimiterRight}`);
                    break;

                case 'u':
                case 's':
                    if (value === true) {
                        headers.push(`${delimiterLeft}${k}${delimiterRight}`);
                    } else {
                        headers.push(`${delimiterLeft}${k}=${value}${delimiterRight}`);
                    }
                    break;

                default:
                    headers.push(`${delimiterLeft}${k}${delimiterRight}`);
                    break;
            }
        }

        headers.push(text);

        return headers.join('');
    };

    var EMPTYPROP = {};

    // https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js

    var EscapeRegex = function (s) {
        return s
            .replace(re0, '\\$&')
            .replace(re1, '\\x2d');
    };

    var re0 = /[|\\{}()[\]^$+*?.]/g;
    var re1 = /-/g;

    var DelimiterLeftSave;
    var DelimiterRightSave;
    var TagRegexSave = {};

    var GetOpenTagRegString = function (delimiterLeft, delimiterRight, tagName, param) {
        if (param === undefined) {
            return `${delimiterLeft}${tagName}${delimiterRight}`;
        } else {
            return `${delimiterLeft}${tagName}=(${param})${delimiterRight}`;
        }
    };
    var GetCloseTagRegString = function (delimiterLeft, delimiterRight, tagName) {
        return `${delimiterLeft}\/${tagName}${delimiterRight}`;
    };

    var GenerateStringRegEx = function (delimiterRight) {
        return `[^${delimiterRight}]+`
    };
    var NUMBER_PARAM = '[-.0-9]+';

    var colorParameterList = [
        '[a-zA-Z]+',      // 'white'
        '#[0-9abcdef]+',  // '#FFFFFF'
        'rgba?\\(\s*[.0-9]+\s*(,\s*[.0-9]+\s*){2,3}\\)',  // rgb(255,255,255), or rgba(255,255,255,1)
    ];
    var COLOR_PARAM = colorParameterList.join('|');  // '[a-z]+|#[0-9abcdef]+'

    var SetDelimiters = function (delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
            var delimeters = delimiterLeft;
            delimiterLeft = delimeters[0];
            delimiterRight = delimeters[1];
        }

        if ((DelimiterLeftSave === delimiterLeft) && (DelimiterRightSave === delimiterRight)) {
            return false;
        }

        DelimiterLeftSave = delimiterLeft;
        DelimiterRightSave = delimiterRight;

        delimiterLeft = EscapeRegex(delimiterLeft);
        delimiterRight = EscapeRegex(delimiterRight);

        var STR_PARAM = GenerateStringRegEx(delimiterRight);

        var ESC = 'esc';
        var ESC_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, ESC);
        var ESC_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, ESC);

        var RAW = 'raw';
        var RAW_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, RAW);
        var RAW_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, RAW);

        var BLOD = 'b';
        var BLOD_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, BLOD);
        var BLOD_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, BLOD);

        var ITALICS = 'i';
        var ITALICS_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, ITALICS);
        var ITALICS_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, ITALICS);

        var WEIGHT = 'weight';
        var WEIGHT_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, WEIGHT, NUMBER_PARAM);
        var WEIGHT_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, WEIGHT);

        var SIZE = 'size';
        var SIZE_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, SIZE, NUMBER_PARAM);
        var SIZE_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, SIZE);

        var FAMILY = 'family';
        var FAMILY_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, FAMILY, STR_PARAM);
        var FAMILY_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, FAMILY);

        var COLOR = 'color';
        var COLOR_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, COLOR, COLOR_PARAM);
        var COLOR_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, COLOR);

        var UNDERLINE = 'u';
        var UNDERLINE_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, UNDERLINE);
        var UNDERLINE_OPENC = GetOpenTagRegString(delimiterLeft, delimiterRight, UNDERLINE, COLOR_PARAM);
        var UNDERLINE_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, UNDERLINE);

        var STRIKETHROUGH = 's';
        var STRIKETHROUGH_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, STRIKETHROUGH);
        var STRIKETHROUGH_OPENC = GetOpenTagRegString(delimiterLeft, delimiterRight, STRIKETHROUGH, COLOR_PARAM);
        var STRIKETHROUGH_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, STRIKETHROUGH);

        var SHADOW = 'shadow';
        var SHADOW_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, SHADOW);
        var SHADOW_OPENC = GetOpenTagRegString(delimiterLeft, delimiterRight, SHADOW, COLOR_PARAM);
        var SHADOW_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, SHADOW);

        var STROKE = 'stroke';
        var STROKE_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, STROKE);
        var STROKE_OPENC = GetOpenTagRegString(delimiterLeft, delimiterRight, STROKE, COLOR_PARAM);
        var STROKE_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, STROKE);

        var BGCOLOR = 'bgcolor';
        var BGCOLOR_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, BGCOLOR, COLOR_PARAM);
        var BGCOLOR_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, BGCOLOR);

        var OFFSETY = 'y';
        var OFFSETY_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, OFFSETY, NUMBER_PARAM);
        var OFFSETY_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, OFFSETY);

        var IMAGE = 'img';
        var IMAGE_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, IMAGE, STR_PARAM);
        var IMAGE_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, IMAGE);

        var AREA = 'area';
        var AREA_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, AREA, STR_PARAM);
        var AREA_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, AREA);

        var URL = 'url';
        var URL_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, URL, STR_PARAM);
        var URL_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, URL);

        var ALIGN = 'align';
        var ALIGN_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, ALIGN, STR_PARAM);
        var ALIGN_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, ALIGN);

        var ID = 'id';
        var ID_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, ID, STR_PARAM);
        var ID_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, ID);

        TagRegexSave.RE_ESC_OPEN = new RegExp(ESC_OPEN, 'i');
        TagRegexSave.RE_ESC_CLOSE = new RegExp(ESC_CLOSE, 'i');

        TagRegexSave.RE_RAW_OPEN = new RegExp(RAW_OPEN, 'i');
        TagRegexSave.RE_RAW_CLOSE = new RegExp(RAW_CLOSE, 'i');

        TagRegexSave.RE_BLOD_OPEN = new RegExp(BLOD_OPEN, 'i');
        TagRegexSave.RE_BLOD_CLOSE = new RegExp(BLOD_CLOSE, 'i');

        TagRegexSave.RE_ITALICS_OPEN = new RegExp(ITALICS_OPEN, 'i');
        TagRegexSave.RE_ITALICS_CLOSE = new RegExp(ITALICS_CLOSE, 'i');

        TagRegexSave.RE_WEIGHT_OPEN = new RegExp(WEIGHT_OPEN, 'i');
        TagRegexSave.RE_WEIGHT_CLOSE = new RegExp(WEIGHT_CLOSE, 'i');

        TagRegexSave.RE_SIZE_OPEN = new RegExp(SIZE_OPEN, 'i');
        TagRegexSave.RE_SIZE_CLOSE = new RegExp(SIZE_CLOSE, 'i');

        TagRegexSave.RE_FAMILY_OPEN = new RegExp(FAMILY_OPEN, 'i');
        TagRegexSave.RE_FAMILY_CLOSE = new RegExp(FAMILY_CLOSE, 'i');

        TagRegexSave.RE_COLOR_OPEN = new RegExp(COLOR_OPEN, 'i');
        TagRegexSave.RE_COLOR_CLOSE = new RegExp(COLOR_CLOSE, 'i');

        TagRegexSave.RE_UNDERLINE_OPEN = new RegExp(UNDERLINE_OPEN, 'i');
        TagRegexSave.RE_UNDERLINE_OPENC = new RegExp(UNDERLINE_OPENC, 'i');
        TagRegexSave.RE_UNDERLINE_CLOSE = new RegExp(UNDERLINE_CLOSE, 'i');

        TagRegexSave.RE_STRIKETHROUGH_OPEN = new RegExp(STRIKETHROUGH_OPEN, 'i');
        TagRegexSave.RE_STRIKETHROUGH_OPENC = new RegExp(STRIKETHROUGH_OPENC, 'i');
        TagRegexSave.RE_STRIKETHROUGH_CLOSE = new RegExp(STRIKETHROUGH_CLOSE, 'i');

        TagRegexSave.RE_SHADOW_OPEN = new RegExp(SHADOW_OPEN, 'i');
        TagRegexSave.RE_SHADOW_OPENC = new RegExp(SHADOW_OPENC, 'i');
        TagRegexSave.RE_SHADOW_CLOSE = new RegExp(SHADOW_CLOSE, 'i');

        TagRegexSave.RE_STROKE_OPEN = new RegExp(STROKE_OPEN, 'i');
        TagRegexSave.RE_STROKE_OPENC = new RegExp(STROKE_OPENC, 'i');
        TagRegexSave.RE_STROKE_CLOSE = new RegExp(STROKE_CLOSE, 'i');

        TagRegexSave.RE_BGCOLOR_OPEN = new RegExp(BGCOLOR_OPEN, 'i');
        TagRegexSave.RE_BGCOLOR_CLOSE = new RegExp(BGCOLOR_CLOSE, 'i');

        TagRegexSave.RE_OFFSETY_OPEN = new RegExp(OFFSETY_OPEN, 'i');
        TagRegexSave.RE_OFFSETY_CLOSE = new RegExp(OFFSETY_CLOSE, 'i');

        TagRegexSave.RE_IMAGE_OPEN = new RegExp(IMAGE_OPEN, 'i');
        TagRegexSave.RE_IMAGE_CLOSE = new RegExp(IMAGE_CLOSE, 'i');

        TagRegexSave.RE_AREA_OPEN = new RegExp(AREA_OPEN, 'i');
        TagRegexSave.RE_AREA_CLOSE = new RegExp(AREA_CLOSE, 'i');

        TagRegexSave.RE_URL_OPEN = new RegExp(URL_OPEN, 'i');
        TagRegexSave.RE_URL_CLOSE = new RegExp(URL_CLOSE, 'i');

        TagRegexSave.RE_ALIGN_OPEN = new RegExp(ALIGN_OPEN, 'i');
        TagRegexSave.RE_ALIGN_CLOSE = new RegExp(ALIGN_CLOSE, 'i');

        TagRegexSave.RE_ID_OPEN = new RegExp(ID_OPEN, 'i');
        TagRegexSave.RE_ID_CLOSE = new RegExp(ID_CLOSE, 'i');

        TagRegexSave.RE_SPLITTEXT = new RegExp([
            RAW_OPEN, RAW_CLOSE,
            ESC_OPEN, ESC_CLOSE,

            BLOD_OPEN, BLOD_CLOSE,
            ITALICS_OPEN, ITALICS_CLOSE,
            WEIGHT_OPEN, WEIGHT_CLOSE,

            SIZE_OPEN, SIZE_CLOSE,
            FAMILY_OPEN, FAMILY_CLOSE,
            COLOR_OPEN, COLOR_CLOSE,
            UNDERLINE_OPEN, UNDERLINE_OPENC, UNDERLINE_CLOSE,
            STRIKETHROUGH_OPEN, STRIKETHROUGH_OPENC, STRIKETHROUGH_CLOSE,
            SHADOW_OPEN, SHADOW_OPENC, SHADOW_CLOSE,
            STROKE_OPEN, STROKE_OPENC, STROKE_CLOSE,
            BGCOLOR_OPEN, BGCOLOR_CLOSE,
            OFFSETY_OPEN, OFFSETY_CLOSE,
            IMAGE_OPEN, IMAGE_CLOSE,
            AREA_OPEN, AREA_CLOSE,
            URL_OPEN, URL_CLOSE,
            ALIGN_OPEN, ALIGN_CLOSE,
            ID_OPEN, ID_CLOSE
        ].join('|'), 'ig');

        return true;
    };

    var GetTagRegex = function (delimiterLeft, delimiterRight) {
        if (delimiterLeft !== undefined) {
            SetDelimiters(delimiterLeft, delimiterRight);
        }

        return Object.assign({}, TagRegexSave);
    };

    const GetValue = Phaser.Utils.Objects.GetValue;

    class Parser {
        constructor(style) {
            var delimiters = GetValue(style, 'delimiters', '[]');
            this.tagRegex = GetTagRegex(delimiters);
            this.delimiters = delimiters;
        }

        getStrokeThinkness(defaultStyle, prop) {
            var strokeThickness;
            if (prop.hasOwnProperty('stroke')) {
                strokeThickness = defaultStyle.strokeThickness;
            } else {
                strokeThickness = 0;
            }
            return strokeThickness;
        }

        setDelimiters(delimiterLeft, delimiterRight) {
            if (SetDelimiters(delimiterLeft, delimiterRight)) {
                this.tagRegex = GetTagRegex();
            }
            return this;
        }

    }

    var methods = {
        splitText: SplitText,
        tagTextToProp: TagTextToProp,
        propToContextStyle: PropToContextStyle,
        propToTagText: PropToTagText,
    };

    Object.assign(
        Parser.prototype,
        methods
    );

    class BBCodeText extends Text {
        constructor(scene, x, y, text, style) {
            var parser = new Parser(style);
            super(scene, x, y, text, style, 'rexBBCodeText', parser);
        }

        setDelimiters(delimiterLeft, delimiterRight) {
            this.parse.setDelimiters(delimiterLeft, delimiterRight);
            return this;
        }
    }

    return BBCodeText;

}));
