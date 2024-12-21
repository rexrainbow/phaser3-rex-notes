import {
    CrtFilter,
    CrtController
} from './crtfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class CrtFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(CrtFilter, CrtController);
    }
}

SetValue(window, 'RexPlugins.Filters.CrtFilter', CrtFilter);
SetValue(window, 'RexPlugins.Filters.CrtController', CrtController);

export default CrtFilterPlugin;