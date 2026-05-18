import {
    HslAdjustFilter,
    HslAdjustController
} from './hsladjustfilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class HslAdjustFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(HslAdjustFilter, HslAdjustController);

        this.setFilterListMethod(
            'addRexHslAdjust',
            function(config?: any) {
                return this.add(new HslAdjustController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.HslAdjustFilter', HslAdjustFilter);
SetValue(window, 'RexPlugins.Filters.HslAdjustController', HslAdjustController);

export default HslAdjustFilterPlugin;