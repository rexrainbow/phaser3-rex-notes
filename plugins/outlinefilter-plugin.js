import {
    OutlineFilter,
    OutlineController
} from './outlinefilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class OutlineFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(OutlineFilter, OutlineController);
    }
}

SetValue(window, 'RexPlugins.Filters.OutlineFilter', OutlineFilter);
SetValue(window, 'RexPlugins.Filters.OutlineController', OutlineController);

export default OutlineFilterPlugin;
