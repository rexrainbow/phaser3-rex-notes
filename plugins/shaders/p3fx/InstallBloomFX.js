import GetGame from '../../utils/system/GetGame.js';
import RegisterFilter from '../../utils/renderer/filterpluginbase/RegisterFilter.js';
import AddFilterListMethod from '../../utils/renderer/AddFilterListMethod.js';
import BloomFilter from '../bloom/BloomStepFilter.js';
import BloomController from '../bloom/BloomController.js';


var InstallBloomFX = function (game) {
    game = GetGame(game);

    var success = RegisterFilter(game, BloomFilter);
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

    return true;
}

export default InstallBloomFX;

export { BloomController };
