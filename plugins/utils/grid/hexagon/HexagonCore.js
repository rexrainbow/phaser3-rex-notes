'use strict'

// https://www.redblobgames.com/grids/hexagons/

import CONST from './const.js';
import GetWorldX from './GetWorldX.js';
import GetWorldY from './GetWorldY.js';

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
        this.setCellSize(GetValue(o, 'cellWidth', 33), GetValue(o, 'cellHeight', 42));
        this.setType(GetValue(o, 'type', 0), GetValue(o, 'indent', false));
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

    setType(type, indent) {
        if (typeof (type) === 'string') {
            type = ORIENTATIONTYPE[type]
        }
        this.type = type; // flat, or pointy
        this.indent = indent; // indent first row/column, or not

        if (type === 0) { // flat
            this.mode = (indent) ? EVEN_Q : ODD_Q;
        } else { // pointy
            this.mode = (indent) ? EVEN_R : ODD_R;
        }
        return this;
    }

    getWorldX(tileX, tileY) {
        return GetWorldX(this, tileX, tileY);
    }

    getWorldY(tileX, tileY) {
        return GetWorldY(this, tileX, tileY);
    }
}

const ORIENTATIONTYPE = {
    'flat': 0,
    'vertical': 0,
    'pointy': 1,
    'horizontal': 1
};

export default Hexagon;