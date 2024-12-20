import {
    HorrifiFilter,
    HorrifiController
} from './horrififilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class HorrifiFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(HorrifiFilter, HorrifiController);
    }
}

SetValue(window, 'RexPlugins.Filters.HorrifiFilter', HorrifiFilter);
SetValue(window, 'RexPlugins.Filters.HorrifiController', HorrifiController);

export default HorrifiFilterPlugin;