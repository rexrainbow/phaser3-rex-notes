import SetRadioType from './SetRadioType.js';
import SetCheckboxesType from './SetCheckboxesType.js';

const GetValue = Phaser.Utils.Objects.GetValue;

const SetTypeCallbacks = {
    radio: SetRadioType,
    checkboxes: SetCheckboxesType
}

var SetType = function (config) {
    var type = GetValue(config, 'type', undefined);
    if (type && SetTypeCallbacks.hasOwnProperty(type)) {
        SetTypeCallbacks[type].call(this, config);
    }
}

export default SetType;