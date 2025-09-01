import GetChessMethods from './GetChessMethods.js';
import Clear from './Clear.js';
import Init from './Init.js';
import Reset from './Reset.js';
import CreateChess from '../chess/CreateChess.js';
import FillActivateArea from './FillActivateArea.js'
import FillPrepareRows from './FillPrepareRows.js';
import BreakMatch3 from './BreakMatch3.js';
import PreTest from './PreTest.js';
import GetAllMatch from '../match/GetAllMatch.js';
import DumpSymbols from './DumpSymbols.js';
import MaskMethods from './MaskMethods.js';
import ActivateAreaMethods from './ActivateAreaMethods.js';

var Methods = {
    clear: Clear,
    init: Init,
    reset: Reset,
    createChess: CreateChess,
    fillActivateArea: FillActivateArea,
    fillPrepareRows: FillPrepareRows,
    breakMatch3: BreakMatch3,
    preTest: PreTest,
    getAllMatch: GetAllMatch,
    dumpSymbols: DumpSymbols,
}

Object.assign(
    Methods,
    GetChessMethods,
    MaskMethods,
    ActivateAreaMethods,
)

export default Methods;