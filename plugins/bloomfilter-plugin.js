import {
    BloomFilter,
    BloomController
} from './bloomfilter.js';

import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase.js';
import SetValue from './utils/object/SetValue.js';

class BloomFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(BloomFilter, BloomController);
    }
}

SetValue(window, 'RexPlugins.Filters.BloomFilter', BloomFilter);
SetValue(window, 'RexPlugins.Filters.BloomController', BloomController);

export default BloomFilterPlugin;