import {
    ColorReplaceFilter,
    ColorReplaceController
} from './colorreplacefilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class ColorReplaceFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
        this.setFilterClass(ColorReplaceFilter, ColorReplaceController);

        this.setFilterListMethod(
            'addRexColorReplace',
            function(config?: any) {
                return this.add(new ColorReplaceController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.ColorReplaceFilter', ColorReplaceFilter);
SetValue(window, 'RexPlugins.Filters.ColorReplaceController', ColorReplaceController);

export default ColorReplaceFilterPlugin;