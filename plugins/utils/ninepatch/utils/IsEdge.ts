var IsEdge = function(colIndex?: any, rowIndex?: any) {
    return (colIndex === 0) || (colIndex === (this.columns.count - 1)) ||
        (rowIndex === 0) || (rowIndex === (this.rows.count - 1));
}

export default IsEdge;