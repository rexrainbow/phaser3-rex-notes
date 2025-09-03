import GetChessMethods from './GetChessMethods.js';
import Clear from './Clear.js';
import Init from './Init.js';
import Reset from './Reset.js';
import CreateChess from '../chess/CreateChess.js';
import FillActivateArea from './FillActivateArea.js'
import FillPrepareRows from './FillPrepareRows.js';
import FillAllRows from './FillAllRows.js';
import BreakMatch3 from './BreakMatch3.js';
import InputTest from './InputTest.js';
import GetAllMatch from '../match/GetAllMatch.js';
import DumpSymbols from './DumpSymbols.js';
import GetBoardBounds from './GetBoardBounds.js';
import MaskMethods from './MaskMethods.js';
import ActivateAreaMethods from './ActivateAreaMethods.js';
import MatchMethods from './MatchMethods.js';
import ChessSymbolMethods from './ChessSymbolMethods.js';


var Methods = {
    clear: Clear,
    init: Init,
    reset: Reset,
    createChess: CreateChess,
    fillActivateArea: FillActivateArea,
    fillPrepareRows: FillPrepareRows,
    fillAllRows: FillAllRows,
    breakMatch3: BreakMatch3,
    inputTest: InputTest,
    getAllMatch: GetAllMatch,
    dumpSymbols: DumpSymbols,
    getBoardBounds: GetBoardBounds,
}

Object.assign(
    Methods,
    GetChessMethods,
    MaskMethods,
    ActivateAreaMethods,
    MatchMethods,
    ChessSymbolMethods,
)

export default Methods;