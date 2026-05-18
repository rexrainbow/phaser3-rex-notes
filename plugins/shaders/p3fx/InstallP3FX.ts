import InstallCircleFX from './InstallCircleFX';
import InstallGradientFX from './InstallGradientFX';
import InstallShineFX from './InstallShineFX';
import { CircleController } from './InstallCircleFX';
import { GradientController } from './InstallGradientFX';
import { ShineController } from './InstallShineFX';


var InstallCallbacks = [
    InstallCircleFX,
    InstallGradientFX,
    InstallShineFX,
]

var InstallP3FX = function(game?: any) {
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