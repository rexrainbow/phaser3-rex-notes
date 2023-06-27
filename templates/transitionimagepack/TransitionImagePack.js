import Base from "../../plugins/transitionimage.js";
import AddSliderModes from "./transitionmodes/AddSlideModes.js";

var AddModeCallbacks = [AddSliderModes];

class TransitionImagePack extends Base {
    constructor(scene, x, y, texture, frame, config) {
        super(scene, x, y, texture, frame, config);

        for (var i = 0, cnt = AddModeCallbacks.length; i < cnt; i++) {
            AddModeCallbacks[i](this);
        }
    }
}

export default TransitionImagePack;