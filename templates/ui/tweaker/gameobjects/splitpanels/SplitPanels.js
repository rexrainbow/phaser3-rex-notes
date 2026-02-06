import SplitPanelsBase from '../../../splitpanels/SplitPanels.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class SplitPanels extends SplitPanelsBase {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.SplitPanels';
        this.alignAllColumnsTitleWidth = GetValue(config, 'alignAllColumnsTitleWidth', false);
    }

    setTitle(config) {
        var header = this.childrenMap.header;

        if (header) {
            if (config.title || config.icon) {
                header.show().setTitle(config);
            } else {
                header.hide();
            }
        }

        return this;
    }
}

Object.assign(
    SplitPanels.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
)

export default SplitPanels;
