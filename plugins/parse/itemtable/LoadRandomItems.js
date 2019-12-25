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

    // Load all item Id
    query.select('id');
    var self = this;
    return this.loadAll(query)
        .then(function (items) {
            // Shuffle items
            Shuffle(items);
            count = Math.min(count, items.length);
            var itemIds = [];
            for (var i = 0; i < count; i++) {
                itemIds.push(items[i].id);
            }
            // Load first N items by item Id
            query = self.createQuery().containedIn('objectId', itemIds);
            return self.loadAll(query)
        })
}

export default LoadRandomItems;