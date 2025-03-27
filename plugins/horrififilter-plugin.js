import {
    HorrifiFilter,
    HorrifiController
} from './horrififilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class HorrifiFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);

        this.setFilterClass(HorrifiFilter, HorrifiController);

        this.setFilterListMethod(
            'addRexHorrifi',
            function (config) {
                return this.add(new HorrifiController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.HorrifiFilter', HorrifiFilter);
SetValue(window, 'RexPlugins.Filters.HorrifiController', HorrifiController);

export default HorrifiFilterPlugin;