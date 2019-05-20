import ClickCell from './ClickCell.js';
import OverCell from './OverCell.js';
import OutCell from './OutCell.js';

var TableSetInteractive = function (table) {
    table.setInteractive();

    ClickCell.call(this, table);
    OverCell.call(this, table);
    OutCell.call(this, table);
}

export default TableSetInteractive;