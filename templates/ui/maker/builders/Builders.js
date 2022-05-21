import CreateImage from './CreateImage.js';
import CreateText from './CreateText.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';
import CreateNinePatch from './CreateNinePatch.js';
import CreateNinePatch2 from './CreateNinePatch2.js';

import CreateSizer from './CreateSizer.js';
import CreateLabel from './CreateLabel.js';
import CreateSlider from './CreateSlider.js';

var Builders = {
    image: CreateImage,
    text: CreateText,
    roundrectangle: CreateRoundRectangle,
    ninepatch: CreateNinePatch,
    ninepatch2: CreateNinePatch2,

    sizer: CreateSizer,
    label: CreateLabel,
    slider: CreateSlider
};

/*
function(scene, data, view, styles, customBuilders) {
    return gameObject;
}
*/

export default Builders;