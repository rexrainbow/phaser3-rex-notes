import Render from './TextRender.js';
import TextStyle from './TextStyle.js'; // extended
import CanvasTextKlass from './CanvasText.js';
import PoolKlass from '../../pool.js';
import CONST from './const.js';

const AddToDOM = Phaser.DOM.AddToDOM;
const CanvasPool = Phaser.Display.Canvas.CanvasPool;
const Components = Phaser.GameObjects.Components;
const GameObject = Phaser.GameObjects.GameObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveFromDOM = Phaser.DOM.RemoveFromDOM;
const SPLITREGEXP = CONST.SPLITREGEXP;
const Rectangle = Phaser.Geom.Rectangle;

var PensPools = {};
var Text = new Phaser.Class({

    Extends: GameObject,

    Mixins: [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Crop,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.ScrollFactor,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        Render
    ],

    initialize:

        function Text(scene, x, y, text, style, type, parser) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }

            GameObject.call(this, scene, type);

            this.renderer = scene.sys.game.renderer;

            this.setPosition(x, y);
            this.setOrigin(0, 0);
            this.initPipeline();

            this.canvas = CanvasPool.create(this);

            this.context = this.canvas.getContext('2d');

            if (style) {
                // Override align
                if (style.hasOwnProperty('align')) {
                    var halign = style.align;
                    delete style.align;
                    style.halign = halign;
                }
            }
            this.style = new TextStyle(this, style);

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

            //  If resolution wasn't set, then we get it from the game config
            if (this.style.resolution === 0) {
                this.style.resolution = scene.sys.game.config.resolution;
            }

            this._crop = this.resetCropObject();

            //  Create a Texture for this Text object
            this.texture = scene.sys.textures.addCanvas(null, this.canvas, true);

            //  Get the frame
            this.frame = this.texture.get();

            //  Set the resolution
            this.frame.source.resolution = this.style.resolution;

            if (this.renderer && this.renderer.gl) {
                //  Clear the default 1x1 glTexture, as we override it later

                this.renderer.deleteTexture(this.frame.source.glTexture);

                this.frame.source.glTexture = null;
            }

            if (!PensPools.hasOwnProperty(type)) {
                PensPools[type] = new PoolKlass();
            }
            CANVASTEXT_CONFIG.context = this.context;
            CANVASTEXT_CONFIG.parser = parser;
            CANVASTEXT_CONFIG.style = this.style;
            CANVASTEXT_CONFIG.pensPool = PensPools[type];
            this.canvasText = new CanvasTextKlass(CANVASTEXT_CONFIG);

            //this.initRTL();

            if (style && style.padding) {
                this.setPadding(style.padding);
            }

            this.setText(text);

            if (scene.sys.game.config.renderType === Phaser.WEBGL) {
                scene.sys.game.renderer.onContextRestored(function () {
                    this.dirty = true;
                }, this);
            }
        },

    text: {

        set: function (value) {
            this.setText(value);
        },

        get: function () {
            return this._text;
        }

    },

    initRTL: function () {
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
    },

    setText: function (value) {
        if (!value && value !== 0) {
            value = '';
        }

        if (Array.isArray(value)) {
            value = value.join('\n');
        }

        if (value !== this._text) {
            this._text = value.toString();

            this.updateText();
        }

        return this;
    },

    setStyle: function (style) {
        return this.style.setStyle(style);
    },

    setFont: function (font) {
        return this.style.setFont(font);
    },

    setFontFamily: function (family) {
        return this.style.setFontFamily(family);
    },

    setFontSize: function (size) {
        return this.style.setFontSize(size);
    },

    setFontStyle: function (style) {
        return this.style.setFontStyle(style);
    },

    setFixedSize: function (width, height) {
        return this.style.setFixedSize(width, height);
    },

    setBackgroundColor: function (color) {
        return this.style.setBackgroundColor(color);
    },

    setFill: function (color) {
        return this.style.setFill(color);
    },

    setColor: function (color) {
        return this.style.setColor(color);
    },

    setStroke: function (color, thickness) {
        return this.style.setStroke(color, thickness);
    },

    setShadow: function (x, y, color, blur, shadowStroke, shadowFill) {
        return this.style.setShadow(x, y, color, blur, shadowStroke, shadowFill);
    },

    setShadowOffset: function (x, y) {
        return this.style.setShadowOffset(x, y);
    },

    setShadowColor: function (color) {
        return this.style.setShadowColor(color);
    },

    setShadowBlur: function (blur) {
        return this.style.setShadowBlur(blur);
    },

    setShadowStroke: function (enabled) {
        return this.style.setShadowStroke(enabled);
    },

    setShadowFill: function (enabled) {
        return this.style.setShadowFill(enabled);
    },

    setWrapMode: function (mode) {
        return this.style.setWrapMode(mode);
    },

    setWrapWidth: function (width) {
        return this.style.setWrapWidth(width);
    },

    setAlign: function (align) {
        return this.style.setHAlign(align);
    },

    setLineSpacing: function (value) {
        return this.style.setLineSpacing(value);
    },

    setPadding: function (left, top, right, bottom) {
        if (typeof left === 'object') {
            var config = left;

            //  If they specify x and/or y this applies to all
            var x = GetValue(config, 'x', null);

            if (x !== null) {
                left = x;
                right = x;
            } else {
                left = GetValue(config, 'left', 0);
                right = GetValue(config, 'right', left);
            }

            var y = GetValue(config, 'y', null);

            if (y !== null) {
                top = y;
                bottom = y;
            } else {
                top = GetValue(config, 'top', 0);
                bottom = GetValue(config, 'bottom', top);
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
    },

    setResolution: function (value) {
        return this.style.setResolution(value);
    },

    setMaxLines: function (max) {
        return this.style.setMaxLines(max);
    },

    updateText: function (runWrap) {
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
        if (style.fixedWidth === 0) {
            this.width = canvasText.linesWidth + padding.left + padding.right;
            textWidth = canvasText.linesWidth;
        }
        else {
            this.width = style.fixedWidth;
            textWidth = this.width - padding.left - padding.right;
            if (textWidth < canvasText.linesWidth) {
                textWidth = canvasText.linesWidth;
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
        canvasText.draw(
            padding.left,
            padding.top,
            textWidth,
            textHeight
        );

        context.restore();

        if (this.renderer.gl) {
            this.frame.source.glTexture = this.renderer.canvasToTexture(canvas, this.frame.source.glTexture, true);
            this.frame.glTexture = this.frame.source.glTexture;
        }

        this.dirty = true;

        if (this.input && this.input.hitArea instanceof Rectangle) {
            this.input.hitArea.width = this.width;
            this.input.hitArea.height = this.height;
        }

        return this;
    },

    getTextMetrics: function () {
        return this.style.getTextMetrics();
    },

    toJSON: function () {
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
    },

    preDestroy: function () {
        if (this.style.rtl) {
            RemoveFromDOM(this.canvas);
        }

        CanvasPool.remove(this.canvas);
        this.canvasText.destroy();
    },

    getWrappedText: function (text, start, end) {
        text = this.canvasText.getText(text, start, end, true);
        return text.split(SPLITREGEXP);
    },

    getPlainText: function (text, start, end) {
        return this.canvasText.getPlainText(text, start, end);
    },

    getText: function (text, start, end) {
        return this.canvasText.getText(text, start, end, false);
    },

    getSubString: function (text, start, end) {
        return this.getText(text, start, end);
    },

    copyPenManager: function (penManager) {
        return this.canvasText.copyPenManager(penManager);
    },

    getPenManager: function (text, penManager) {
        return this.canvasText.getPenManager(text, penManager);
    },

    setSize: function (width, height) {
        return this.setFixedSize(width, height);
    },

    resize: function (width, height) {
        return this.setFixedSize(width, height);
    },

    lineSpacing: {
        get: function () {
            return this.style.lineSpacing;
        },

        set: function (value) {
            this.setLineSpacing(value);
        }
    }

});

var CANVASTEXT_CONFIG = {};

export default Text;