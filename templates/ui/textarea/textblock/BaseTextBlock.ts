import GetTextObjectType from '../../../../plugins/utils/text/GetTextObjectType';
import AddChildMask from '../../../../plugins/gameobjects/container/containerlite/mask/AddChildMask';
import BaseSizer from '../../basesizer/BaseSizer';
import GetBoundsConfig from '../../utils/GetBoundsConfig';
import PreLayoutBase from '../../basesizer/PreLayout';
import AlignIn from '../../../../plugins/utils/actions/AlignIn';

import { Display as PhaserDisplay, Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const ALIGN_LEFTTOP = PhaserDisplay.Align.TOP_LEFT;

class BaseTextBlock extends BaseSizer {
    height: any;
    textObject: any;
    width: any;

    _textObjectRealHeight: any;
    _textOY: any;
    add: any;
    addBackground: any;
    addChildrenMap: any;
    alwaysScrollable: any;
    clampTextOY: any;
    emit: any;
    execeedBottomState: any;
    execeedTopState: any;
    getSizerConfig: any;
    ignoreDestroy: any;
    left: any;
    linesCount: any;
    resetChildPositionState: any;
    scaleX: any;
    scaleY: any;
    scene: any;
    sizerChildren: any;
    text: any;
    textCropEnable: any;
    textMask: any;
    textObjectType: any;
    textObjectWidth: any;
    top: any;
    type: any;
    updateTextObject: any;

    constructor(scene?: any, x?: any, y?: any, minWidth?: any, minHeight?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        }

        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexBaseTextBlock';
        this.textObject = undefined;
        this.textObjectType = undefined;
        this.textMask = undefined;
        this.textObjectWidth = undefined;
        this._textObjectRealHeight = 0;
        this.linesCount = 0;

        this.text = GetValue(config, 'content', '');
        this._textOY = 0;
        this.execeedTopState = false;
        this.execeedBottomState = false;

        this.setClampMode(GetValue(config, 'clampTextOY', true));

        this.alwaysScrollable = GetValue(config, 'alwaysScrollable', false);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var textObject = GetValue(config, 'text', undefined);
        if (textObject === undefined) {
            textObject = CreateDefaultTextObject(scene);
        }
        this.textCropEnable = GetValue(config, 'textCrop', !!textObject.setCrop)
        var textMaskEnable = GetValue(config, 'textMask', !this.textCropEnable);

        if (background?: any) {
            this.addBackground(background);
        }

        this.add(textObject);
        this.sizerChildren = [textObject];

        var sizerConfig = this.getSizerConfig(textObject);
        sizerConfig.align = ALIGN_LEFTTOP;
        sizerConfig.padding = GetBoundsConfig(0);
        sizerConfig.expand = true;
        this.textObject = textObject;

        this.textObjectType = GetTextObjectType(textObject);

        // Add more variables
        sizerConfig.preOffsetY = 0;
        sizerConfig.offsetY = 0;

        // Create mask of text object
        if (textMaskEnable?: any) {
            this.textMask = AddChildMask.call(this, this.textObject, this);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('text', textObject);
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.textObject = undefined;
        this.textMask = undefined;

        super.destroy(fromScene);
    }

    setClampMode(mode?: any) {
        if (mode === undefined) {
            mode = true;
        }
        this.clampTextOY = mode;
        return this;
    }

    clearTextMetricsCache() {
        // Override in subclass if needed
    }

    preLayout() {
        this.clearTextMetricsCache();
        PreLayoutBase.call(this);
        return this;
    }

    layoutChildren() {
        var child, childConfig, padding;
        var startX = this.left,
            startY = this.top;
        var x, y, width, height; // Align zone

        // LayoutChildren text child
        // Skip invisible child
        child = this.textObject;
        if (!child.rexSizer.hidden) {
            childConfig = child.rexSizer;
            padding = childConfig.padding;
            x = startX + (padding.left * this.scaleX);
            y = startY + (padding.top * this.scaleY);
            width = (this.width * this.scaleX) - ((padding.left + padding.right) * this.scaleX);
            height = (this.height * this.scaleY) - ((padding.top + padding.bottom) * this.scaleY);
            this.resizeText(child, width, height);

            AlignIn(child, x, y, width, height, childConfig.align);

            childConfig.preOffsetY = 0; // Clear preOffsetY
            this.resetTextObjectPosition();

            if (this.textMask) {
                this.textMask.setPosition().resize();
                this.resetChildPositionState(this.textMask);
            }
        }
    }

    resizeText(textObject?: any, width?: any, height?: any) {
        // Override in subclass
        return this;
    }

    resetTextObjectPosition() {
        var config = this.textObject.rexSizer;
        this.textObject.y += (config.offsetY - config.preOffsetY);
        config.preOffsetY = config.offsetY;
        this.resetChildPositionState(this.textObject);

        if (this.textCropEnable) {
            this.cropTextObject();
        }
    }

    cropTextObject() {
        // Don't have setCrop method, return
        if (!this.textObject.setCrop) {
            return;
        }

        var offsetY = this.textObject.rexSizer.offsetY;
        var cropY, cropHeight;
        if (offsetY <= 0) {
            cropY = -offsetY;
            cropHeight = this.height;
        } else {
            cropY = 0;
            cropHeight = this.height - offsetY;
        }
        this.textObject.setCrop(
            0,
            cropY,
            this.width,
            cropHeight
        )
    }

    textOYExceedTop(oy?: any) {
        if (oy === undefined) {
            oy = this.textOY;
        }
        return (oy > this.topTextOY);
    }

    textOYExeceedBottom(oy?: any) {
        if (oy === undefined) {
            oy = this.textOY;
        }
        return (oy < this.bottomTextOY);
    }

    get textOY() {
        return this._textOY;
    }

    set textOY(oy) {
        var topTextOY = this.topTextOY;
        var bottomTextOY = this.bottomTextOY;
        var textOYExceedTop = this.textOYExceedTop(oy);
        var textOYExeceedBottom = this.textOYExeceedBottom(oy);

        if (this.clampTextOY) {
            if (textOYExceedTop?: any) {
                oy = topTextOY
            } else if (textOYExeceedBottom) {
                oy = bottomTextOY;
            }
        }

        if (this._textOY !== oy) {
            this._textOY = oy;
            this.updateTextObject();
        }

        if (textOYExceedTop?: any) {
            if (!this.execeedTopState) {
                this.emit('execeedtop', this, oy, topTextOY);
            }
        }
        this.execeedTopState = textOYExceedTop;

        if (textOYExeceedBottom?: any) {
            if (!this.execeedBottomState) {
                this.emit('execeedbottom', this, oy, bottomTextOY);
            }
        }
        this.execeedBottomState = textOYExeceedBottom;
    }

    setTextOY(oy?: any) {
        this.textOY = oy;
        return this;
    }

    set t(value) {
        var bottomTextOY = this.bottomTextOY;
        this.textOY = (bottomTextOY === 0) ? 0 : (bottomTextOY * value);
    }

    get t() {
        var bottomTextOY = this.bottomTextOY;
        if (bottomTextOY === 0) {
            return 0;
        }
        return (this.textOY / bottomTextOY);
    }

    setTextOYByPercentage(percentage?: any) {
        this.t = percentage;
        return this;
    }

    get topTextOY() {
        return 0;
    }

    get bottomTextOY() {
        return -this.textVisibleHeight;
    }

    get textVisibleHeight() {
        return 0;
    }

    get textHeight() {
        return 0;
    }

    get textObjectHeight() {
        return 0;
    }
}

var CreateDefaultTextObject = function(scene?: any) {
    return scene.add.text(0, 0, '');
};

export default BaseTextBlock;