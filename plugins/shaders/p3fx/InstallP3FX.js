import InstallCircleFX from './InstallCircleFX.js';
import InstallGradientFX from './InstallGradientFX.js';
import InstallShineFX from './InstallShineFX.js';
import { CircleController } from './InstallCircleFX.js';
import { GradientController } from './InstallGradientFX.js';
import { ShineController } from './InstallShineFX.js';


var InstallCallbacks = [
    InstallCircleFX,
    InstallGradientFX,
    InstallShineFX,
]

var InstallP3FX = function (game) {
    var success = false;
    for (var i = 0, cnt = InstallCallbacks.length; i < cnt; i++) {
        success = InstallCallbacks[i](game) | success;
    }
    return success;
}

export default InstallP3FX;

export {
    CircleController, GradientController, ShineController, 
}
