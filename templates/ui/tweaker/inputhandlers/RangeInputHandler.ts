import CreateSlider from './utils/CreateSlider';
import CreateInputText from './utils/CreateInputText';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Linear = PhaserMath.Linear;
const SnapFloor = PhaserMath.Snap.Floor;

var SetRange = function(gameObject?: any, min?: any, max?: any, step?: any) {
    gameObject.minValue = min;
    gameObject.maxValue = max;
    gameObject.step = step;

    var slider = gameObject.childrenMap.slider;
    slider.setGap(step, min, max);
}

var SetInputTextReadOnly = function(gameObject?: any, readOnly?: any, force?: any) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    if (force === undefined) {
        force = false;
    }

    var inputText = gameObject.childrenMap.inputText;

    if (force?: any) {
        gameObject.inputTextReadOnly = readOnly;
        inputText.setReadOnly(readOnly);
    } else {
        if (!gameObject.inputTextReadOnly) {
            inputText.setReadOnly(readOnly);
        }
    }
}

var SetSliderReadOnly = function(gameObject?: any, readOnly?: any) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    var slider = gameObject.childrenMap.slider;
    slider.setEnable(!readOnly);
}

export default {
    name: 'RangeInput',

    accept(config?: any) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'range')
        }

        return (typeof (config.value) === 'number') &&
            config.hasOwnProperty('min') &&
            config.hasOwnProperty('max');

    },

    // Callback after `constructor()`
    build(gameObject?: any, config?: any, inputRowStyle?: any, styles?: any) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.RangeInput';

        var sliderConfig = inputRowStyle.slider;
        var trackSizeKey = (gameObject.orientation === 0) ? 'track.height' : 'track.width';
        var trackSize = GetValue(sliderConfig, trackSizeKey);
        var slider = CreateSlider(scene, sliderConfig);

        var defaultProportion = (inputRowStyle.defaultExpandWidth) ? 2 : 0;
        var proportion = GetValue(inputRowStyle, 'proportion.range.slider', defaultProportion);
        var expand = (trackSize === undefined);
        gameObject.add(
            slider,
            { proportion: proportion, expand: expand, key: 'slider' }
        );

        var inputTextConfig = inputRowStyle.inputNumber || inputRowStyle.inputText;
        var inputText = CreateInputText(scene, inputTextConfig)
            .setNumberInput();

        var defaultProportion = (inputRowStyle.defaultExpandWidth) ? 1 : 0;
        var proportion = GetValue(inputRowStyle, 'proportion.range.inputText', defaultProportion);
        gameObject.add(
            inputText,
            { proportion: proportion, expand: true, key: 'inputText' }
        );

        inputText.on('close', function() {
            gameObject.setValue(inputText.value);
        });

        slider.on('valuechange', function() {
            var value = Linear(gameObject.minValue, gameObject.maxValue, slider.value);
            if (gameObject.step) {
                value = SnapFloor(value, gameObject.step, gameObject.minValue);
            }
            gameObject.setValue(value);
        });
    },

    // Callback inside `setup()`
    setup(gameObject?: any, config?: any, setDefaults?: any) {
        if (setDefaults || config.hasOwnProperty('max')) {
            SetRange(gameObject, config.min, config.max, config.step);
        }

        // User can force inputText as readOnly field always, only use slider
        if (setDefaults || config.hasOwnProperty('inputTextReadOnly')) {
            SetInputTextReadOnly(gameObject, !!config.inputTextReadOnly, true);
        }
    },

    // Callback inside `setValue()`
    displayValue(gameObject?: any, value?: any) {
        var slider = gameObject.childrenMap.slider;
        slider.setValue(value, gameObject.minValue, gameObject.maxValue);

        var inputText = gameObject.childrenMap.inputText;
        inputText.setText('').setText(gameObject.getFotmatText(value));

    },

    setReadOnly(gameObject?: any, readOnly?: any) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetInputTextReadOnly(gameObject, readOnly);
        SetSliderReadOnly(gameObject, readOnly);
    }
}