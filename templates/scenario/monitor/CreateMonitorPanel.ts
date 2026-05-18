import Tweaker from '../../ui/tweaker/Tweaker';
import { GetTweakStyle } from './TweakerStyle';

var CreateMonitorPanel = function(scene?: any, style?: any, target?: any, properties?: any) {
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