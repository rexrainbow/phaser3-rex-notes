import Methods from './methods/Methods';
import Pool from '../../../../pool';

import { Utils as PhaserUtils } from 'phaser';
const GetFastValue = PhaserUtils.Objects.GetFastValue;

var PensPool = new Pool(); // default pens pool
var LinesPool = new Pool(); // default lines pool

class PenManager {
    bitmapText: any;
    clear: any;
    lines: any;
    LinesPool: any;
    maxLinesWidth: any;
    pens: any;
    PensPool: any;

    constructor(bitmapText?: any, config?: any) {
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