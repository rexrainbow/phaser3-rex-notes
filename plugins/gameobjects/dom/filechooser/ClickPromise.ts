import GetGame from '../../../utils/system/GetGame';
import { WaitEvent } from '../../../utils/promise/WaitEvent'
import Delay from '../../../utils/promise/Delay';

var ClickPromise = function({ game, fileInput?: any, closeDelay }) {
    return WaitEvent(GetGame(game).events, 'focus')
        .then(function() {
            return Delay(closeDelay);
        })
        .then(function() {
            var result = {
                files: fileInput.files
            }

            return Promise.resolve(result);
        })
}

export default ClickPromise;