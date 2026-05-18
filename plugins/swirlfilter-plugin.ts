import {
    SwirlFilter,
    SwirlController
} from './swirlfilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class SwirlFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(SwirlFilter, SwirlController);

        this.setFilterListMethod(
            'addRexSwirl',
            function(config?: any) {
                return this.add(new SwirlController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.SwirlFilter', SwirlFilter);
SetValue(window, 'RexPlugins.Filters.SwirlController', SwirlController);

export default SwirlFilterPlugin;