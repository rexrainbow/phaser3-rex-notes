import Methods from './methods/Methods.js';
import Pool from '../../../../pool.js';

import { Utils as PhaserUtils } from 'phaser';
const GetFastValue = PhaserUtils.Objects.GetFastValue;

var PensPool = new Pool(); // default pens pool
var LinesPool = new Pool(); // default lines pool

class PenManager {
    constructor(bitmapText, config) {
        this.bitmapText = bitmapText;
        this.pens = [];
        this.lines = []; // pens in lines [ [],[],[],.. ]
        this.maxLinesWidth = undefined;

        this.PensPool = GetFastValue(config, 'pensPool', PensPool);
        this.LinesPool = GetFastValue(config, 'linesPool', LinesPool);
    }

    destroy() {
        this.clear();
    }
}

Object.assign(
    PenManager.prototype,
    Methods
);

export default PenManager;