import SetTableOY from './SetTableOY.js';
import SetTableOX from './SetTableOX.js';
import UpdateTable from './updatetable/UpdateTable.js';
import IsCellVisible from './IsCellVisible.js';
import { PointerToCellIndex, PointerToCellContainer } from './PointerToCell.js';
import { EachVisibleCell, IterateVisibleCell } from './EachVisibleCell.js';

import SetCellsCount from './SetCellsCount.js';
import InsertNewCells from './InsertNewCells.js';
import RemoveCells from './RemoveCells.js';
import SetColumnCount from './SetColumnCount.js';
import SetGridSize from './SetGridSize.js';

export default {
    setTableOY: SetTableOY,
    setTableOX: SetTableOX,
    updateTable: UpdateTable,
    isCellVisible: IsCellVisible,
    pointerToCellIndex: PointerToCellIndex,
    pointerToCellContainer: PointerToCellContainer,
    eachVisibleCell: EachVisibleCell,
    iterateVisibleCell: IterateVisibleCell,

    setCellsCount: SetCellsCount,
    insertNewCells: InsertNewCells,
    removeCells: RemoveCells,
    setColumnCount: SetColumnCount,
    setGridSize: SetGridSize
}