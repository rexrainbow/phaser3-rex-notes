import PointerUpDownCell from './PointerUpDownCell';
import OverCell from './OverCell';
import ClickCell from './ClickCell';
import TapCell from './TapCell';
import PressCell from './PressCell';
import SwipeCell from './SwipeCell';

var TableSetInteractive = function(table?: any, tableConfig?: any) {
    // Attach touch detector on table
    table.setInteractive();
    
    PointerUpDownCell.call(this, table, tableConfig);
    OverCell.call(this, table, tableConfig);
    ClickCell.call(this, table, tableConfig);
    TapCell.call(this, table, tableConfig);
    PressCell.call(this, table, tableConfig);
    SwipeCell.call(this, table, tableConfig);
}

export default TableSetInteractive;