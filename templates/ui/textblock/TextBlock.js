import BaseSizer from '../basesizer/BaseSizer.js';
import SetTextObject from './SetTextObject.js';
import Layout from './Layout.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

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
        this.textMask = undefined;

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var textObject = GetValue(config, 'text', undefined);
        if (textObject === undefined) {
            textObject = createDefaultTextObject(scene);
        }

        // Space
        var paddingConfig = GetValue(config, 'space', undefined);

        if (background) {
            this.addBackground(background);
        }

        this.setTextObject(textObject, paddingConfig);

    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.textChild = undefined;
        this.textMask = undefined;
        super.destroy(fromScene);
    }

    get textObject() {
        return this.textChild;
    }
}

var createDefaultTextObject = function (scene) {
    return scene.add.text(0, 0, '');
};

var methods = {
    setTextObject: SetTextObject,
    layout: Layout,
}
Object.assign(
    TextBlock.prototype,
    methods
);

export default TextBlock;