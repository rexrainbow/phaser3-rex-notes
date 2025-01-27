import Init from './Init.js'
import Reset from './Reset.js';
import CreateChess from '../chess/CreateChess.js';
import Fill from './Fill.js';
import BreakMatch3 from './BreakMatch3.js';
import PreTest from './PreTest.js';
import GetAllMatch from '../match/GetAllMatch.js';
import GetChessArray from './GetChessArray.js';
import DumpSymbols from './DumpSymbols.js';

var Methods = {
    init: Init,
    reset: Reset,
    createChess: CreateChess,
    fill: Fill,
    breakMatch3: BreakMatch3,
    preTest: PreTest,
    getAllMatch: GetAllMatch,
    getChessArray: GetChessArray,
    dumpSymbols: DumpSymbols,
}

export default Methods;