import {
    CrossStitchingFilter,
    CrossStitchingController
} from './crossstitchingfilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class CrossStitchingFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(CrossStitchingFilter, CrossStitchingController);

        this.setFilterListMethod(
            'addRexCrossStitching',
            function(config?: any) {
                return this.add(new CrossStitchingController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.CrossStitchingFilter', CrossStitchingFilter);
SetValue(window, 'RexPlugins.Filters.CrossStitchingController', CrossStitchingController);

export default CrossStitchingFilterPlugin;