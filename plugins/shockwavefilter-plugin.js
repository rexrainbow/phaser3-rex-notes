import {
    ShockwaveFilter,
    ShockwaveController
} from './shockwavefilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class ShockwaveFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(ShockwaveFilter, ShockwaveController);
    }
}

SetValue(window, 'RexPlugins.Filters.ShockwaveFilter', ShockwaveFilter);
SetValue(window, 'RexPlugins.Filters.ShockwaveController', ShockwaveController);

export default ShockwaveFilterPlugin;