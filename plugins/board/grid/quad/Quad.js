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
        return this;
    }

    get fullDirections() {
        return (this.directions === 4) ? FULLDIR4 : FULLDIR8;
    }
    
    // board-match
    get halfDirections() {
        return (this.directions === 4) ? HALFDIR4 : HALFDIR8;
    }

    // getWorldX
    // getWorldY
    // getTileX
    // getTileY    
}

const FULLDIR4 = [0, 1, 2, 3];
const FULLDIR8 = [0, 1, 2, 3, 4, 5, 6, 7];
const HALFDIR4 = [0, 1];
const HALFDIR8 = [0, 1, 4, 5];

const DIRMODE = {
    '4dir': 4,
    '8dir': 8
}

export default QuadGrid;