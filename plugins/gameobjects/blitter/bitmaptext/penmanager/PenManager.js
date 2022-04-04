import Pool from '../../../../pool.js';

var PensPool = new Pool(); // default pens pool
var LinesPool = new Pool(); // default lines pool

class PenManager {
    constructor(blitter) {
        this.blitter = blitter;
        this.pens = [];
        this.lines = []; // pens in lines [ [],[],[],.. ]
        this.maxLinesWidth = undefined;

        this.PensPool = GetFastValue(config, 'pensPool', PensPool);
        this.LinesPool = GetFastValue(config, 'linesPool', LinesPool);
    }

    destroy() {
        this.clear();
    }

    clear() {
        // 1. Remove/recycle all children of blitter
        this.blitter.removeChildren();
        // 2. Destroy all pens. 
        for (var i = 0, cnt = this.pens.length; i < cnt; i++) {
            this.pens[i].destroy();
        }
        // 3. Free all lines
        for (var i = 0, len = this.lines.length; i < len; i++) {
            this.lines[i].length = 0;
        }

        // 4. 
        this.PensPool.pushMultiple(this.pens);
        this.LinesPool.pushMultiple(this.lines);
        this.maxLinesWidth = undefined;
    }



}

export default PenManager;