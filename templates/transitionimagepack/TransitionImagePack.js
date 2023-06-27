import Base from "../../plugins/transitionimage.js";
import AddSlideAwayModes from "./transitionmodes/AddSlideAwayModes.js";
import AddSlideModes from "./transitionmodes/AddSlideModes.js";
import AddPushModes from './transitionmodes/AddPushModes.js';
import AddZoomModes from "./transitionmodes/AddZoomModes.js";
import AddPixellateMode from './transitionmodes/AddPixellateMode.js';
import AddFadeMode from "./transitionmodes/AddFadeMode.js";

var AddModeCallbacks = [
    AddSlideAwayModes, AddSlideModes, AddPushModes,
    AddZoomModes,
    AddPixellateMode, AddFadeMode,
];

class TransitionImagePack extends Base {
    constructor(scene, x, y, texture, frame, config) {
        super(scene, x, y, texture, frame, config);

        for (var i = 0, cnt = AddModeCallbacks.length; i < cnt; i++) {
            AddModeCallbacks[i](this);
        }
    }
}

export default TransitionImagePack;