import {
    SwirlFilter,
    SwirlController
} from './swirlfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class SwirlFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);

        this.setFilterClass(SwirlFilter, SwirlController);

        this.setFilterListMethod(
            'addRexSwirl',
            function (config) {
                return this.add(new SwirlController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.SwirlFilter', SwirlFilter);
SetValue(window, 'RexPlugins.Filters.SwirlController', SwirlController);

export default SwirlFilterPlugin;