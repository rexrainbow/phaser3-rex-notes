import {
    GradientFilter,
    GradientController
} from './gradientfilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class GradientFilterPlugin extends FilterPluginBase {
    setFilterClass: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
        this.setFilterClass(GradientFilter, GradientController);
    }
}

SetValue(window, 'RexPlugins.Filters.GradientFilter', GradientFilter);
SetValue(window, 'RexPlugins.Filters.GradientController', GradientController);

export default GradientFilterPlugin;