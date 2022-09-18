import GetCharDataIndex from './utils/GetCharDataIndex.js';

var RemoveText = function (index) {
    index = GetCharDataIndex(index, true);
    if (index === undefined) {
        return this;
    }

    this.removeChild(this.children[index]);
    return this;
}

export default RemoveText;