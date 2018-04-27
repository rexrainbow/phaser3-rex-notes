import Render from './TextRender.js'; // copy from text object
import TextStyle from './TextStyle.js'; // extended
import CanvasTextKlass from './CanvasText.js';
import PoolKlass from './../object/Pool.js';

const AddToDOM = Phaser.DOM.AddToDOM;
const RemoveFromDOM = Phaser.DOM.RemoveFromDOM;
const CanvasPool = Phaser.Display.Canvas.Pool;
const Components = Phaser.GameObjects.Components;
const GameObject = Phaser.GameObjects.GameObject;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var PensPools = {};
var Text = new Phaser.Class({

    Extends: GameObject,

    Mixins: [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Origin,
        Components.Pipeline,
        Components.ScaleMode,
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

            this.setPosition(x, y);
            this.setOrigin(0, 0);
            this.initPipeline('TextureTintPipeline');

            this.canvas = CanvasPool.create(this);

            this.context = this.canvas.getContext('2d');

            this.style = new TextStyle(this, style);

            this.autoRound = true;

            this.text = '';

            this.resolution = 1;

            this.padding = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };

            this.width = 1;

            this.height = 1;

            this.canvasTexture = null;

            this.dirty = false;

            this.parser = parser;
            if (!PensPools.hasOwnProperty(type)) {
                PensPools[type] = new PoolKlass();
            }
            this.pensPool = PensPools[type];
            this.canvasText = new CanvasTextKlass(this);

            this.initRTL();

            if (style && style.padding) {
                this.setPadding(style.padding);
            }

            this.setText(text);

            if (scene.sys.game.config.renderType === Phaser.WEBGL) {
                scene.sys.game.renderer.onContextRestored(function () {
                    this.canvasTexture = null;
                    this.dirty = true;
                }, this);
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

    // TODO
    //getWrappedText: function (text) {
    //    if (text === undefined) {
    //        text = this.text;
    //    }
    //    var style = this.style;
    //    this.canvasText.updatePensManager(
    //        this.text,
    //        style.wrapMode,
    //        style.wrapWidth,
    //        style.lineHeight
    //    );
    //    return;
    //},

    setText: function (value) {
        if (!value && value !== 0) {
            value = '';
        }

        if (Array.isArray(value)) {
            value = value.join('\n');
        }

        if (value !== this.text) {
            this.text = value.toString();

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

    setWordWrapWidth: function (width, useAdvancedWrap) {
        return this.style.setWordWrapWidth(width, useAdvancedWrap);
    },

    setWordWrapCallback: function (callback, scope) {
        return this.style.setWordWrapCallback(callback, scope);
    },

    setAlign: function (align) {
        return this.style.setAlign(align);
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

        return this.updateText();
    },

    setMaxLines: function (max) {
        return this.style.setMaxLines(max);
    },

    // TODO
    updateText: function () {
        var canvasText = this.canvasText;

        // wrap text to pens
        var style = this.style;
        canvasText.updatePensManager(
            this.text,
            style.wrapMode,
            style.wrapWidth,
            style.lineHeight
        );

        // resize
        var padding = this.padding;
        var w = canvasText.linesWidth + padding.left + padding.right;
        var h = canvasText.linesHeight + padding.top + padding.bottom;

        if (style.fixedWidth === 0) {
            this.width = w;
        }

        if (style.fixedHeight === 0) {
            this.height = h;
        }

        this.updateDisplayOrigin();

        var resolution = this.resolution;
        w *= resolution;
        h *= resolution;

        w = Math.max(Math.ceil(w), 1);
        h = Math.max(Math.ceil(h), 1);

        var canvas = this.canvas;
        var context = this.context;
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }

        context.save();
        context.scale(resolution, resolution);
        context.translate(padding.left, padding.top);
        // draw
        canvasText.draw(
            (w - padding.right),
            (h - padding.bottom)
        );
        context.restore();

        this.dirty = true;

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
            text: this.text,
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
    },

    getRawText: function (text) {
        return this.canvasText.getRawText(text);
    },

    getSubText: function (start, end, text) {
        return this.canvasText.getSubText(start, end, text);
    },

    copyPensManager: function (PensManager) {
        return this.canvasText.copyPensManager(PensManager);
    }

});

export default Text;