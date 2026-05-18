import Each from '../../../../utils/set/Each';
import Iterate from '../../../../utils/set/Iterate';

// For when you know this Set will be modified during the iteration
var EachVisibleCell = function(callback?: any, scope?: any) {
    Each(this.visibleCells, callback, scope);
    return this;
}

// For when you absolutely know this Set won't be modified during the iteration
var IterateVisibleCell = function(callback?: any, scope?: any) {
    Iterate(this.visibleCells, callback, scope);
    return this;
}

var EachCell = function(callback?: any, scope?: any) {
    this.table.cells.slice().forEach(callback, scope);
    return this;
}

var IterateCell = function(callback?: any, scope?: any) {
    this.table.cells.forEach(callback, scope);
    return this;
}

export { EachVisibleCell, IterateVisibleCell, EachCell, IterateCell };