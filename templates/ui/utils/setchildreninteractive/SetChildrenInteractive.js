import ClickChild from './ClickChild.js';
import OverChild from './OverChild.js';
import TapChild from './TapChild.js';
import PressChild from './PressChild.js';
import SwipeChild from './SwipeChild.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SetChildrenInteractive = function (config) {
    this.setInteractive();

    this.eventEmitter = GetValue(config, 'eventEmitter', this);
    this.input.parentSizers = GetValue(config, 'parents', [this]);
    this.input.eventNamePrefix = GetValue(config, 'inputEventPrefix', 'child.');    

    ClickChild.call(this, config);
    OverChild.call(this, config);
    TapChild.call(this, config);
    PressChild.call(this, config);
    SwipeChild.call(this, config);

    return this;
}

export default SetChildrenInteractive;