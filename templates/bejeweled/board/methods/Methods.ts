import GetChessMethods from './GetChessMethods';
import Clear from './Clear';
import Init from './Init';
import Reset from './Reset';
import CreateChess from '../chess/CreateChess';
import FillActivateArea from './FillActivateArea'
import FillPrepareRows from './FillPrepareRows';
import FillAllRows from './FillAllRows';
import BreakMatch3 from './BreakMatch3';
import InputTest from './InputTest';
import GetAllMatch from '../match/GetAllMatch';
import DumpSymbols from './DumpSymbols';
import GetBoardBounds from './GetBoardBounds';
import MaskMethods from './MaskMethods';
import ActivateAreaMethods from './ActivateAreaMethods';
import MatchMethods from './MatchMethods';
import ChessSymbolMethods from './ChessSymbolMethods';


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