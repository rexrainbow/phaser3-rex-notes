import Canvas from '../canvas/Canvas.js';
import { GetPadding, SetPadding } from '../../../utils/padding/PaddingMethods.js'
import Background from './Background.js';
import TextStyle from './TextStyle.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class DynamicText extends Canvas {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            fixedWidth = GetValue(config, 'width', 0);
            fixedHeight = GetValue(config, 'height', 0);
        } else if (IsPlainObject(width)) {
            config = width;
            fixedWidth = GetValue(config, 'width', 0);
            fixedHeight = GetValue(config, 'height', 0);
        }

        var width = (fixedWidth === 0) ? 1 : fixedWidth;
        var height = (fixedHeight === 0) ? 1 : fixedHeight;
        super(scene, x, y, width, height);
        this.type = 'rexDynamicCanvasText';
        this.autoRound = true;
        this.padding = {};
        this.background = new Background(parent, config);
        this.textStyle = new TextStyle(config);

        this.setFixedSize(fixedWidth, fixedHeight);
        this.setPadding(
            GetValue(config, 'padding', 0)
        );
    }

    setFixedSize(width, height) {
        this.fixedWidth = width;
        this.fixedHeight = height;

        if ((width > 0) && (height > 0)) {
            this.setSize(width, height);
        }

        return this;
    }

    setPadding(key, value) {
        var padding = this.padding;
        var paddingLeft = padding.left,
            paddingRight = padding.right,
            paddingTop = padding.top,
            paddingBottom = padding.bottom;

        SetPadding(this.padding, key, value);

        this.dirty = this.dirty ||
            (paddingLeft != this.padding.left) ||
            (paddingRight != this.padding.right) ||
            (paddingTop != this.padding.top) ||
            (paddingBottom != this.padding.bottom)
            ;
        return this;
    }

    getPadding(key) {
        return GetPadding(this.padding, key);
    }

    modifyTextStyle(style) {
        this.textStyle.modify(style);
        return this;
    }

    updateTexture() {
        var ctx = this.context;

        this.clear();

        this.background.draw();

        var padding = this.padding;
        var paddingLeft = padding.left,
            paddingRight = padding.right,
            paddingTop = padding.top,
            paddingBottom = padding.bottom;

        ctx.save();
        ctx.beginPath();

        if ((paddingLeft > 0) || (paddingRight > 0) || (paddingTop > 0) || (paddingBottom > 0)) {
            ctx.rect(paddingLeft, padding.top, paddingRight - paddingLeft, paddingBottom - paddingTop);
            ctx.clip();
        }

        ctx.translate(paddingLeft, paddingTop);

        // Draw text & images

        ctx.restore();

        super.updateTexture();
        return this;
    }
}

export default DynamicText;