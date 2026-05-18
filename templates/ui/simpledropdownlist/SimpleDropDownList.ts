import DropDownList from '../dropdownlist/DropDownList';
import BuildListConfig from '../utils/build/BuildListConfig';

class SimpleDropDownList extends DropDownList {
    type: any;

    constructor(scene?: any, config?: any, creators?: any) {
        config = BuildListConfig(scene, config, creators);
        super(scene, config);
        this.type = 'rexSimpleDropDownList';
    }

    setOptions(options?: any) {
        if (options === undefined) {
            options = [];
        }
        for (var i = 0, cnt = options.length; i < cnt; i++) {
            var option = options[i];
            if (typeof (option) === 'string') {
                options[i] = { text: option, value: option };
            }
        }
        super.setOptions(options);
        return this;
    }

}

export default SimpleDropDownList;