import EmitCellEvent from './EmitCellEvent.js';
import PointerToCellIndex from './PointerToCellIndex.js';
import CreateFakeInputEvent from '../../../../plugins/utils/input/CreateFakeInputEvent.js';

export default {
    pointerOverTest(pointer, event) {
        var pointers, pointersTotal;
        if (pointer === undefined) {
            var inputManager = this.scene.input.manager;
            pointers = inputManager.pointers;
            pointersTotal = pointers.length;
        } else {
            pointers = [pointer];
            pointersTotal = 1;
        }

        var table = this.childrenMap.child;
        var previousIndex = table.input.lastOverCellIndex;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];
            if (!pointer) {
                continue;
            }

            // Only pick first valid pointer, does not support multiple touch inputs

            var currentIndex = PointerToCellIndex(table, pointer);
            // pointer is still at the same cell
            if (currentIndex === previousIndex) {
                return this;
            }

            if (event === undefined) {
                event = CreateFakeInputEvent();
            }

            table.input.lastOverCellIndex = currentIndex;

            if (previousIndex != null) {
                EmitCellEvent(this.eventEmitter, 'cell.out', table, previousIndex, undefined, pointer, event);
            }

            if (currentIndex != null) {
                EmitCellEvent(this.eventEmitter, 'cell.over', table, currentIndex, undefined, pointer, event);
            }

            return this;
        }

        return this;

    },

    resetPointerOver() {
        // Clear pointOver result
        var table = this.childrenMap.child;
        var previousIndex = table.input.lastOverCellIndex;
        table.input.lastOverCellIndex = null;
        if (previousIndex != null) {
            EmitCellEvent(this.eventEmitter, 'cell.out', table, previousIndex, undefined);
        }

        this.pointerOverTest();

        return this;
    }
}
