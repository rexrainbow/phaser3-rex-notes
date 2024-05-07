import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

var AddRows = function (properties, target) {
    AddProperties(this, DeepClone(properties), target);
    return this;
}

var AddProperties = function (tweaker, properties, target) {
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
                AddProperties(folder, property.$properties, target);
                break;

            case 'tab':
                var pages = tweaker.addTab(property);
                for (var pIdx = 0, pcnt = pages.length; pIdx < pcnt; pIdx++) {
                    AddProperties(pages[pIdx], property.pages[pIdx].$properties, target);
                }
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
                    property.monitor = true;
                }
                tweaker.addInput(property);
                break;
        }

    }
}

export default AddRows;

