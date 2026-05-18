import {
    CircleFilter,
    CircleController
} from './circlefilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class CircleFilterPlugin extends FilterPluginBase {
    setFilterClass: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
        this.setFilterClass(CircleFilter, CircleController);
    }
}

SetValue(window, 'RexPlugins.Filters.CircleFilter', CircleFilter);
SetValue(window, 'RexPlugins.Filters.CircleController', CircleController);

export default CircleFilterPlugin;