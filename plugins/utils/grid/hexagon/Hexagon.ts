// https://www.redblobgames.com/grids/hexagons/

import GetCellWidth from '../../../geom/hexagon/Width';
import GetCellHeight from '../../../geom/hexagon/Height';
import CONST from './const';
import GetWorldXY from './GetWorldXY';
import GetWorldX from './GetWorldX';
import GetWorldY from './GetWorldY';
import GetTileXY from './GetTileXY';
import GetTileX from './GetTileX';
import GetTileY from './GetTileY';
import GetValue from '../../object/GetValue';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

class Hexagon {
    staggeraxis: any;
    staggerindex: any;

    _halfHeight: any;
    _halfWidth: any;
    _height: any;
    _width: any;
    directions: any;
    mode: any;
    x: any;
    y: any;

    constructor(config?: any) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        this.setType(GetValue(o, 'staggeraxis', 1), GetValue(o, 'staggerindex', 1));
        this.setDirectionMode();
        this.setOriginPosition(GetValue(o, 'x', 0), GetValue(o, 'y', 0));
        var size = GetValue(o, 'size', undefined);
        if (size !== undefined) {
            this.setCellRadius(size);
        } else {
            this.setCellSize(GetValue(o, 'cellWidth', 0), GetValue(o, 'cellHeight', 0));
        }
    }

    setType(staggeraxis?: any, staggerindex?: any) {
        if (typeof (staggeraxis) === 'string') {
            staggeraxis = STAGGERAXIS[staggeraxis]
        }
        if (typeof (staggerindex) === 'string') {
            staggerindex = STAGGERINDEX[staggerindex]
        }
        this.staggeraxis = staggeraxis; // 0|y(flat), or 1|x(pointy)
        this.staggerindex = staggerindex; // even, or odd

        if (staggeraxis === 0) { // flat
            this.mode = (staggerindex === 0) ? EVEN_Q : ODD_Q;
        } else { // pointy
            this.mode = (staggerindex === 0) ? EVEN_R : ODD_R;
        }
        return this;
    }

    setDirectionMode() {
        this.directions = 6;
        return this;
    }

    setOriginPosition(x?: any, y?: any) {
        this.x = x;
        this.y = y;
        return this;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
        this._halfWidth = value / 2;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
        this._halfHeight = value / 2;
    }

    setCellSize(width?: any, height?: any) {
        this.width = width;
        this.height = height;
        return this;
    }

    setCellRadius(size?: any) {
        this.size = size;
        var hexagon = {
            size: this.size,
            type: this.staggeraxis
        }
        var cellWidth = GetCellWidth(hexagon);
        var cellHeight = GetCellHeight(hexagon);
        this.setCellSize(cellWidth, cellHeight);
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

    set cellHeight(value) {
        this.height = value;
    }
}

var methods = {
    getWorldXY: GetWorldXY,
    getWorldX: GetWorldX,
    getWorldY: GetWorldY,
    getTileXY: GetTileXY,
    getTileX: GetTileX,
    getTileY: GetTileY,
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