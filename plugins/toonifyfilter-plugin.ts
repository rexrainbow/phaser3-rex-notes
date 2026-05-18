import {
    ToonifyFilter,
    ToonifyController
} from './toonifyfilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class ToonifyFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(ToonifyFilter, ToonifyController);

        this.setFilterListMethod(
            'addRexToonify',
            function(config?: any) {
                return this.add(new ToonifyController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.ToonifyFilter', ToonifyFilter);
SetValue(window, 'RexPlugins.Filters.ToonifyController', ToonifyController);

export default ToonifyFilterPlugin;