import Canvas from '../canvas/Canvas.js';
import Background from './bob/Background.js';
import InnerBounds from './bob/InnerBounds.js';
import TextStyle from './bob/char/TextStyle.js';
import DrawContent from './methods/DrawContent.js';
import PaddingMethods from './methods/PaddingMethods.js';
import AddChildMethods from './methods/AddChildMethods';
import WrapMethods from './methods/WrapMethods.js';
import GetChildrenMethods from './methods/GetChildrenMethods.js';
import PoolManager from './methods/PoolManager.js';

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
        this.textStyle = new TextStyle(GetValue(config, 'style', undefined));
        this.background = new Background(this, GetValue(config, 'background', undefined));
        this.innerBounds = new InnerBounds(this, GetValue(config, 'innerBounds', undefined));
        this.children = [];
        this.poolManager = new PoolManager(config);

        this.setFixedSize(fixedWidth, fixedHeight);
        this.setPadding(GetValue(config, 'padding', 0));
        this.setWrapConfig(GetValue(config, 'wrap', undefined));

        this.setText(GetValue(config, 'text', ''));
    }

    setFixedSize(width, height) {
        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = 0;
        }

        this.fixedWidth = width;
        this.fixedHeight = height;

        return this;
    }

    updateTexture() {
        this.clear();
        DrawContent.call(this);
        super.updateTexture();
        return this;
    }
}

Object.assign(
    DynamicText.prototype,
    PaddingMethods,
    AddChildMethods,
    WrapMethods,
    GetChildrenMethods
);


export default DynamicText;