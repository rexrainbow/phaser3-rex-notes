import EmitCellEvent from './EmitCellEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OverCell = function (table, tableConfig) {
    var overConfig = GetValue(tableConfig, 'over', true);
    if (overConfig === false) {
        return;
    }

    var overTestMode = GetValue(overConfig, 'mode', undefined);

    if (overTestMode === 'boundary') {
        // Use global input detecting
        var OnMove = function (pointer, currentlyOver) {
            this.pointerOverTest(pointer);
        }
        table.scene.input.on('pointermove', OnMove, this);

    } else {
        // Attach input detector to table game object
        var OnMove = function (pointer, localX, localY, event) {
            this.pointerOverTest(pointer, event);
        }
        var OnOut = function (pointer, event) {
            var table = this.childrenMap.child;
            var cellIndex = table.input.lastOverCellIndex;
            table.input.lastOverCellIndex = undefined;
            EmitCellEvent(this.eventEmitter, 'cell.out', table, cellIndex, undefined, pointer, event);
        }
        table
            .on('pointermove', OnMove, this)
            .on('pointerover', OnMove, this)
            .on('pointerout', OnOut, this)  // pointer-up is included too
    }
}

export default OverCell;