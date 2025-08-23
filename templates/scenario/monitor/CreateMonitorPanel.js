import Tweaker from '../../ui/tweaker/Tweaker.js';
import { GetTweakStyle } from './TweakerStyle.js';

var CreateMonitorPanel = function (scene, style, target, properties) {
    var topPanel = new Tweaker(scene, GetTweakStyle(style));
    scene.add.existing(topPanel);

    var monitorPanel;
    if (topPanel.minHeight > 0) {
        monitorPanel = topPanel.addScrollable();
    } else {
        monitorPanel = topPanel;
    }

    monitorPanel.addRows(properties, target, true);

    return topPanel;
}

export default CreateMonitorPanel;