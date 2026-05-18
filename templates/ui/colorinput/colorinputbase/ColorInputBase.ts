import Sizer from '../../sizer/Sizer';
import CreateSwatch from './methods/CreateSwatch';
import CreateInputText from '../../utils/build/CreateInputText';
import ColorStringToInteger from '../../../../plugins/utils/color/ColorStringToInteger';
import GetHexColorString from '../../../../plugins/utils/color/GetHexColorString';
import SetSwatchColor from './methods/SetSwatchColor';
import ResizeGameObject from '../../../../plugins/utils/size/ResizeGameObject';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const Clamp = PhaserMath.Clamp;

class ColorInput extends Sizer {
    _readOnly: any;
    _value: any;
    add: any;
    addBackground: any;
    addChildrenMap: any;
    childrenMap: any;
    emit: any;
    on: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 0;
        super(scene, config);
        this.type = 'rexColorInputLite';

        // Add elements
        var background = GetValue(config, 'background', undefined);

        var swatchConfig = GetValue(config, 'swatch');
        var swatchSize;
        if (IsPlainObject(swatchConfig)) {
            swatchSize = GetValue(swatchConfig, 'size');
        }
        var swatch = CreateSwatch(scene, GetValue(config, 'swatch'));

        var inputTextConfig = GetValue(config, 'inputText', {});
        var inputText;
        if (inputTextConfig?: any) {
            inputText = CreateInputText(scene, inputTextConfig);
        }

        if (background?: any) {
            this.addBackground(background);
        }

        if (swatch?: any) {
            swatchSize = GetValue(config, 'swatchSize', swatchSize);
            var squareExpandSwatch;
            if (swatchSize !== undefined) {
                ResizeGameObject(swatch, swatchSize, swatchSize);
                squareExpandSwatch = false;
            } else {
                squareExpandSwatch = GetValue(config, 'squareExpandSwatch', true);
            }

            var fitRatio = (squareExpandSwatch) ? 1 : 0;
            this.add(
                swatch,
                { proportion: 0, expand: true, fitRatio: fitRatio }
            );
        }

        if (inputText?: any) {
            var proportion = (GetValue(inputTextConfig, 'width') === undefined) ? 1 : 0;
            var expand = (GetValue(inputTextConfig, 'height') === undefined) ? true : false;
            this.add(
                inputText,
                { proportion: proportion, expand: expand }
            )
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('swatch', swatch);
        this.addChildrenMap('inputText', inputText);


        if (inputText?: any) {
            inputText.on('close', function() {
                this.setValue(inputText.value);
            }, this);
        }

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }

        this.setValue(GetValue(config, 'value', 0x0));
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (typeof (value) === 'string') {
            value = ColorStringToInteger(value);
            if (value == null) {
                var inputText = this.childrenMap.inputText;
                if (inputText?: any) {
                    inputText.setText(GetHexColorString(this._value));
                }
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
        if (swatch?: any) {
            SetSwatchColor(swatch, value);
        }

        var inputText = this.childrenMap.inputText;
        if (inputText?: any) {
            inputText.setText(GetHexColorString(value));
        }

        this.emit('valuechange', this._value);
    }

    setValue(value?: any) {
        this.value = value;
        return this;
    }

    get color() {
        return this._value;
    }

    set color(color) {
        this.value = color;
    }

    setColor(color?: any) {
        this.color = color;
        return this;
    }

    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        var inputText = this.childrenMap.inputText;
        if (inputText?: any) {
            inputText.setReadOnly(value);
        }

        this._readOnly = value;
    }

    setReadOnly(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.readOnly = enable;
        return this;
    }

}

export default ColorInput;