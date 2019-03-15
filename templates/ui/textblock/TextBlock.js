import BaseSizer from '../basesizer/BaseSizer.js';
import ParsePaddingConfig from '../utils/ParsePaddingConfig.js';
import Layout from './Layout.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

class TextBlock extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, config) {
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

        this.type = 'rexTextBlock';
        this.textChild = undefined;

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var textObject = GetValue(config, 'text', undefined);

        if (background) {
            this.addBackground(background);
        }
        if (textObject) {
            this.addText(textObject, GetValue(config, 'space', undefined));
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

    get textObject() {
        return this.textChild;
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