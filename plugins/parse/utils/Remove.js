import Parse from 'parse';
import Query from './Query.js';

var Remove = function (query, onSuccess, onError) {
    query.select('id');

    var onGetAllItems = function (items) {
        if (items.length === 0) {
            onSuccess(items);
            return;
        }
        Parse.Object.destroyAll(items)
            .then(onSuccess)
            .catch(onError);
    };
    Query(query, onGetAllItems, onError);
}

export default Remove;