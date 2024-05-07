import { Tweaker } from '../../ui/ui-components.js';
import { GetTweakStyle } from './TweakerStyle.js';

var CreateMonitorPanel = function (scene, style, target, properties) {
    var panel = new Tweaker(scene, GetTweakStyle(style));
    scene.add.existing(panel);

    panel.addRows(properties, target, true);

    return panel;
}

export default CreateMonitorPanel;