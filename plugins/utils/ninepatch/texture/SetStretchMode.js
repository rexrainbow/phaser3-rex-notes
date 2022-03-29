const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var SetStretchMode = function(mode) {
    if (IsPlainObject(mode)) {
        this.stretchMode.edge = ParseMode(GetValue(mode, 'edge', 0));
        this.stretchMode.internal = ParseMode(GetValue(mode, 'internal', 0));
    } else {
        mode = ParseMode(mode);
        this.stretchMode.edge = mode;
        this.stretchMode.internal = mode;
    }
    return this;
};

var ParseMode = function (mode) {
    if (typeof (mode) === 'string') {
        mode = EXTENDMODE[mode];
    }
    return mode;
}

const EXTENDMODE = {
    scale: 0,
    repeat: 1,
}

export default SetStretchMode;