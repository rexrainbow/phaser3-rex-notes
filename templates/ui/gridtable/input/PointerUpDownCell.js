import EmitCellEvent from './EmitCellEvent.js';

var PointerUpDownCell = function (table, tableConfig) {
    table
        .on('pointerdown', function (pointer) {
            EmitCellEvent(this.eventEmitter, 'cell.down', table, pointer.x, pointer.y, pointer);
        }, this)
        .on('pointerup', function (pointer) {
            EmitCellEvent(this.eventEmitter, 'cell.up', table, pointer.x, pointer.y, pointer);
        }, this)
}

export default PointerUpDownCell;