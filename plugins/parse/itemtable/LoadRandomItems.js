import Shuffle from '../../utils/array/Shuffle.js';

var LoadRandomItems = function (query, count) {
    if (typeof (query) === 'number') {
        count = query;
        query = undefined;
    }

    if (query === undefined) {
        query = this.createQuery();
    }
    if (count === undefined) {
        count = 1;
    }

    var self = this;
    return new Promise(function (resolve, reject) {
        // Load all item Id
        query.select('id');
        self.loadAll(query)
            .then(function (results) {
                // Shuffle items
                Shuffle(results);
                count = Math.min(count, results.length);
                var itemIds = [];
                for (var i = 0; i < count; i++) {
                    itemIds.push(results[i].id);
                }
                // Load first N items by item Id
                query = self.createQuery().containedIn('objectId', itemIds);
                self.loadAll(query).then(resolve).catch(reject);
            })
            .catch(reject)
    });
}

export default LoadRandomItems;