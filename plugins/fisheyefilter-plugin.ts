import {
    FishEyeFilter,
    FishEyeController
} from './fisheyefilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class FishEyeFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(FishEyeFilter, FishEyeController);

        this.setFilterListMethod(
            'addRexFishEye',
            function(config?: any) {
                return this.add(new FishEyeController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.FishEyeFilter', FishEyeFilter);
SetValue(window, 'RexPlugins.Filters.FishEyeController', FishEyeController);

export default FishEyeFilterPlugin;