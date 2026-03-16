import TabPagesBase from '../../../tabpages/TabPages.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';
import SetReadOnlyMethods from './SetReadOnlyMethods.js';

class TabPages extends TabPagesBase {
    constructor(scene, config) {
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