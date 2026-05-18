import {
    SplitFilter,
    SplitController
} from './splitfilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class SplitFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(SplitFilter, SplitController);

        this.setFilterListMethod(
            'addRexSplit',
            function(config?: any) {
                return this.add(new SplitController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.SplitFilter', SplitFilter);
SetValue(window, 'RexPlugins.Filters.SplitController', SplitController);

export default SplitFilterPlugin;