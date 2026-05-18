import {
    ShockwaveFilter,
    ShockwaveController
} from './shockwavefilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class ShockwaveFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(ShockwaveFilter, ShockwaveController);

        this.setFilterListMethod(
            'addRexShockwave',
            function(config?: any) {
                return this.add(new ShockwaveController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.ShockwaveFilter', ShockwaveFilter);
SetValue(window, 'RexPlugins.Filters.ShockwaveController', ShockwaveController);

export default ShockwaveFilterPlugin;