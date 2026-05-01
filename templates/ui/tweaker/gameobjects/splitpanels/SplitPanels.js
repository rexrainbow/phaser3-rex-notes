import SplitPanelsBase from '../../../splitpanels/SplitPanels.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';
import SetReadOnlyMethods from './SetReadOnlyMethods.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class SplitPanels extends SplitPanelsBase {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.SplitPanels';

        this.alignInputRowTitleStartFlag = GetValue(config, 'alignTitle');
    }

    preLayout() {
        super.preLayout();

        if (this.alignInputRowTitleStartFlag) {
            this.setInputRowTitleWidth(this.getMaxInputRowTitleWidth());
        }
    }

    setTitle(config) {
        var title = this.childrenMap.header;
        if (config.text || config.title || config.icon) {
            title.show().setTitle(config);
        } else {
            title.hide();
        }

        return this;
    }
}

Object.assign(
    SplitPanels.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
    SetReadOnlyMethods,
)

export default SplitPanels;
