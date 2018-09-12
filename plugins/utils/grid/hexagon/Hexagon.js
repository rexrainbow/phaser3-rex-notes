// https://www.redblobgames.com/grids/hexagons/

import CONST from './const.js';
import GetWorldX from './GetWorldX.js';
import GetWorldY from './GetWorldY.js';
import GetTileX from './GetTileX.js';
import GetTileY from './GetTileY.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;


class Hexagon {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setOriginPosition(GetValue(o, 'x', 0), GetValue(o, 'y', 0));
        this.setCellSize(GetValue(o, 'cellWidth', 0), GetValue(o, 'cellHeight', 0));
        this.setType(GetValue(o, 'staggeraxis', 1), GetValue(o, 'staggerindex', 1));
    }

    setOriginPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setCellSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }

    get cellWidth() {
        return this.width;
    }

    set cellWidth(value) {
        this.width = value;
    }

    get cellHeight() {
        return this.height;
    }

    set cellHieght(value) {
        this.height = value;
    }

    setType(staggeraxis, staggerindex) {
        if (typeof (staggeraxis) === 'string') {
            staggeraxis = STAGGERAXIS[staggeraxis]
        }
        if (typeof (staggerindex) === 'string') {
            staggerindex = STAGGERINDEX[staggerindex]
        }
        this.staggeraxis = staggeraxis; // y(flat), or x(pointy)
        this.staggerindex = staggerindex; // even, or odd

        if (staggeraxis === 0) { // flat
            this.mode = (staggerindex === 0) ? EVEN_Q : ODD_Q;
        } else { // pointy
            this.mode = (staggerindex === 0) ? EVEN_R : ODD_R;
        }
        return this;
    }
}

var methods = {
    getWorldX: GetWorldX,
    getWorldY: GetWorldY,
    getTileX: GetTileX,
    getTileY: GetTileY
}
Object.assign(
    Hexagon.prototype,
    methods
);

const STAGGERAXIS = {
    'y': 0,
    'x': 1
};

const STAGGERINDEX = {
    'even': 0,
    'odd': 1
}

export default Hexagon;