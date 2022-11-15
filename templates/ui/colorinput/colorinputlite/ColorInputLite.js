import Sizer from '../../sizer/Sizer.js';
import CreateSwatch from './methods/CreateSwatch.js';
import CreateInputText from '../../utils/build/CreateInputText.js';
import ColorStringToInteger from '../../../../plugins/utils/color/ColorStringToInteger.js';
import GetHexColorString from '../../../../plugins/utils/color/GetHexColorString.js';
import SetSwatchColor from './methods/SetSwatchColor.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class ColorInput extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 0;
        super(scene, config);
        this.type = 'rexColorInputLite';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var swatch = CreateSwatch(scene, GetValue(config, 'swatch'));
        var inputTextConfig = GetValue(config, 'inputText');
        var inputText = CreateInputText(scene, inputTextConfig);

        if (background) {
            this.addBackground(background);
        }

        if (swatch) {
            this.add(
                swatch,
                { proportion: 0, expand: false }
            );
        }

        var proportion = (GetValue(inputTextConfig, 'width') === undefined) ? 1 : 0;
        var expand = (GetValue(inputTextConfig, 'height') === undefined) ? true : false;
        this.add(
            inputText,
            { proportion: proportion, expand: expand }
        )

        this.addChildrenMap('background', background);
        this.addChildrenMap('swatch', swatch);
        this.addChildrenMap('inputText', inputText);

        inputText.on('close', function () {
            this.setValue(inputText.value);
        }, this);


        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }

        this.setValue(GetValue(config, 'value', 0x0));
    }

    preLayout() {
        var swatch = this.childrenMap.swatch;

        if (swatch && swatch.expandSquare) {
            swatch.resize(1, 1);
        }
    }

    postResolveSize(width, height) {
        var swatch = this.childrenMap.swatch;
        if (swatch && swatch.expandSquare) {
            var size = height
                - this.getInnerPadding('top') - this.getInnerPadding('bottom')
                - this.getChildOuterPadding(swatch, 'top') - this.getChildOuterPadding(swatch, 'bottom');
            swatch.resize(size, size);

            // Recalculate proportionLength
            this.proportionLength = undefined;
            this._childrenWidth = undefined;
            this.resolveWidth(width, true);
        }
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (typeof (value) === 'string') {
            value = ColorStringToInteger(value);
            if (value == null) {
                var inputText = this.childrenMap.inputText;
                inputText.setText(GetHexColorString(this._value));
                return;
            }
        } else {
            value = Clamp(Math.floor(value), 0, 0xffffff);
        }

        if (this._value === value) {
            return;
        }

        this._value = value;

        var swatch = this.childrenMap.swatch;
        if (swatch) {
            SetSwatchColor(swatch, value);
        }

        var inputText = this.childrenMap.inputText;
        inputText.setText(GetHexColorString(value));

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