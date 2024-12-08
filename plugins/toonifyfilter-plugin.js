import {
    ToonifyFilter,
    ToonifyController
} from './toonifyfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class ToonifyFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(ToonifyFilter, ToonifyController);
    }
}

SetValue(window, 'RexPlugins.Filters.ToonifyFilter', ToonifyFilter);
SetValue(window, 'RexPlugins.Filters.ToonifyController', ToonifyController);

export default ToonifyFilterPlugin;