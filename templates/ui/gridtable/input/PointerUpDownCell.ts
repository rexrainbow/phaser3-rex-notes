import EmitCellEvent from './EmitCellEvent';

var PointerUpDownCell = function(table?: any, tableConfig?: any) {
    table
        .on('pointerdown', function(pointer?: any, localX?: any, localY?: any, event?: any) {
            EmitCellEvent(this.eventEmitter, 'cell.down', table, pointer.worldX, pointer.worldY, pointer, event);
        }, this)
        .on('pointerup', function(pointer?: any, localX?: any, localY?: any, event?: any) {
            EmitCellEvent(this.eventEmitter, 'cell.up', table, pointer.worldX, pointer.worldY, pointer, event);
        }, this)
}

export default PointerUpDownCell;