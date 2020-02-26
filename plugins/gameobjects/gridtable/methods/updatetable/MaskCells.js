import MaskChildren from '../../../containerlite/MaskChildren.js';

var MaskCells = function () {
    var children = [];
    var cells = this.visibleCells.entries, container;
    for (var i = 0, cnt = cells.length; i < cnt; i++) {
        container = cells[i].getContainer();
        if (container) {
            if (container.isRexContainerLite) { // ContainerLite
                container.getAllChildren(children);
            } else { // Others
                children.push(container);
            }
        }
    }
    MaskChildren(this, this.cellsMask, children);
}

export default MaskCells;