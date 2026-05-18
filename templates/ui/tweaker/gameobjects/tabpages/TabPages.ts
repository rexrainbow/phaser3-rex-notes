import TabPagesBase from '../../../tabpages/TabPages';
import BindingTargetMethods from './BindingTargetMethods';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods';
import SetReadOnlyMethods from './SetReadOnlyMethods';

class TabPages extends TabPagesBase {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexTweaker.TabPages';
    }
}

Object.assign(
    TabPages.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
    SetReadOnlyMethods,
)

export default TabPages;