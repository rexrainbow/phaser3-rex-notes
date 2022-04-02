import Pool from '../../../../pool.js';

var CharactersPool = new Pool(); // default pens pool
var LinesPool = new Pool(); // default lines pool

class CharacterDataManager {
    constructor() {
        this.chars = [];
        this.lines = []; // pens in lines [ [],[],[],.. ]
        this.maxLinesWidth = undefined;

        this.CharsPool = GetFastValue(config, 'pensPool', CharactersPool);
        this.LinesPool = GetFastValue(config, 'linesPool', LinesPool);
    }

    destroy() {
        this.clear();
    }

    clear() {
        for (var i = 0, len = this.lines.length; i < len; i++) {
            this.lines[i].length = 0;
        }

        this.CharsPool.pushMultiple(this.chars);
        this.LinesPool.pushMultiple(this.lines);
        this.maxLinesWidth = undefined;
    }



}

export default CharacterDataManager;