import GetWorldXY from './GetWorldXY';
import GetWorldX from './GetWorldX';
import GetWorldY from './GetWorldY';
import GetTileXY from './GetTileXY';
import GetTileX from './GetTileX';
import GetTileY from './GetTileY';
import GetValue from '../../object/GetValue';

class Quad {
    mode: any;

    _halfHeight: any;
    _halfWidth: any;
    _height: any;
    _width: any;
    directions: any;
    x: any;
    y: any;

    constructor(config?: any) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        this.setType(GetValue(o, 'type', 0));
        this.setDirectionMode(GetValue(o, 'dir', 4));
        this.setOriginPosition(GetValue(o, 'x', 0), GetValue(o, 'y', 0));
        this.setCellSize(GetValue(o, 'cellWidth', 0), GetValue(o, 'cellHeight', 0));
    }

    setType(type?: any) {
        if (typeof (type) === 'string') {
            type = ORIENTATIONTYPE[type]
        }
        this.mode = type; // orthogonal, isometric, or staggered
        return this;
    }

    setDirectionMode(mode?: any) {
        if (typeof (mode) === 'string') {
            mode = DIRMODE[mode];
        }

        this.directions = mode;
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
    Quad.prototype,
    methods
);

const ORIENTATIONTYPE = {
    'orthogonal': 0,
    'isometric': 1,
    'staggered': 2
};

const DIRMODE = {
    '4dir': 4,
    '8dir': 8
}

export default Quad;