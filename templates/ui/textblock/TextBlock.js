import BaseSizer from '../basesizer/BaseSizer.js';
import ParsePaddingConfig from '../utils/ParsePaddingConfig.js';
import Layout from './Layout.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;
const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

class TextBlock extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, textGameObject, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            textGameObject = GetValue(config, 'text', undefined);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
            textGameObject = GetValue(config, 'text', undefined);
        }

        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexTextBlock';
        this.textChild = undefined;

        if (textGameObject) {
            this.addText(textGameObject, GetValue(config, 'padding', undefined));
        }
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.textChild = undefined;
        super.destroy(fromScene);
    }

    addText(gameObject, paddingConfig) {
        super.add(gameObject);
        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        config.align = ALIGN_LEFTTOP;
        config.padding = ParsePaddingConfig(paddingConfig);
        config.expand = true;
        this.textChild = gameObject;
        return this;
    }
}

var methods = {
    layout: Layout,
}
Object.assign(
    TextBlock.prototype,
    methods
);

export default TextBlock;