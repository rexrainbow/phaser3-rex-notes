import CreateImage from './CreateImage.js';
import CreateText from './CreateText.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';
import CreateNinePatch from './CreateNinePatch.js';
import CreateNinePatch2 from './CreateNinePatch2.js';

import CreateSizer from './CreateSizer.js';
import CreateLabel from './CreateLabel.js';
import CreateDialog from './CreateDialog.js';
import CreateSlider from './CreateSlider.js';

var Builders = {
    Image: CreateImage,
    Text: CreateText,
    RoundRectangle: CreateRoundRectangle,
    Ninepatch: CreateNinePatch,
    Ninepatch2: CreateNinePatch2,

    Sizer: CreateSizer,
    Label: CreateLabel,
    Dialog: CreateDialog,
    Slider: CreateSlider
};

/*
function(scene, data, view, styles, customBuilders) {
    return gameObject;
}
*/

export default Builders;