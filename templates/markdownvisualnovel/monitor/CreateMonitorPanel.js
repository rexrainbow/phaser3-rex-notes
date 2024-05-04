import { Tweaker } from '../../ui/ui-components.js';
import { GetTweakStyle } from './TweakerStyle.js';
import DeepClone from '../../../plugins/utils/object/DeepClone.js'

var CreateMonitorPanel = function (scene, style, target, properties) {
    var panel = new Tweaker(scene, GetTweakStyle(style));
    scene.add.existing(panel);

    panel.addRows(DeepClone(properties), target);

    return panel;
}

export default CreateMonitorPanel;