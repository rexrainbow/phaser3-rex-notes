import SetChildrenInteractiveBase from '../../utils/setchildreninteractive/SetChildrenInteractive.js';

var SetChildrenInteractive = function (config) {
    if (config === undefined) {
        config = {};
    }
    config.targetMode = 'parent';
    config.targetSizers = [this];
    SetChildrenInteractiveBase(this, config);
    return this;
}
export default SetChildrenInteractive;