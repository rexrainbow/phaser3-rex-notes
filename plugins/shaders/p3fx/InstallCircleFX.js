import GetGame from '../../utils/system/GetGame.js';
import RegisterFilter from '../../utils/renderer/filterpluginbase/RegisterFilter.js';
import AddFilterListMethod from '../../utils/renderer/AddFilterListMethod.js';
import CircleFilter from '../circle/CircleFilter.js';
import CircleController from '../circle/CircleController.js';


var InstallCircleFX = function (game) {
    game = GetGame(game);

    var success = RegisterFilter(game, CircleFilter);
    if (!success) {
        return false;
    }

    AddFilterListMethod(
        'addP3Bloom',
        function (color, offsetX, offsetY, blurStrength, strength, steps) {
            if (color === undefined) { color = 0xFFFFFF; }
            if (offsetX === undefined) { offsetX = 1; }
            if (offsetY === undefined) { offsetY = 1; }
            if (blurStrength === undefined) { blurStrength = 1; }
            if (strength === undefined) { strength = 1; }
            if (steps === undefined) { steps = 4; }

            return this.add(new BloomController(
                this.camera,
                { color, offsetX, offsetY, blurStrength, strength, steps }
            ));
        }
    );

    AddFilterListMethod(
        'addP3Circle',
        function (thickness, color, backgroundColor, scale, feather) {
            if (thickness === undefined) { thickness = 8; }
            if (color === undefined) { color = 0xFF33B2; }
            if (backgroundColor === undefined) { backgroundColor = 0xFF0000; }
            if (scale === undefined) { scale = 1; }
            if (feather === undefined) { feather = 0.005; }

            return this.add(new CircleController(
                this.camera,
                { thickness, color, backgroundColor, scale, feather }
            ));
        }
    );

    return true;
}

export default InstallCircleFX;

export { CircleController };
