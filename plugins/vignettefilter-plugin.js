import {
    VignetteFilter,
    VignetteController
} from './vignettefilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class VignetteFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(VignetteFilter, VignetteController);
    }
}

SetValue(window, 'RexPlugins.Filters.VignetteFilter', VignetteFilter);
SetValue(window, 'RexPlugins.Filters.VignetteController', VignetteController);

export default VignetteFilterPlugin;