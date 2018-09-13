import Quad from 'rexPlugins/utils/grid/quad/Quad.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class QuadGrid extends Quad {
    constructor(config) {
        super(config);
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setDirectionMode(GetValue(o, 'dir', 4));
    }

    setDirectionMode(mode) {
        if (typeof (mode) === 'string') {
            mode = DIRMODE[mode];
        }
        this.directions = mode;
    }
}

const DIRMODE = {
    '4dir': 4,
    '8dir': 8
}

export default QuadGrid;