import Click from '../../click/Click.js';
import GetClickTarget from './GetClickTarget.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateClickBehavior = function (parent, config) {
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