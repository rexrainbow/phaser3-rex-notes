import {
    CircleFilter,
    CircleController
} from './circlefilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class CircleFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(CircleFilter, CircleController);
    }
}

SetValue(window, 'RexPlugins.Filters.CircleFilter', CircleFilter);
SetValue(window, 'RexPlugins.Filters.CircleController', CircleController);

export default CircleFilterPlugin;