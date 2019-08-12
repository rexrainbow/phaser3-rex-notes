import Render from './render/Render.js';
import TextStyle from './textstyle/TextStyle.js'; // extended
import CanvasTextKlass from './canvastext/CanvasText.js';
import Pool from '../../../pool.js';
import CONST from './const.js';
import GetGlobImageManager from './imagemanager/GetGlobImageManager.js';

const AddToDOM = Phaser.DOM.AddToDOM;
const CanvasPool = Phaser.Display.Canvas.CanvasPool;
const GameObject = Phaser.GameObjects.GameObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveFromDOM = Phaser.DOM.RemoveFromDOM;
const SPLITREGEXP = CONST.SPLITREGEXP;

var PensPools = {};

class Text extends GameObject {
    constructor(scene, x, y, text, style, type, parser) {
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
            PensPools[type] = new Pool();
        }
        this.canvasText = new CanvasTextKlass({
            parent: this,
            context: this.context,
            parser: parser,
            style: this.style,
            pensPool: PensPools[type]
        });

        //this.initRTL();

        if (style && style.padding) {
            this.setPadding(style.padding);
        }

        this.setText(text);

        scene.sys.game.events.on('contextrestored', function () {
            this.dirty = true;
        }, this);
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

    setText(value) {
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
    }

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

    setFixedSize(width, height) {
        return this.style.setFixedSize(width, height);
    }

    setBackgroundColor(color) {
        return this.style.setBackgroundColor(color);
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

    setWrapMode(mode) {
        return this.style.setWrapMode(mode);
    }

    setWrapWidth(width) {
        return this.style.setWrapWidth(width);
    }

    setAlign(align) {
        return this.style.setHAlign(align);
    }

    setLineSpacing(value) {
        return this.style.setLineSpacing(value);
    }

    setPadding(left, top, right, bottom) {
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
    }

    setResolution(value) {
        return this.style.setResolution(value);
    }

    setMaxLines(max) {
        return this.style.setMaxLines(max);
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

        var input = this.input;

        if (input && !input.customHitArea) {
            input.hitArea.width = this.width;
            input.hitArea.height = this.height;
        }

        return this;
    }

    getTextMetrics() {
        return this.style.getTextMetrics();
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

    preDestroy() {
        if (this.style.rtl) {
            RemoveFromDOM(this.canvas);
        }

        CanvasPool.remove(this.canvas);
        this.canvasText.destroy();
    }

    setInteractive(shape, callback, dropZone) {
        GameObject.prototype.setInteractive.call(this, shape, callback, dropZone);
        this.canvasText.setInteractive();
        return this;
    }

    getWrappedText(text, start, end) {
        text = this.canvasText.getText(text, start, end, true);
        return text.split(SPLITREGEXP);
    }

    getPlainText(text, start, end) {
        return this.canvasText.getPlainText(text, start, end);
    }

    getText(text, start, end) {
        return this.canvasText.getText(text, start, end, false);
    }

    getSubString(text, start, end) {
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

    set lineSpacing(value) {
        this.setLineSpacing(value);
    }
    get lineSpacing() {
        return this.style.lineSpacing;
    }

    get imageManager() {
        return GetGlobImageManager(this.scene.textures);
    }

    addImage(key, config) {
        this.imageManager.add(key, config);
        return this;
    }

    drawAreaBounds(graphics, color) {
        this.canvasText.hitAreaManager.drawBounds(graphics, color, this);
        return this;
    }
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Text,
    [
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
    ]
);

export default Text;