import GetChessMethods from './GetChessMethods';
import Clear from './Clear';
import Init from './Init';
import Reset from './Reset';
import CreateChess from '../chess/CreateChess';
import FillActivateArea from './FillActivateArea';
import FillPrepareRows from './FillPrepareRows';
import BreakMatch3 from './BreakMatch3';
import PreTest from './PreTest';
import GetAllMatch from '../match/GetAllMatch';
import DumpSymbols from './DumpSymbols';
import MaskMethods from './MaskMethods';
import ActivateAreaMethods from './ActivateAreaMethods';
import GetBoardBounds from './GetBoardBounds';

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
    getBoardBounds: GetBoardBounds,
}

Object.assign(
    Methods,
    GetChessMethods,
    MaskMethods,
    ActivateAreaMethods,
)

export default Methods;