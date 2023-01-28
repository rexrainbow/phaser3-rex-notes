import Sizer from '../../../sizer/Sizer.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import MonitorTargetMethods from './MonitorTargetMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class InputRow extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.InputRow';

        var inputTitle = config.inputTitle;
        var inputField = config.inputField;
        var background = config.background;

        var defaultProportion = (config.parentOrientation === 1) ? 1 : 0;
        var proportion = GetValue(config, 'proportion.title', defaultProportion);
        this.add(
            inputTitle,
            { proportion: proportion, expand: true, }
        );

        var defaultProportion = (config.parentOrientation === 1) ? 2 : 0;
        var proportion = GetValue(config, 'proportion.inputField', defaultProportion);
        this.add(
            inputField,
            { proportion: proportion, expand: true, }
        );

        if (background) {
            this.addBackground(background);
        }

        this.addChildrenMap('title', inputTitle);
        this.addChildrenMap('inputField', inputField);
        this.addChildrenMap('background', background);

        this.setupBinding();

    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.stopMonitorTarget();

        super.destroy(fromScene);
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
    MonitorTargetMethods,
)

export default InputRow;