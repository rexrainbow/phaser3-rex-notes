import Sizer from '../../../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class InputRow extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.InputRow';

        var inputTitle = config.inputTitle;
        var inputText = config.inputText;
        var background = config.background;

        var proportion = GetValue(config, 'proportion.title', 1);
        this.add(
            inputTitle,
            { proportion: proportion, expand: true, }
        );

        var proportion = GetValue(config, 'proportion.inputText', 2);
        this.add(
            inputText,
            { proportion: proportion, expand: true, }
        );

        this.addBackground(background);

        this.addChildrenMap('title', inputTitle);
        this.addChildrenMap('inputText', inputText);
        this.addChildrenMap('background', background);

        this.setupBinding();

    }

    setupBinding() {
        var inputText = this.childrenMap.inputText;
        inputText
            // Set text value to object when closing editor
            .on('close', function () {
                if (!this.bindTarget) {
                    return;
                }
                this.bindTarget[this.bindTargetKey] = inputText.getValue();;
            }, this);

        return this;
    }

    setTitle(config) {
        var title = this.childrenMap.title;
        title.setTitle(config);
        return this;
    }

    setBindingTarget(target, key) {
        this.bindTarget = target;
        if (key !== undefined) {
            this.setBindingTargetKey(key);
        }
        return this;
    }

    setBindingTargetKey(key) {
        this.bindTargetKey = key;
        this.syncTargetValue();
        return this;
    }

    syncTargetValue() {
        if (!this.bindTarget) {
            return this;
        }

        var inputText = this.childrenMap.inputText;
        inputText.setValue(this.bindTarget[this.bindTargetKey]);

        return this;
    }

}

export default InputRow;