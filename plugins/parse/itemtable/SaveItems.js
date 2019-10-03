import Parse from 'parse/dist/parse.min.js';
import DataToItem from '../utils/DataToItem.js';
import SetOwnerAccessMode from '../utils/SetOwnerAccessMode.js';

var SaveItems = function (dataArray) {
    if (this.primaryKeys.length > 0) {
        var promises = [];
        for (var i = 0, cnt = dataArray.length; i < cnt; i++) {
            promises.push(
                this.save(dataArray[i])
            )
        }
        return Promise.all(promises);
    } else {
        var items = [],
            item;
        for (var i = 0, cnt = dataArray.length; i < cnt; i++) {
            item = DataToItem(dataArray[i], this.customClass);
            SetOwnerAccessMode(item, this.ownerRead, this.ownerWrite);
            items.push(item);
        }
        return Parse.Object.saveAll(items);
    }
}
export default SaveItems;