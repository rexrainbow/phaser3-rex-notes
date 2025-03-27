import {
    FishEyeFilter,
    FishEyeController
} from './fisheyefilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class FishEyeFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);

        this.setFilterClass(FishEyeFilter, FishEyeController);

        this.setFilterListMethod(
            'addRexFishEye',
            function (config) {
                return this.add(new FishEyeController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.FishEyeFilter', FishEyeFilter);
SetValue(window, 'RexPlugins.Filters.FishEyeController', FishEyeController);

export default FishEyeFilterPlugin;