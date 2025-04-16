import GetGame from '../../utils/system/GetGame.js';
import RegisterFilter from '../../utils/renderer/filterpluginbase/RegisterFilter.js';
import AddFilterListMethod from '../../utils/renderer/AddFilterListMethod.js';
import VignetteFilter from '../vignette/VignetteFilter.js';
import VignetteController from '../vignette/VignetteController.js';


var InstallVignetteFX = function (game) {
    game = GetGame(game);

    var success = RegisterFilter(game, VignetteFilter);
    if (!success) {
        return false;
    }

    AddFilterListMethod(
        'addP3Vignette',
        function (x, y, radius, strength) {
            if (x === undefined) { x = 0.5; }
            if (y === undefined) { y = 0.5; }
            if (radius === undefined) { radius = 0.5; }
            if (strength === undefined) { strength = 0.5; }

            return this.add(new VignetteController(
                this.camera,
                { x, y, radius, strength }
            ));
        }
    );

    return true;
}

export default InstallVignetteFX;

export { VignetteController };
