import Buttons from '../../../buttons/Buttons.js';
import FixWidthButtons from '../../../fixwidthbuttons/FixWidthButtons.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateButtons = function (scene, config) {
    var wrap = GetValue(config, 'wrap', false);
    var ButtonClass = (wrap) ? FixWidthButtons : Buttons;
    var gameObject = new ButtonClass(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateButtons;