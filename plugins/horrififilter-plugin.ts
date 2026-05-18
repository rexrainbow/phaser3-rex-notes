import {
    HorrifiFilter,
    HorrifiController
} from './horrififilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class HorrifiFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(HorrifiFilter, HorrifiController);

        this.setFilterListMethod(
            'addRexHorrifi',
            function(config?: any) {
                return this.add(new HorrifiController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.HorrifiFilter', HorrifiFilter);
SetValue(window, 'RexPlugins.Filters.HorrifiController', HorrifiController);

export default HorrifiFilterPlugin;