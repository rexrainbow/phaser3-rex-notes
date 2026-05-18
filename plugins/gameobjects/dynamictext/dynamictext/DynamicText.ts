import Canvas from '../../canvas/canvasbase/Canvas';
import { SetPadding } from '../../../utils/padding/PaddingMethods';
import Background from './bob/background/Background';
import InnerBounds from './bob/innerbounds/InnerBounds';
import TextStyle from './bob/char/TextStyle';
import Methods from './methods/Methods';
import PoolManager from './poolmanager/PoolManager';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class DynamicText extends Canvas {
    _textOX: any;
    _textOY: any;
    autoRound: any;
    background: any;
    children: any;
    defaultTextStyle: any;
    getText: any;
    innerBounds: any;
    lastAppendedChildren: any;
    lastOverChild: any;
    padding: any;
    poolManager: any;
    renderContent: any;
    setChildrenInteractiveEnable: any;
    setFixedSize: any;
    setPadding: any;
    setTestString: any;
    setText: any;
    setTextOX: any;
    setTextOY: any;
    setWrapConfig: any;
    textStyle: any;
    type: any;
    wrapPadding: any;

    constructor(scene?: any, x?: any, y?: any, fixedWidth?: any, fixedHeight?: any, resolution?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            fixedWidth = GetValue(config, 'width', 0);
            fixedHeight = GetValue(config, 'height', 0);
            resolution = GetValue(config, 'resolution', 1);
        } else if (IsPlainObject(fixedWidth)) {
            config = fixedWidth;
            fixedWidth = GetValue(config, 'width', 0);
            fixedHeight = GetValue(config, 'height', 0);
            resolution = GetValue(config, 'resolution', 1);
        } else if (IsPlainObject(resolution)) {
            config = resolution;
            resolution = GetValue(config, 'resolution', 1);
        }

        var width = (fixedWidth === 0) ? 1 : fixedWidth;
        var height = (fixedHeight === 0) ? 1 : fixedHeight;
        super(scene, x, y, width, height, resolution);
        this.type = 'rexDynamicText';
        this.autoRound = true;
        this.padding = SetPadding();
        this.wrapPadding = SetPadding();

        var textStyleConfig = GetValue(config, 'style', undefined);
        this.defaultTextStyle = new TextStyle(null, textStyleConfig);
        this.textStyle = this.defaultTextStyle.clone();
        this.setTestString(GetValue(config, 'testString', '|MÉqgy'));

        this._textOX = 0;
        this._textOY = 0;
        this.background = new Background(this, GetValue(config, 'background', undefined));
        this.innerBounds = new InnerBounds(this, GetValue(config, 'innerBounds', undefined));
        this.children = [];
        this.lastAppendedChildren = [];
        this.lastOverChild = null;
        this.poolManager = new PoolManager(config);

        this.setFixedSize(fixedWidth, fixedHeight);
        this.setPadding(GetValue(config, 'padding', 0));
        this.setWrapConfig(GetValue(config, 'wrap', undefined));
        this.setChildrenInteractiveEnable(GetValue(config, 'childrenInteractive', false));

        var text = GetValue(config, 'text', undefined);
        if (text?: any) {
            this.setText(text);
        }
    }

    updateTexture() {
        super.updateTexture(function() {
            this.renderContent();
        }, this);
        return this;
    }

    get text() {
        return this.getText(true);
    }

    set text(value) {
        this.setText(value);
    }

    setSize(width?: any, height?: any) {
        this.setFixedSize(width, height);
        return this;
    }

    get textOX() {
        return this._textOX;
    }

    set textOX(value) {
        this.setTextOX(value);
    }

    get textOY() {
        return this._textOY;
    }

    set textOY(value) {
        this.setTextOY(value);
    }
}

Object.assign(
    DynamicText.prototype,
    Methods
);


export default DynamicText;