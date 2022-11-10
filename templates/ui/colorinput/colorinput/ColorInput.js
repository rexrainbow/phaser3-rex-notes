import Sizer from '../../sizer/Sizer.js';
import CreateSwatch from './methods/CreateSwatch.js';
import CreateInputText from './methods/CreateInputText.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ColorInput extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 0;
        super(scene, config);
        this.type = 'rexColorInput';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var swatch = CreateSwatch(scene, GetValue(config, 'swatch'));
        var inputText = CreateInputText(scene, GetValue(config, 'inputText'));

        if (background) {
            this.addBackground(background);
        }

        this.add(
            swatch,
            { proportion: 0, expand: false }
        );

        var proportion = (GetValue(config, 'inputText.width') === undefined) ? 1 : 0;
        var expand = (GetValue(config, 'inputText.height') === undefined) ? true : false;
        this.add(
            inputText,
            { proportion: proportion, expand: expand }
        )

        this.addChildrenMap('background', background);
        this.addChildrenMap('swatch', swatch);
        this.addChildrenMap('inputText', inputText);

    }

    preLayout() {
        var swatch = this.childrenMap.swatch;
        swatch.resize(1, 1);
    }

    postResolveSize(width, height) {
        var swatch = this.childrenMap.swatch;
        var size = height
            - this.getInnerPadding('top') - this.getInnerPadding('bottom')
            - this.getChildOuterPadding(swatch, 'top') - this.getChildOuterPadding(swatch, 'bottom');
        swatch.resize(size, size);

        // Recalculate proportionLength
        this.resolveWidth(width, true);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }

        this._value = value;

        // TODO: Update swatch and inputText

        this.emit('valuechange', this._value);
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    get color() {
        return this._value;
    }

    set color(color) {
        this.value = color;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

}

export default ColorInput;