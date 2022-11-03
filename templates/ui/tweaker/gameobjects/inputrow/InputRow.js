import Sizer from '../../../sizer/Sizer.js';
import BindingTargetMethods from './BindingTargetMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class InputRow extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.InputRow';

        var inputTitle = config.inputTitle;
        var inputField = config.inputField;
        var background = config.background;

        var proportion = GetValue(config, 'proportion.title', 1);
        this.add(
            inputTitle,
            { proportion: proportion, expand: true, }
        );

        var proportion = GetValue(config, 'proportion.inputField', 2);
        this.add(
            inputField,
            { proportion: proportion, expand: true, }
        );

        this.addBackground(background);

        this.addChildrenMap('title', inputTitle);
        this.addChildrenMap('inputField', inputField);
        this.addChildrenMap('background', background);

        this.setupBinding();

    }

    setTitle(config) {
        var title = this.childrenMap.title;
        title.setTitle(config);
        return this;
    }

}

Object.assign(
    InputRow.prototype,
    BindingTargetMethods,
)

export default InputRow;