const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var methods = {
    setExtendMode(mode) {
        if (IsPlainObject(mode)) {
            this.extendMode.edge = parseMode(GetValue(mode, 'edge', 0));
            this.extendMode.inside = parseMode(GetValue(mode, 'inside', 0));
        } else {
            mode = parseMode(mode);
            this.extendMode.edge = mode;
            this.extendMode.inside = mode;
        }
        return this;
    },

    getExtendMode(colIndex, rowIndex) {
        var isEdge =
            (colIndex === 0) || (colIndex === (this.columns.count - 1)) ||
            (rowIndex === 0) || (rowIndex === (this.rows.count - 1));

        return (isEdge) ? this.extendMode.edge : this.extendMode.inside;
    },
}

var parseMode = function (mode) {
    if (typeof (mode) === 'string') {
        mode = EXTENDMODE[mode];
    }
    return mode;
}

const EXTENDMODE = {
    scale: 0,
    repeat: 1,
}

export default methods;