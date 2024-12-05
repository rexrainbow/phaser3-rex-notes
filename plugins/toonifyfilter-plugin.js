import {
    ToonifyFilter,
    ToonifyController
} from './toonifyfilter.js';

import PipelinePluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class ToonifyFilterPlugin extends PipelinePluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(ToonifyFilter, ToonifyController);
    }
}

SetValue(window, 'RexPlugins.Filters.ToonifyFilter', ToonifyFilter);
SetValue(window, 'RexPlugins.Filters.ToonifyController', ToonifyController);

export default ToonifyFilterPlugin;