import SetTableOY from './SetTableOY.js';
import SetTableOX from './SetTableOX.js';
import ChildrenMaskMethods from '../../containerlite/mask/ChildrenMaskMethods.js';
import UpdateTable from './updatetable/UpdateTable.js';
import IsCellVisible from './IsCellVisible.js';
import { PointToCellIndex, PointToCellContainer } from './PointToCell.js';
import { EachVisibleCell, IterateVisibleCell, EachCell, IterateCell } from './EachCell.js';

import SetCellsCount from './SetCellsCount.js';
import InsertNewCells from './InsertNewCells.js';
import RemoveCells from './RemoveCells.js';
import SetColumnCount from './SetColumnCount.js';
import SetGridSize from './SetGridSize.js';
import UpdateVisibleCell from './UpdateVisibleCell';

var methods = {
    setTableOY: SetTableOY,
    setTableOX: SetTableOX,
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
    updateVisibleCell: UpdateVisibleCell
}

Object.assign(
    methods,
    ChildrenMaskMethods
);

export default methods;