import CreateImage from './CreateImage.js';
import CreateText from './CreateText.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';
import CreateNinePatch from './CreateNinePatch.js';
import CreateNinePatch2 from './CreateNinePatch2.js';

import CreateSizer from './CreateSizer.js';
import CreateFixWidthSizer from './CreateFixwidthSizer.js';

import CreateLabel from './CreateLabel.js';
import CreateDialog from './CreateDialog.js';
import CreateButtons from './CreateButtons.js';
import CreateSlider from './CreateSlider.js';

var Builders = {
    Image: CreateImage,
    Text: CreateText,
    RoundRectangle: CreateRoundRectangle,
    Ninepatch: CreateNinePatch,
    Ninepatch2: CreateNinePatch2,

    Sizer: CreateSizer,
    FixWidthSizer: CreateFixWidthSizer,

    Label: CreateLabel,
    Dialog: CreateDialog,
    Buttons: CreateButtons,
    Slider: CreateSlider
};

/*
function(scene, data, view, styles, customBuilders) {
    return gameObject;
}
*/

export default Builders;