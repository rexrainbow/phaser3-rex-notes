import CreateImage from './CreateImage.js';
import CreateText from './CreateText.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';

import CreateSizer from './CreateSizer.js';
import CreateLabel from './CreateLabel.js';

var MakeCallbacks = {
    image: CreateImage,
    text: CreateText,
    roundrectangle: CreateRoundRectangle,

    sizer: CreateSizer,
    label: CreateLabel,
};

export default MakeCallbacks;