import IsEdge from '../utils/IsEdge';

var GetStretchMode = function(colIndex?: any, rowIndex?: any) {
    return (IsEdge.call(this, colIndex, rowIndex)) ? this.stretchMode.edge : this.stretchMode.internal;
};

export default GetStretchMode;