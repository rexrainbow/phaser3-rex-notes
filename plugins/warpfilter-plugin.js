import {
    WarpFilter,
    WarpController
} from './warpfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class WarpFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);

        this.setFilterClass(WarpFilter, WarpController);

        this.setFilterListMethod(
            'addRexWarp',
            function (config) {
                return this.add(new WarpController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.WarpFilter', WarpFilter);
SetValue(window, 'RexPlugins.Filters.WarpController', WarpController);

export default WarpFilterPlugin;