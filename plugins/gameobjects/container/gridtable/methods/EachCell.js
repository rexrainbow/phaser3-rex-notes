import Each from '../../../../utils/set/Each.js';
import Iterate from '../../../../utils/set/Iterate.js';

// For when you know this Set will be modified during the iteration
var EachVisibleCell = function (callback, scope) {
    Each(this.visibleCells, callback, scope);
    return this;
}

// For when you absolutely know this Set won't be modified during the iteration
var IterateVisibleCell = function (callback, scope) {
    Iterate(this.visibleCells, callback, scope);
    return this;
}

var EachCell = function (callback, scope) {
    this.table.cells.slice().forEach(callback, scope);
    return this;
}

var IterateCell = function (callback, scope) {
    this.table.cells.forEach(callback, scope);
    return this;
}

export { EachVisibleCell, IterateVisibleCell, EachCell, IterateCell };