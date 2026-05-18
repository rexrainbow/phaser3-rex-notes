import {
    BarrelFilter,
    BarrelController
} from './barrelfilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class BarrelFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(BarrelFilter, BarrelController);

        this.setFilterListMethod(
            'addRexBarrel',
            function(config?: any) {
                return this.add(new BarrelController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.BarrelFilter', BarrelFilter);
SetValue(window, 'RexPlugins.Filters.BarrelController', BarrelController);

export default BarrelFilterPlugin;