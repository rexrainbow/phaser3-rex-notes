import {
    GradientFilter,
    GradientController
} from './gradientfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class GradientFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(GradientFilter, GradientController);
    }
}

SetValue(window, 'RexPlugins.Filters.GradientFilter', GradientFilter);
SetValue(window, 'RexPlugins.Filters.GradientController', GradientController);

export default GradientFilterPlugin;