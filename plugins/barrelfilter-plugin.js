import {
    BarrelFilter,
    BarrelController
} from './barrelfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class BarrelFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(BarrelFilter, BarrelController);
    }
}

SetValue(window, 'RexPlugins.Filters.BarrelFilter', BarrelFilter);
SetValue(window, 'RexPlugins.Filters.BarrelController', BarrelController);

export default BarrelFilterPlugin;