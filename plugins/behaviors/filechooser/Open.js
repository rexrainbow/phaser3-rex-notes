import CreateHiddenFileInput from './CreateHiddenFileInput.js';
import { WaitEvent } from '../../utils/promise/WaitEvent.js'
import Delay from '../../utils/promise/Delay.js';

var Open = function (scene, config) {
    var fileInput = CreateHiddenFileInput(config);
    fileInput.click();
    return WaitEvent(scene.game.events, 'focus')
        .then(function () {
            return Delay(60); // ??
        })
        .then(function () {
            var result = {
                files: fileInput.files
            }
            fileInput.remove();
            fileInput = null;
            return Promise.resolve(result);
        })
}

export default Open;