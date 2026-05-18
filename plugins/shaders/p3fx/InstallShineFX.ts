import GetGame from '../../utils/system/GetGame';
import RegisterFilter from '../../utils/renderer/filterpluginbase/RegisterFilter';
import AddFilterListMethod from '../../utils/renderer/AddFilterListMethod';
import ShineFilter from '../shine/ShineFilter';
import ShineController from '../shine/ShineController';


var InstallShineFX = function(game?: any) {
    game = GetGame(game);

    var success = RegisterFilter(game, ShineFilter);
    if (!success) {
        return false;
    }

    AddFilterListMethod(
        'addP3Shine',
        function(speed?: any, lineWidth?: any, gradient?: any, reveal?: any) {
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