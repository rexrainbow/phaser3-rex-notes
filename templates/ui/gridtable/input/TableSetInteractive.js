import ClickCell from './ClickCell.js';
import OverCell from './OverCell.js';
import TapCell from './TapCell.js';
import PressCell from './PressCell.js';

var TableSetInteractive = function (table) {
    table.setInteractive();

    ClickCell.call(this, table);
    OverCell.call(this, table);
    TapCell.call(this, table);
    PressCell.call(this, table);
}

export default TableSetInteractive;