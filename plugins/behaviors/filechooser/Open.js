import GetGame from '../../utils/system/GetGame.js';
import CreateFileInput from './CreateFileInput.js';
import { WaitEvent } from '../../utils/promise/WaitEvent.js'
import Delay from '../../utils/promise/Delay.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveFromDOM = Phaser.DOM.RemoveFromDOM;

var Open = function (game, config) {
    // game: game, scene, or game object
    var delayTime = GetValue(config, 'delay', 200);
    var fileInput = CreateFileInput(game, config);
    fileInput.click();
    return WaitEvent(GetGame(game).events, 'focus')
        .then(function () {
            return Delay(delayTime);
        })
        .then(function () {
            var result = {
                files: fileInput.files
            }

            RemoveFromDOM(fileInput);
            fileInput.remove();
            return Promise.resolve(result);
        })
}

export default Open;