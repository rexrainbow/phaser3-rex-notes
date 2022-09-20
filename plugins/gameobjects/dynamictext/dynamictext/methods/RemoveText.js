import GetCharDataIndex from './utils/GetCharDataIndex.js';

var RemoveText = function (index, length) {
    if (length === undefined) {
        length = 1;
    }

    for (var i = 0; i < length; i++) {
        var childIndex = GetCharDataIndex.call(this, index, true);
        if (childIndex === undefined) {
            break;
        }
        this.removeChild(this.children[childIndex]);
    }
    return this;
}

export default RemoveText;