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

        this.setFilterListMethod(
            'addRexColorReplace',
            function (config) {
                return this.add(new ColorReplaceController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.ColorReplaceFilter', ColorReplaceFilter);
SetValue(window, 'RexPlugins.Filters.ColorReplaceController', ColorReplaceController);

export default ColorReplaceFilterPlugin;