import GetLeafKey from '../../../../plugins/utils/string/GetLeafKey.js';
import CreateArrayTable from '../builders/createarraytable/CreateArrayTable.js';
import CreateListDetail from '../builders/createlistdetail/CreateListDetail.js';

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

    var isRootTarget = (!bindingKey) || (bindingKey === '');

    if (!config.title) {
        // Display leaf key as title
        if (!isRootTarget) {
            config.title = GetLeafKey(bindingKey);
        } else {
            config.title = 'Root';
        }
    }

    if (!isRootTarget) {
        config.value = GetValue(target, bindingKey, undefined) || [];
    } else {
        config.value = target;
    }

    var arrayTableStyle = GetValue(this.styles, 'arrayTable') || {};
    arrayTableStyle.tweaker = this.styles;
    arrayTableStyle.root = this.root;

    var createArrayTableCallback;
    var view = GetValue(config, 'view', 'inline');
    if (view === 'detail') {  // Default detail view is vertical
        view = 'detail-v';
    }
    view = view.toLowerCase();
    config.view = view;
    switch (view) {
        case 'detail-v':  // vertical
        case 'detail-h':  // horizontal
            // detail mode is only for object item
            var properties = config.$properties;
            var isObjectItem = Array.isArray(properties) && (properties.length >= 1) && properties[0].hasOwnProperty('$key');
            if (isObjectItem) {
                createArrayTableCallback = CreateListDetail;
            } else {
                createArrayTableCallback = CreateArrayTable;
            }
            break;

        case 'inline':
        default:
            createArrayTableCallback = CreateArrayTable;
            break;
    }
    var arrayTable = createArrayTableCallback(this, config, arrayTableStyle);

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
