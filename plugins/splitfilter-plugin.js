import {
    SplitFilter,
    SplitController
} from './splitfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class SplitFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);

        this.setFilterClass(SplitFilter, SplitController);

        this.setFilterListMethod(
            'addRexSplit',
            function (config) {
                return this.add(new SplitController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.SplitFilter', SplitFilter);
SetValue(window, 'RexPlugins.Filters.SplitController', SplitController);

export default SplitFilterPlugin;