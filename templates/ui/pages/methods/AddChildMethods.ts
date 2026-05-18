import OverlapSizer from '../../overlapsizer/OverlapSizer';

const OverlapSizerAdd = OverlapSizer.prototype.add;

var Add = function(gameObject?: any, childKey?: any, align?: any, padding?: any, expand?: any, minWidth?: any, minHeight?: any, offsetX?: any, offsetY?: any) {
    gameObject.setVisible(false); // Default is invisible
    OverlapSizerAdd.call(this, gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY)
    return this;
}

export default {
    add: Add,
    addPage: Add
}