const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var SetExtendMode = function(mode) {
    if (IsPlainObject(mode)) {
        this.extendMode.edge = parseMode(GetValue(mode, 'edge', 0));
        this.extendMode.inside = parseMode(GetValue(mode, 'inside', 0));
    } else {
        mode = parseMode(mode);
        this.extendMode.edge = mode;
        this.extendMode.inside = mode;
    }
    return this;
};

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

export default SetExtendMode;