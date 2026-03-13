import CreateArrayTable from '../builders/createarraytable/CreateArrayTable.js';

var SetArrayTableReadOnly = function (gameObject, readOnly) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    var arrayTable = gameObject.childrenMap.arrayTable;
    arrayTable.setReadOnly(readOnly);
}

var CreateDefaultNumberItem = function () { return 0; }
var CreateDefaultStringItem = function () { return ''; }

export default {
    name: 'ArrayInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            var view = config.view;
            return (view === 'numbers') || (view === 'strings') || (view === 'array');
        }

        var value = config.value;
        if (Array.isArray(value)) {
            var arrayType = typeof (value[0]);
            switch (arrayType) {
                case 'number':
                    config.view = 'numbers';
                    break;

                case 'strig':
                    config.view = 'strings';
                    break;

                default:
                    config.view = 'array';
                    break;
            }

            return true;
        } else {
            return false;
        };
    },

    // Callback after `constructor()`
    build(gameObject, config, inputRowStyle, styles) {
        this.type = 'rexTweaker.ArrayInput';

        var arrayTableConfig = inputRowStyle.arrayTable || styles.arrayTable || {};

        if (!config.hasOwnProperty('createDefaultItem')) {
            var view = config.view;
            if (view === 'numbers') {
                config.createDefaultItem = CreateDefaultNumberItem;
            } else if (view === 'numbers') {
                config.createDefaultItem = CreateDefaultStringItem;
            }
        }

        var arrayTable = CreateArrayTable(gameObject.tweaker, config, arrayTableConfig)
            .setTitle(); // Hide title

        gameObject.add(
            arrayTable,
            { proportion: 1, expand: true, key: 'arrayTable' }
        )

        // Set layout to vertical by default
        if (!arrayTableConfig.hasOwnProperty('orientation') && !config.hasOwnProperty('orientation')) {
            config.orientation = 1;
        }
    },

    // Callback inside `setup()`
    setup(gameObject, config, setDefaults) {
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var arrayTable = gameObject.childrenMap.arrayTable;
        arrayTable.setItems(value, true);
    },

    // Callback inside `setBindingTarget()`
    onBindTarget(gameObject) {
        var arrayTable = gameObject.childrenMap.arrayTable;
        arrayTable.scrollToTop();
    },

    setReadOnly(gameObject, readOnly) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetArrayTableReadOnly(gameObject, readOnly);
    }
}