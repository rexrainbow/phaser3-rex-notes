import GetGame from '../../utils/system/GetGame.js';
import RegisterFilter from '../../utils/renderer/filterpluginbase/RegisterFilter.js';
import AddFilterListMethod from '../../utils/renderer/AddFilterListMethod.js';
import ShineFilter from '../shine/ShineFilter.js';
import ShineController from '../shine/ShineController.js';


var InstallShineFX = function (game) {
    game = GetGame(game);

    var success = RegisterFilter(game, ShineFilter);
    if (!success) {
        return false;
    }

    AddFilterListMethod(
        'addP3Shine',
        function (speed, lineWidth, gradient, reveal) {
            if (speed === undefined) { speed = 0.5; }
            if (lineWidth === undefined) { lineWidth = 0.5; }
            if (gradient === undefined) { gradient = 3; }
            if (reveal === undefined) { reveal = false; }

            return this.add(new ShineController(
                this.camera,
                { speed, lineWidth, gradient, reveal }
            ));
        }
    );

    return true;
}

export default InstallShineFX;

export { ShineController };
