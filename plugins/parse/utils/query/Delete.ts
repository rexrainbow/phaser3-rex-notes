import Load from './Load';

var Delete = function(query?: any) {
    query.select('id');

    return Load(query)
        .then(function(items?: any) {
            if (items.length === 0) {
                return Promise.resolve();
            }
            return Parse.Object.destroyAll(items);
        });
}

export default Delete;