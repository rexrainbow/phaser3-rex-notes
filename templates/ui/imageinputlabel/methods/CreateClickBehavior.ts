import Click from '../../click/Click';
import GetClickTarget from './GetClickTarget';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateClickBehavior = function(parent?: any, config?: any) {
    var clickTarget = GetClickTarget(parent, config);
    if (!clickTarget) {
        return undefined;
    }

    var clickConfig = GetValue(config, 'click');
    var clickBehavior = new Click(clickTarget, clickConfig);
    clickBehavior.on('click', parent.open, parent);

    return clickBehavior;
}
export default CreateClickBehavior;