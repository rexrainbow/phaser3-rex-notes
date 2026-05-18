import {
    ShineFilter,
    ShineController
} from './shinefilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class ShineFilterPlugin extends FilterPluginBase {
    setFilterClass: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
        this.setFilterClass(ShineFilter, ShineController);
    }
}

SetValue(window, 'RexPlugins.Filters.ShineFilter', ShineFilter);
SetValue(window, 'RexPlugins.Filters.ShineController', ShineController);

export default ShineFilterPlugin;