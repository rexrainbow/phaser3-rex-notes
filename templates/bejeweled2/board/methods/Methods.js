import Clear from './Clear.js';
import Init from './Init.js';
import Reset from './Reset.js';
import CreateChess from '../chess/CreateChess.js';
import FillActivateArea from './FillActivateArea.js';
import FillPrepareRow from './FillPrepareRow.js';
import BreakMatch3 from './BreakMatch3.js';
import PreTest from './PreTest.js';
import GetAllMatch from '../match/GetAllMatch.js';
import GetChessArray from './GetChessArray.js';
import DumpSymbols from './DumpSymbols.js';
import MaskMethods from './MaskMethods.js';
import ActivateAreaMethods from './ActivateAreaMethods.js';

var Methods = {
    clear: Clear,
    init: Init,
    reset: Reset,
    createChess: CreateChess,
    fillActivateArea: FillActivateArea,
    fillPrepareRow: FillPrepareRow,
    breakMatch3: BreakMatch3,
    preTest: PreTest,
    getAllMatch: GetAllMatch,
    getChessArray: GetChessArray,
    dumpSymbols: DumpSymbols,
}

Object.assign(
    Methods,
    MaskMethods,
    ActivateAreaMethods,
)

export default Methods;