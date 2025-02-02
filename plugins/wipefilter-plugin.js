import {
    WipeFilter,
    WipeController
} from './wipefilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class WipeFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(WipeFilter, WipeController);
    }
}

SetValue(window, 'RexPlugins.Filters.WipeFilter', WipeFilter);
SetValue(window, 'RexPlugins.Filters.WipeController', WipeController);

export default WipeFilterPlugin;