import SplitPanelsBase from '../../../splitpanels/SplitPanels';
import BindingTargetMethods from './BindingTargetMethods';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods';
import SetReadOnlyMethods from './SetReadOnlyMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class SplitPanels extends SplitPanelsBase {
    alignInputRowTitleStartFlag: any;
    childrenMap: any;
    getMaxInputRowTitleWidth: any;
    setInputRowTitleWidth: any;
    type: any;

    constructor(scene?: any, config?: any) {
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

    setTitle(config?: any) {
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