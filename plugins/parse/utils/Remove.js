import Parse from 'parse/dist/parse.min.js';
import Load from './Load.js';

var Remove = function (query) {
    query.select('id');

    return Load(query)
        .then(function (items) {
            if (items.length === 0) {
                return Promise.resolve();
            }
            return Parse.Object.destroyAll(items);
        });
}

export default Remove;