import CreateImage from './CreateImage.js';
import CreateText from './CreateText.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';

import CreateLabel from './CreateLabel.js';

var MakeCallbacks = {
    image: CreateImage,
    text: CreateText,
    roundrectangle: CreateRoundRectangle,

    label: CreateLabel,
};

export default MakeCallbacks;