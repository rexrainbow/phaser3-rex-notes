import {
    HslAdjustFilter,
    HslAdjustController
} from './hsladjustfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class HslAdjustFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(HslAdjustFilter, HslAdjustController);
    }
}

SetValue(window, 'RexPlugins.Filters.HslAdjustFilter', HslAdjustFilter);
SetValue(window, 'RexPlugins.Filters.HslAdjustController', HslAdjustController);

export default HslAdjustFilterPlugin;