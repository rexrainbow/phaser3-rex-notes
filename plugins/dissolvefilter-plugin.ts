import {
    DissolveFilter,
    DissolveController
} from './dissolvefilter';

import PipelinePluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class DissolveFilterPlugin extends PipelinePluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
        this.setFilterClass(DissolveFilter, DissolveController);

        this.setFilterListMethod(
            'addRexDissolve',
            function(config?: any) {
                return this.add(new DissolveController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.DisolveFilter', DissolveFilter);
SetValue(window, 'RexPlugins.Filters.DissolveController', DissolveController);

export default DissolveFilterPlugin;