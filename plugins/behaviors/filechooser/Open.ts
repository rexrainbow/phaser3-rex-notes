// Note: Not working in iOS9+

import { Utils as PhaserUtils, DOM as PhaserDOM } from 'phaser';
import CreateFileInput from './CreateFileInput';
import ClickPromise from '../../gameobjects/dom/filechooser/ClickPromise';

const GetValue = PhaserUtils.Objects.GetValue;
const RemoveFromDOM = PhaserDOM.RemoveFromDOM;

var Open = function(game?: any, config?: any) {
    // game: game, scene, or game object
    var closeDelay = GetValue(config, 'closeDelay', 200);
    var fileInput = CreateFileInput(game, config);
    fileInput.click();
    return ClickPromise({ game, fileInput, closeDelay })
        .then(function(result?: any) {
            RemoveFromDOM(fileInput);
            fileInput.remove();
            return Promise.resolve(result);
        })
}

export default Open;