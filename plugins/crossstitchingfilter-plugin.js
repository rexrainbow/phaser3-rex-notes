import {
    CrossStitchingFilter,
    CrossStitchingController
} from './crossstitchingfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class CrossStitchingFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);

        this.setFilterClass(CrossStitchingFilter, CrossStitchingController);

        this.setFilterListMethod(
            'addRexCrossStitching',
            function (config) {
                return this.add(new CrossStitchingController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.CrossStitchingFilter', CrossStitchingFilter);
SetValue(window, 'RexPlugins.Filters.CrossStitchingController', CrossStitchingController);

export default CrossStitchingFilterPlugin;