import MaskChildren from '../../../containerlite/MaskChildren.js';

var MaskCells = function () {
    if (!this.cellsMask) {
        return this;
    }

    // Don't mask cell is maskUpdateMode is 1('everytick') and grid table is not visible
    if ((this.maskUpdateMode === 1) &&
        ((this.alpha === 0) || (!this.visible))) {
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
    return this;
}

export default MaskCells;