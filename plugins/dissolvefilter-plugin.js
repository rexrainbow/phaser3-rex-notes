import {
    DisolveFilter,
    DissolveController
} from './dissolvefilter.js';

import PipelinePluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class DissolveFilterPlugin extends PipelinePluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(DisolveFilter, DissolveController);
    }
}

SetValue(window, 'RexPlugins.Filters.DisolveFilter', DisolveFilter);
SetValue(window, 'RexPlugins.Filters.DissolveController', DissolveController);

export default DissolveFilterPlugin;