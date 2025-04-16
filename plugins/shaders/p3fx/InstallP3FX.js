import InstallBloomFX from './InstallBloomFX.js';
import InstallCircleFX from './InstallCircleFX.js';
import InstallGradientFX from './InstallGradientFX.js';
import InstallShineFX from './InstallShineFX.js';
import InstallVignetteFX from './InstallVignetteFX.js';
import InstallWipeFX from './InstallWipeFX.js';
import { BloomController } from './InstallBloomFX.js';
import { CircleController } from './InstallCircleFX.js';
import { GradientController } from './InstallGradientFX.js';
import { ShineController } from './InstallShineFX.js';
import { VignetteController } from './InstallVignetteFX.js';
import { WipeController } from './InstallWipeFX.js';


var InstallP3FX = function (game) {

    var success = InstallBloomFX(game);
    if (!success) {
        return false;
    }

    InstallCircleFX(game);
    InstallGradientFX(game);
    InstallShineFX(game);
    InstallVignetteFX(game);
    InstallWipeFX(game);

    return true;
}

export default InstallP3FX;

export {
    BloomController, CircleController, GradientController, ShineController, VignetteController, WipeController
}
