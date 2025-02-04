import {
    ColorReplaceFilter,
    ColorReplaceController
} from './colorreplacefilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class ColorReplaceFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(ColorReplaceFilter, ColorReplaceController);
    }
}

SetValue(window, 'RexPlugins.Filters.ColorReplaceFilter', ColorReplaceFilter);
SetValue(window, 'RexPlugins.Filters.ColorReplaceController', ColorReplaceController);

export default ColorReplaceFilterPlugin;