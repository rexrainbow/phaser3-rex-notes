import {
    DissolveFilter,
    DissolveController
} from './dissolvefilter.js';

import PipelinePluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class DissolveFilterPlugin extends PipelinePluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(DissolveFilter, DissolveController);
    }
}

SetValue(window, 'RexPlugins.Filters.DisolveFilter', DissolveFilter);
SetValue(window, 'RexPlugins.Filters.DissolveController', DissolveController);

export default DissolveFilterPlugin;