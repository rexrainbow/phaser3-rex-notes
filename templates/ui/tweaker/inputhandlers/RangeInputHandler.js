import CreateSlider from './utils/CreateSlider.js';
import CreateInputText from './utils/CreateInputText.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Linear = Phaser.Math.Linear;
const SnapFloor = Phaser.Math.Snap.Floor;

var SetRange = function (gameObject, min, max, step) {
    gameObject.minValue = min;
    gameObject.maxValue = max;
    gameObject.step = step;

    var slider = gameObject.childrenMap.slider;
    slider.setGap(step, min, max);
}

var SetInputTextReadOnly = function (gameObject, enable) {
    if (enable === undefined) {
        enable = true;
    }

    var inputText = gameObject.childrenMap.inputText;
    inputText.setReadOnly(enable);
}

export default {
    name: 'RangeInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'range')
        }

        return (typeof (config.value) === 'number') &&
            config.hasOwnProperty('min') &&
            config.hasOwnProperty('max');

    },

    // Callback after `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.RangeInput';

        var sliderConfig = style.slider;
        var trackSizeKey = (gameObject.orientation === 0) ? 'track.height' : 'track.width';
        var trackSize = GetValue(sliderConfig, trackSizeKey);
        var slider = CreateSlider(scene, sliderConfig);

        var defaultProportion = (style.defaultExpandWidth) ? 2 : 0;
        var proportion = GetValue(style, 'proportion.range.slider', defaultProportion);
        var expand = (trackSize === undefined);
        gameObject.add(
            slider,
            { proportion: proportion, expand: expand, key: 'slider' }
        );

        var inputTextConfig = style.inputNumber || style.inputText;
        var inputText = CreateInputText(scene, inputTextConfig)
            .setNumberInput();

        var defaultProportion = (style.defaultExpandWidth) ? 1 : 0;
        var proportion = GetValue(style, 'proportion.range.inputText', defaultProportion);
        gameObject.add(
            inputText,
            { proportion: proportion, expand: true, key: 'inputText' }
        );

        inputText.on('close', function () {
            gameObject.setValue(inputText.value);
        });

        slider.on('valuechange', function () {
            var value = Linear(gameObject.minValue, gameObject.maxValue, slider.value);
            if (gameObject.step) {
                value = SnapFloor(value, gameObject.step, gameObject.minValue);
            }
            gameObject.setValue(value);
        });
    },

    // Callback inside `setup()`
    setup(gameObject, config, setDefaults) {
        if (setDefaults || config.hasOwnProperty('max')) {
            SetRange(gameObject, config.min, config.max, config.step);
        }

        if (setDefaults || config.hasOwnProperty('inputTextReadOnly')) {
            SetInputTextReadOnly(gameObject, !!config.inputTextReadOnly);
        }
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var slider = gameObject.childrenMap.slider;
        slider.setValue(value, gameObject.minValue, gameObject.maxValue);

        var inputText = gameObject.childrenMap.inputText;
        inputText.setText('').setText(gameObject.getFotmatText(value));

    },
}