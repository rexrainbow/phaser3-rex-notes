import MaskChildren from '../../../containerlite/MaskChildren.js';

var MaskCells = function () {
    if (!this.cellsMask) {
        // No cellsMask
        return this;
    } else if (!this.maskCellsFlag) {
        // No maskCells flag
        return this;
    } else if  ((this.alpha === 0) || (!this.visible)) {
        // Grid table is not visible
        return this;
    }

    var children = [];
    var cells = this.visibleCells.entries, container;
    for (var i = 0, cnt = cells.length; i < cnt; i++) {
        container = cells[i].getContainer();
        if (container) {
            if (container.hasOwnProperty('isRexContainerLite')) { // ContainerLite
                container.getAllChildren(children);
            } else { // Others
                children.push(container);
            }
        }
    }
    MaskChildren(this, this.cellsMask, children);

    if (this.maskUpdateMode === 0) {
        this.maskCellsFlag = false;
    }
    return this;
}

export default MaskCells;