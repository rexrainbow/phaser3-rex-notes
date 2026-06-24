import {
    RectangleMaskFilter,
    RectangleMaskController
} from './rectanglemaskfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class RectangleMaskPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);

        this.setFilterClass(RectangleMaskFilter, RectangleMaskController);

        this.setFilterListMethod(
            'addRexRectangleMask',
            function (config) {
                return this.add(new RectangleMaskController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.RectangleMaskFilter', RectangleMaskFilter);
SetValue(window, 'RexPlugins.Filters.RectangleMaskController', RectangleMaskController);

export default RectangleMaskPlugin;