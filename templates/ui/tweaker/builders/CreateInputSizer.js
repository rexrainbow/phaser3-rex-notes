import Sizer from '../../sizer/Sizer.js';
import CreateInputTitle from './CreateInputTitle.js';
import CreateInputField from './CreateInputField.js';

var CreateInputSizer = function (scene, config, styles, gameObject) {
    if (!gameObject) {
        var inputTitle = CreateInputTitle(scene, config, styles);
        var inputField = CreateInputField(scene, config, styles);
        var inputSizerStyle = styles.inputSizer || {};
        var inputSizerconfig = {
            ...config,
            ...inputSizerStyle,
            inputTitle: inputTitle,
            inputField: inputField,
        }
        gameObject = new InputSizer(scene, inputSizerconfig);
    }

    gameObject.setBindTarget(config.target, config.targetKey);

    return gameObject;
}

class InputSizer extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.InputSizer';

        var inputTitle = config.inputTitle;
        var inputField = config.inputField;

        this.add(
            inputTitle,
            { proportion: 1, expand: true, }
        );

        this.add(
            inputField,
            { proportion: 2, expand: true, }
        );

        this.addChildrenMap('title', inputTitle);
        this.addChildrenMap('input', inputField);

        this.setupBinding();

    }

    setupBinding() {
        var inputField = this.childrenMap.input;
        inputField
            // Set text value to object when closing editor
            .on('close', function () {
                if (!this.bindTarget) {
                    return;
                }
                this.bindTarget[this.bindTargetKey] = inputField.getValue();;
            }, this);

        return this;
    }

    syncTargetValue() {
        if (!this.bindTarget) {
            return this;
        }

        var inputField = this.childrenMap.input;
        inputField.setValue(this.bindTarget[this.bindTargetKey]);

        return this;
    }

    setBindTarget(target, key) {
        this.bindTarget = target;
        if (key !== undefined) {
            this.setBindTargetKey(key);
        }
        return this;
    }

    setBindTargetKey(key) {
        this.bindTargetKey = key;
        this.syncTargetValue();
        return this;
    }

}

export default CreateInputSizer;