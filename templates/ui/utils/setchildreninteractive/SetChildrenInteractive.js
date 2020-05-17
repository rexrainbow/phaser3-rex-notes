import ClickChild from './ClickChild.js';
import OverChild from './OverChild.js';
import TapChild from './TapChild.js';
import PressChild from './PressChild.js';
import SwipeChild from './SwipeChild.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SetInteractive = function (config) {
    this.eventEmitter = GetValue(config, 'eventEmitter', this);
    this.inputEventPrefix = GetValue(config, 'inputEventPrefix', 'child.');
    this.groupName = GetValue(config, 'groupName', undefined);

    this.setInteractive();

    ClickChild.call(this, config);
    OverChild.call(this, config);
    TapChild.call(this, config);
    PressChild.call(this, config);
    SwipeChild.call(this, config);

    return this;
}

export default SetInteractive;