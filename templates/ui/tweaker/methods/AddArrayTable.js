import GetLeafKey from '../../../../plugins/utils/string/GetLeafKey.js';
import CreateArrayTable from '../builders/createarraytable/CreateArrayTable.js';

const GetValue = Phaser.Utils.Objects.GetValue;


var AddArrayTable = function (target, bindingKey, config) {
    if (arguments.length === 1) {
        config = target;
        target = config.bindingTarget;
        bindingKey = config.bindingKey;
    } else {
        if (config === undefined) {
            config = {};
        }
        config.bindingTarget = target;
        config.bindingKey = bindingKey;
    }

    if (!config.title) {
        // Display leaf key as title
        config.title = GetLeafKey(bindingKey);
    }

    config.value = GetValue(target, bindingKey, undefined) || [];

    var arrayTableStyle = GetValue(this.styles, 'arrayTable') || {};
    arrayTableStyle.tweaker = this.styles;
    arrayTableStyle.root = this.root;
    var arrayTable = CreateArrayTable(this, config, arrayTableStyle);
    delete arrayTableStyle.tweaker;
    delete arrayTableStyle.root;

    this.add(
        arrayTable,
        {
            proportion: (arrayTable.minWidth === 0) ? 1 : 0,
            expand: true
        }
    );

    arrayTable.setTitle(config);

    arrayTable.setBindingTarget(target, bindingKey);

    if (config.monitor) {
        arrayTable.startMonitorTarget();
    }

    if (config.key) {
        this.root.addChildrenMap(config.key, arrayTable);
    }

    return this;
}

export default AddArrayTable;
