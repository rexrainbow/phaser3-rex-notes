import GetGame from '../../utils/system/GetGame.js';
import RegisterFilter from '../../utils/renderer/filterpluginbase/RegisterFilter.js';
import AddFilterListMethod from '../../utils/renderer/AddFilterListMethod.js';
import WipeFilter from '../wipe/WipeFilter.js';
import WipeController from '../wipe/WipeController.js';


var InstallWipeFX = function (game) {
    game = GetGame(game);

    var success = RegisterFilter(game, WipeFilter);
    if (!success) {
        return false;
    }

    AddFilterListMethod(
        'addP3Wipe',
        function (wipeWidth, direction, axis) {
            if (wipeWidth === undefined) { wipeWidth = 0.1; }
            if (direction === undefined) { direction = 0; }
            if (axis === undefined) { axis = 0; }

            return this.add(new WipeController(
                this.camera,
                { wipeWidth, direction, axis }
            ));
        }
    );

    AddFilterListMethod(
        'addP3Reveal',
        function (wipeWidth, direction, axis) {
            if (wipeWidth === undefined) { wipeWidth = 0.1; }
            if (direction === undefined) { direction = 0; }
            if (axis === undefined) { axis = 0; }

            return this.add(new WipeController(
                this.camera,
                { wipeWidth, direction, axis, reveal: true }
            ));
        }
    );

    return true;
}

export default InstallWipeFX;

export { WipeController };
