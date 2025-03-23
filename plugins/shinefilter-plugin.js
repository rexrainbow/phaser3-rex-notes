import {
    ShineFilter,
    ShineController
} from './shinefilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class ShineFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(ShineFilter, ShineController);
    }
}

SetValue(window, 'RexPlugins.Filters.ShineFilter', ShineFilter);
SetValue(window, 'RexPlugins.Filters.ShineController', ShineController);

export default ShineFilterPlugin;