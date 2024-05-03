import { Tweaker } from '../../ui/ui-components.js';
import { GetTweakStyle } from './TweakerStyle.js';
import DeepClone from '../../../plugins/utils/object/DeepClone.js'

var CreateMonitorPanel = function (scene, style, target, properties) {
    var panel = new Tweaker(scene, GetTweakStyle(style));
    scene.add.existing(panel);

    AddProperties(panel, target, DeepClone(properties));

    return panel;
}

var AddProperties = function (panel, target, properties) {
    if (!properties) {
        return;
    }

    for (var i = 0, cnt = properties.length; i < cnt; i++) {
        var property = properties[i];
        var type = property.$type;
        switch (type) {
            case 'folder':
                panel = panel.addFolder(property);
                AddProperties(panel, target, property.$properties);
                break;

            case 'tab':
                var pages = panel.addTab(property);
                for (var p = 0, pcnt = pages.length; p < pcnt; p++) {
                    AddProperties(pages[p], target, property.pages[p].$properties);
                }
                break;

            default:
                if (property.$key.indexOf('.') === -1) {
                    property.bindingTarget = target;
                    property.bindingKey = property.$key;

                } else {
                    var keys = property.$key.split('.');
                    property.bindingKey = keys.pop();

                    var bindingTarget = target;
                    for (var k = 0, kcnt = keys.length; k < kcnt; k++) {
                        bindingTarget = bindingTarget[keys[k]];
                        if (!target) {
                            console.warn(`[Monitor] Key path '${property.$key}' is invalid`)
                            return;
                        }
                    }
                    property.bindingTarget = bindingTarget;

                }

                if (!property.hasOwnProperty('monitor')) {
                    property.monitor = true;
                }
                panel.addInput(property);
                break;
        }

    }
}

export default CreateMonitorPanel;