import GetGame from '../../utils/system/GetGame';
import RegisterFilter from '../../utils/renderer/filterpluginbase/RegisterFilter';
import AddFilterListMethod from '../../utils/renderer/AddFilterListMethod';
import GradientFilter from '../gradient/GradientFilter';
import GradientController from '../gradient/GradientController';


var InstallGradientFX = function(game?: any) {
    game = GetGame(game);

    var success = RegisterFilter(game, GradientFilter);;
    if (!success) {
        return false;
    }

    AddFilterListMethod(
        'addP3Gradient',
        function(color1?: any, color2?: any, alpha?: any, fromX?: any, fromY?: any, toX?: any, toY?: any, size?: any) {
            if (color1 === undefined) { color1 = 0xff0000; }
            if (color2 === undefined) { color2 = 0x00ff00; }
            if (alpha === undefined) { alpha = 0.2; }
            if (fromX === undefined) { fromX = 0; }
            if (fromY === undefined) { fromY = 0; }
            if (toX === undefined) { toX = 0; }
            if (toY === undefined) { toY = 1; }
            if (size === undefined) { size = 0; }

            return this.add(new GradientController(
                this.camera,
                { color1, color2, alpha, fromX, fromY, toX, toY, size }
            ));
        }
    );

    return true;
}

export default InstallGradientFX;

export { GradientController };