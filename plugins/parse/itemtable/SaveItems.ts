import DataToItem from '../utils/DataToItem';
import SetOwnerAccessMode from '../utils/SetOwnerAccessMode';

var SaveItems = function(dataArray?: any) {
    var self = this;
    return new Promise(function(resolve?: any, reject?: any) {
        var items = [];
        if (self.primaryKeys.length > 0) {
            var promises = [], promise;
            for (var i = 0, cnt = dataArray.length; i < cnt; i++) {
                let data = dataArray[i];
                promise = self.loadItem(data, 'id')
                    .then(function(item?: any) {
                        item = DataToItem(data, self.customClass, item);
                        SetOwnerAccessMode(item, self.ownerRead, self.ownerWrite);
                        items.push(item);
                    })
                promises.push(promise)
            }
            Promise.all(promises)
                .then(function() {
                    return resolve(items);
                })
                .catch(reject)

        } else {
            for (var i = 0, cnt = dataArray.length; i < cnt; i++) {
                var item = DataToItem(dataArray[i], self.customClass);
                SetOwnerAccessMode(item, self.ownerRead, self.ownerWrite);
                items.push(item);
            }
            return resolve(items);
        }
    })
        .then(function(items?: any) {
            return Parse.Object.saveAll(items);
        })
}
export default SaveItems;