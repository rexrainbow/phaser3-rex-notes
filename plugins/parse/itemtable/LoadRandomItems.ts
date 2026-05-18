import Load from '../utils/query/Load';
import Shuffle from '../../utils/array/Shuffle';

var LoadRandomItems = function(query?: any, count?: any) {
    if (typeof (query) === 'number') {
        count = query;
        query = undefined;
    }
    if (query === undefined) {
        query = this.baseQuery;
    }
    if (count === undefined) {
        count = 1;
    }

    // Load all item Id
    query.select('id');
    var self = this;
    return Load(query)
        .then(function(items?: any) {
            // Shuffle items
            Shuffle(items);
            count = Math.min(count, items.length);
            var itemIds = [];
            for (var i = 0; i < count; i++) {
                itemIds.push(items[i].id);
            }
            // Load first N items by item Id
            query = self.baseQuery.containedIn('objectId', itemIds);
            return Load(query)
        })
}

export default LoadRandomItems;