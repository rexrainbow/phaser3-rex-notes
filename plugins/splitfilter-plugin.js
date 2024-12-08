import {
    SplitFilter,
    SplitController
} from './splitfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class SplitFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(SplitFilter, SplitController);
    }
}

SetValue(window, 'RexPlugins.Filters.SplitFilter', SplitFilter);
SetValue(window, 'RexPlugins.Filters.SplitController', SplitController);

export default SplitFilterPlugin;