import {
    CrtFilter,
    CrtController
} from './crtfilter';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';
import SetValue from './utils/object/SetValue';

class CrtFilterPlugin extends FilterPluginBase {
    add: any;
    camera: any;
    setFilterClass: any;
    setFilterListMethod: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.setFilterClass(CrtFilter, CrtController);

        this.setFilterListMethod(
            'addRexCrt',
            function(config?: any) {
                return this.add(new CrtController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.CrtFilter', CrtFilter);
SetValue(window, 'RexPlugins.Filters.CrtController', CrtController);

export default CrtFilterPlugin;