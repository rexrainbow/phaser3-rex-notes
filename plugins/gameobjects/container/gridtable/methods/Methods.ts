import SetTableOY from './SetTableOY';
import SetTableOX from './SetTableOX';
import ChildrenMaskMethods from '../../../container/containerlite/mask/ChildrenMaskMethods';

import ShowCells from './updatetable/ShowCells';
import ShowCell from './updatetable/ShowCell';
import GetCellTLX from './updatetable/GetCellTLX';
import GetCellTLY from './updatetable/GetCellTLY';
import HideCells from './updatetable/HideCells';
import HideCell from './updatetable/HideCell';
import UpdateTable from './updatetable/UpdateTable';

import IsCellVisible from './IsCellVisible';
import { PointToCellIndex, PointToCellContainer } from './PointToCell';
import { EachVisibleCell, IterateVisibleCell, EachCell, IterateCell } from './EachCell';

import SetCellsCount from './SetCellsCount';
import InsertNewCells from './InsertNewCells';
import RemoveCells from './RemoveCells';
import SetColumnCount from './SetColumnCount';
import SetGridSize from './SetGridSize';
import UpdateVisibleCell from './UpdateVisibleCell';
import ResetCellSizeFromCell from './ResetCellSizeFromCell';

var methods = {
    setTableOY: SetTableOY,
    setTableOX: SetTableOX,

    showCells: ShowCells,
    showCell: ShowCell,
    getCellTLX: GetCellTLX,
    getCellTLY: GetCellTLY,
    hideCells: HideCells,
    hideCell: HideCell,
    updateTable: UpdateTable,

    isCellVisible: IsCellVisible,
    pointToCellIndex: PointToCellIndex,
    pointToCellContainer: PointToCellContainer,
    eachVisibleCell: EachVisibleCell,
    iterateVisibleCell: IterateVisibleCell,
    eachCell: EachCell,
    iterateCell: IterateCell,

    setCellsCount: SetCellsCount,
    insertNewCells: InsertNewCells,
    removeCells: RemoveCells,
    setColumnCount: SetColumnCount,
    setGridSize: SetGridSize,
    updateVisibleCell: UpdateVisibleCell,
    resetCellSizeFromCell: ResetCellSizeFromCell
}

Object.assign(
    methods,
    ChildrenMaskMethods
);

export default methods;