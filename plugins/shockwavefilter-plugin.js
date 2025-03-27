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

        this.setFilterListMethod(
            'addRexShockwave',
            function (config) {
                return this.add(new ShockwaveController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.ShockwaveFilter', ShockwaveFilter);
SetValue(window, 'RexPlugins.Filters.ShockwaveController', ShockwaveController);

export default ShockwaveFilterPlugin;