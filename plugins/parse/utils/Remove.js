import Parse from 'parse/dist/parse.min.js';
import Load from './Load.js';

var Remove = function (query) {
    query.select('id');

    return new Promise(function (resolve, reject) {
        Load(query)
            .then(function (items) {
                if (items.length === 0) {
                    resolve(items);
                    return;
                }
                Parse.Object.destroyAll(items)
                    .then(resolve)
                    .catch(reject);
            })
            .catch(reject)
    });
}

export default Remove;