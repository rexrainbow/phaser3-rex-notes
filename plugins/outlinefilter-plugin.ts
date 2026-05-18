import {
    OutlineFilter,
    OutlineController
} from './outlinefilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class OutlineFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(OutlineFilter, OutlineController);

        this.setFilterListMethod(
            'addRexOutline',
            function(config?: any) {
                return this.add(new OutlineController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.OutlineFilter', OutlineFilter);
SetValue(window, 'RexPlugins.Filters.OutlineController', OutlineController);

export default OutlineFilterPlugin;