import {
    WarpFilter,
    WarpController
} from './warpfilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class WarpFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(WarpFilter, WarpController);

        this.setFilterListMethod(
            'addRexWarp',
            function(config?: any) {
                return this.add(new WarpController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.WarpFilter', WarpFilter);
SetValue(window, 'RexPlugins.Filters.WarpController', WarpController);

export default WarpFilterPlugin;