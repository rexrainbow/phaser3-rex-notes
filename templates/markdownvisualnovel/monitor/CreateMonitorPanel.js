import { Tweaker } from '../../ui/ui-components.js';
import { GetTweakStyle } from './TweakerStyle.js';

var CreateMonitorPanel = function (scene, style, target, properties) {
    var panel = new Tweaker(scene, GetTweakStyle(style));
    scene.add.existing(panel);

    AddProperties(panel, target, properties);

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
                AddProperties(panel, target[property.$key], property.$properties);
                break;

            case 'tab':
                var pages = panel.addTab(property);
                for (var p = 0, pcnt = pages.length; p < pcnt; p++) {
                    AddProperties(pages[p], target, property.pages[p].$properties);
                }
                break;

            default:
                property.bindingTarget = target;
                property.bindingKey = property.$key;
                if (!property.hasOwnProperty('monitor')) {
                    property.monitor = true;
                }
                panel.addInput(property);
                break;
        }

    }
}

export default CreateMonitorPanel;