import DropDownList from '../dropdownlist/DropDownList.js';
import BuildListConfig from '../utils/build/BuildListConfig.js';

class SimpleDropDownList extends DropDownList {
    constructor(scene, config, creators) {
        config = BuildListConfig(scene, config, creators);
        super(scene, config);
        this.type = 'rexSimpleDropDownList';
    }
}

export default SimpleDropDownList;