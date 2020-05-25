import ClickChild from './ClickChild.js';
import OverChild from './OverChild.js';
import TapChild from './TapChild.js';
import PressChild from './PressChild.js';
import SwipeChild from './SwipeChild.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SetChildrenInteractive = function (gameObject, config) {
    gameObject.setInteractive();

    gameObject.eventEmitter = GetValue(config, 'eventEmitter', gameObject);
    gameObject.input.targetSizers = GetValue(config, 'targets', [gameObject]);
    gameObject.input.eventNamePrefix = GetValue(config, 'inputEventPrefix', 'child.');

    ClickChild.call(gameObject, config);
    OverChild.call(gameObject, config);
    TapChild.call(gameObject, config);
    PressChild.call(gameObject, config);
    SwipeChild.call(gameObject, config);

    return gameObject;
}

export default SetChildrenInteractive;