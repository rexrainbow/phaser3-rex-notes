import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

var AddRows = function (properties, target, monitor) {
    if (typeof (target) === 'boolean') {
        monitor = target;
        target = undefined;
    }

    if (monitor === undefined) {
        monitor = true;
    }

    AddProperties(this, DeepClone(properties), target, monitor);
    return this;
}

var AddProperties = function (tweaker, properties, target, monitor) {
    if (!properties) {
        return;
    }

    for (var i = 0, cnt = properties.length; i < cnt; i++) {
        var property = properties[i];

        if (property.hasOwnProperty('$target')) {
            target = property.$target;
            delete property.$target;
        }

        var type = property.$type;
        delete property.$type;

        switch (type) {
            case 'folder':
                var folder = tweaker.addFolder(property);
                AddProperties(folder, property.$properties, target, monitor);
                break;

            case 'tab':
                var pages = tweaker.addTab(property);
                for (var pIdx = 0, pcnt = pages.length; pIdx < pcnt; pIdx++) {
                    AddProperties(pages[pIdx], property.pages[pIdx].$properties, target, monitor);
                }
                break;

            case 'columns':
                var columns = tweaker.addColumns(property);
                for (var pIdx = 0, pcnt = columns.length; pIdx < pcnt; pIdx++) {
                    AddProperties(columns[pIdx], property.columns[pIdx].$properties, target, monitor);
                }
                break;

            case 'scrollable':
                var scrollable = tweaker.addScrollable(property);
                AddProperties(scrollable, property.$properties, target, monitor);
                break;

            case 'separator':
                tweaker.addSeparator();
                break;

            case 'button':
                property.bindingTarget = target;
                tweaker.addButton(property);
                break;

            case 'buttons':
                property.bindingTarget = target;
                tweaker.addButtons(property);
                break;

            default:
                var key = property.$key;
                delete property.$key;
                if (key.indexOf('.') === -1) {
                    property.bindingTarget = target;
                    property.bindingKey = key;

                } else {
                    var keys = key.split('.');

                    property.bindingKey = keys.pop();

                    var bindingTarget = target;
                    for (var k = 0, kcnt = keys.length; k < kcnt; k++) {
                        bindingTarget = bindingTarget[keys[k]];
                        if (!target) {
                            console.warn(`[Monitor] Key path '${key}' is invalid`)
                            continue;
                        }
                    }
                    property.bindingTarget = bindingTarget;

                }

                if (!property.hasOwnProperty('monitor')) {
                    property.monitor = monitor;
                }
                tweaker.addInput(property);
                break;
        }

    }
}

export default AddRows;

