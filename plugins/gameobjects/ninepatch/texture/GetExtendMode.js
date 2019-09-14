import IsEdge from '../utils/IsEdge.js';

var GetExtendMode = function(colIndex, rowIndex) {
    return (IsEdge.call(this, colIndex, rowIndex)) ? this.extendMode.edge : this.extendMode.inside;
};

export default GetExtendMode;